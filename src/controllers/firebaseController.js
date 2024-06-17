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
            const { type, found, name } = req.query
            if (type === 'single' && found && name) {
                if ((!req?.file?.mimetype || !req?.file?.buffer)) {
                    if (name === 'edit') {
                        return next()
                    }
                    return res.status(400).json({ errCode: 1, errMessage: 'Hình ảnh không tồn tại. Vui lòng thực hiện lại' })
                }
                const file = {
                    type: req.file?.mimetype,
                    buffer: req.file?.buffer
                }
                const buildImage = await firebaseService.uploadImage(file, type, found);
                if (!buildImage) {
                    return res.status(400).json({ errCode: 1, errMessage: 'Thất bại. Vui lòng thực hiện lại' })
                }
                req.image = buildImage
            }
            else if (type === 'multiple' && found && name) {
                if (!req?.files || req?.files?.length === 0) {
                    return res.status(400).json({ errCode: 1, errMessage: 'Hình ảnh không tồn tại. Vui lòng thực hiện lại' })
                }
                const files = {
                    images: req.files
                }
                const buildImage = await firebaseService.uploadImage(files, type, found);
                if (buildImage.length === 0) {
                    return res.status(400).json({ errCode: 1, errMessage: 'Thất bại. Vui lòng thực hiện lại' })
                }
                req.images = buildImage
            }
            else {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing require parameter'
                })
            }
            return next()
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    delete: async (req, res, next) => {
        try {
            const { type, name } = req.query
            if ((!req?.file?.mimetype || !req?.file?.buffer) && name === 'edit') {
                return next()
            }
            else {
                if (type === 'single') {
                    const imageUrl = req?.imageUrl
                    if (!imageUrl) {
                        return res.status(400).json({ errCode: 1, errMessage: 'Vui lòng chọn ảnh!' })
                    }
                    const indexOfEndPath = imageUrl.indexOf("?");
                    let imagePath = imageUrl.substring(0, indexOfEndPath);
                    imagePath = imagePath.replace("%2F", "/");
                    imagePath = imagePath.replace(process.env.URL_MAIN_FIREBASE, '').trim()
                    const data = await firebaseService.delete(imagePath, type)
                    if (data.errCode !== 0) {
                        return res.status(200).json(data)
                    }
                }
                else if (type === 'multiple') {
                    const { image, arrId } = req.body
                    const imageArr = []
                    if ((!image || image.length === 0) || !arrId) {
                        return res.status(400).json({ errCode: 1, errMessage: 'Vui lòng chọn ảnh!' })
                    }
                    image.map(item => {
                        const indexOfEndPath = item.indexOf("?");
                        let imagePath = item.substring(0, indexOfEndPath);
                        imagePath = imagePath.replace("%2F", "/");
                        imagePath = imagePath.replace(process.env.URL_MAIN_FIREBASE, '').trim()
                        imageArr.push(imagePath)
                    })
                    const data = await firebaseService.delete(imageArr, type)
                    if (data?.errCode !== 0) {
                        return res.status(200).json(data)
                    }
                }
            }
            return next()
        } catch (e) {
            console.log(e);
            return res.status(200).json(e)
        }
    }
}