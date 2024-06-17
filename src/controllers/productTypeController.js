const productTypeService = require('../services/productTypeService')
const optionCategories = require('../utils/optionCategory')



module.exports = {
    getAllProductTypes: async (req, res) => {
        try {
            let data = await productTypeService.getAllProductTypes()
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getLimitProductTypes: async (req, res) => {
        try {
            const { page } = req.query
            if (!page) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            const data = await productTypeService.getLimitProductTypes(page)
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getProductTypeByCategoryId: async (req, res) => {
        try {
            if (!req?.query?.categoryId) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await productTypeService.getProductTypeByCategoryId(req?.query?.categoryId)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getProductTypeById: async (req, res) => {
        try {
            if (!req?.query?.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await productTypeService.getProductTypeById(req?.query?.id)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getImageProductTypeById: async (req, res, next) => {
        try {
            if (!req?.query?.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await productTypeService.getImageProductTypeById(req?.query?.id)
            req.imageUrl = data.imageRoot
            return next()
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    createProductType: async (req, res) => {
        try {
            const data = JSON.parse(req?.body?.productType)
            const imageRoot = req.image
            if (!data?.name || !data?.categoryId || !imageRoot) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            data.imageRoot = imageRoot
            const productType = await productTypeService.createProductType(data)
            if (productType) {
                return res.status(200).json({
                    errCode: 0,
                    errMessage: 'Tạo mới thành công'
                })
            }
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Tạo mới thất bại'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    deleteProductTypeById: async (req, res) => {
        try {
            const { id } = req.query
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let data = await productTypeService.deleteProductTypeById(id)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    updateProductType: async (req, res) => {
        try {
            const { id } = req.query
            const productType = JSON.parse(req?.body?.productType)
            if (!productType.name || !id || productType.status === '' || !productType.categoryId || !productType.imageUrl) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            if (req?.image) {
                productType.imageUrl = req.image
            }
            const data = await productTypeService.updateProductType(productType, id)
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update product type success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getLimitProductTypesByName: async (req, res) => {
        try {
            const { page, name } = req.query
            if (!page) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            const data = await productTypeService.getLimitProductTypesByName(page, name)
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
}