const imageService = require('../services/imageService')
const optionCategories = require('../utils/optionCategory')



module.exports = {
    getAllImagesProduct: async (req, res) => {
        try {
            let data = await imageService.getAllImagesProduc()
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getAllImagesByProductId: async (req, res) => {
        try {
            if (!req?.query?.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await imageService.getAllImagesByProductId(req.query.id)
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    changeImageProducts: async (req, res) => {
        try {
            const {productId} = req.query
            const listImages = req?.images
            if (!listImages || listImages.length === 0 || !productId) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await imageService.createImageProducts({listImages, productId})
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    deleteImageProduct: async (req, res) => {
        try {
            const {arrId} = req?.body
            if (!arrId || arrId.length === 0) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await imageService.deleteImage(arrId.split(','))
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getImageProductByCategory: async (req, res) => {
        try {
            const {category} = req?.query
            if (!category) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await imageService.getImageProductByCategory(optionCategories.optionCategory(category))
            return res.status(200).json(data)
        } catch (e) {
            console.log( e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    }
}
