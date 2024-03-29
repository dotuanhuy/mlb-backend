// const tutorialService = require('../services/tutorialSizeService')
const firebaseService = require('../services/firebaseService')

module.exports = {
    getSize: async (req, res) => {
        try {
            let data = await firebaseService.getSize()
            return res.status(200).json(data)
        } catch (e) {
            return res.status(200).json(e)
        }
    },
    upload: async (req, res, next) => {
        try {
            const {type} = req.query
            if (type === 'single') {
                if (!req?.file?.mimetype || !req?.file?.buffer) {
                    return res.status(400).json({errCode: 1, errMessage: 'Image does not exist, please re-add it'})
                }
                const file = {
                    type: req.file.mimetype,
                    buffer: req.file.buffer
                }
                const buildImage = await firebaseService.uploadImage(file, type); 
                if (!buildImage) {
                    return res.status(400).json({errCode: 1, errMessage: 'Image does not exist, please re-add it'})
                }
                req.image = buildImage
            }
            else if (type === 'multiple') {
                if (req?.files && req?.files?.length === 0) {
                    return res.status(400).json({errCode: 1, errMessage: 'Image does not exist, please re-add it'})
                }
                const files = {
                    images: req.files
                }
                const buildImage = await firebaseService.uploadImage(files, type); 
                if (buildImage.length === 0) {
                    return res.status(400).json({errCode: 1, errMessage: 'Image does not exist, please re-add it'})
                }
                req.images = buildImage
            }
            next()
        } catch(e) {
            console.log(e);
            return res.status(200).json(e)
        }
    },
    delete: async (req, res, next) => {
        try {
            const {type} = req.query
            if (type === 'single') {
                const imageUrl = req?.imageUrl
                if (!imageUrl) {
                    return res.status(400).json({ errCode: 1, errMessage: 'Error, please choose photo!' })
                }
                const indexOfEndPath = imageUrl.indexOf("?");
                let imagePath = imageUrl.substring(0,indexOfEndPath);
                imagePath = imagePath.replace("%2F","/");
                imagePath = imagePath.replace(process.env.URL_MAIN_FIREBASE, '').trim()
                const data = await firebaseService.delete(imagePath, type)
                if (data.errCode !== 0) {
                    return res.status(200).json(data)
                }
            }
            else if (type === 'multiple') {
                const {image, arrId} = req.body
                const imageArr = []
                if ((!image || image.length === 0) || !arrId) {
                    return res.status(400).json({ errCode: 1, errMessage: 'Error, please choose photo!' })
                }
                image.map(item => {
                    const indexOfEndPath = item.indexOf("?");
                    let imagePath = item.substring(0,indexOfEndPath);
                    imagePath = imagePath.replace("%2F","/");
                    imagePath = imagePath.replace(process.env.URL_MAIN_FIREBASE, '').trim()
                    imageArr.push(imagePath)
                })
                const data = await firebaseService.delete(imageArr, type)
                if (data?.errCode !== 0) {
                    return res.status(200).json(data)
                }
            }
            next()
        } catch (e) {
            console.log(e);
            return res.status(200).json(e)
        }
    }
}