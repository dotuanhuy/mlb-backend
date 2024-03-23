const productTypeService = require('../services/productTypeService')
const optionCategories = require('../utils/optionCategory')

let getAllProductTypes = async (req, res) => {
    try {
        let data = await productTypeService.getAllProductTypesService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getLimitProductTypes = async (req, res) => {
    try {
        if (!req?.query?.page) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.getLimitProductTypesService(req?.query?.page)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}


let getProductTypeByCategoryId = async (req, res) => {
    try {
        if (!req?.query?.categoryId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.getProductTypeByCategoryIdService(req?.query?.categoryId)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getProductTypeById = async (req, res) => {
    try {
        if (!req?.query?.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.getProductTypeByIdService(req?.query?.id)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let createProductType = async (req, res) => {
    try {
        const {name, categoryId, imageRoot} = req?.body?.data
        if (!name || !categoryId || !imageRoot) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.createProductTypeService(req?.body?.data)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let deleteProductTypeById = async (req, res) => {
    try {
        const {id} = req.query
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.deleteProductTypeByIdService(id)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let updateProductType = async (req, res) => {
    try {
        const {name, id, status, categoryId, imageRoot} = req?.body?.data
        if (!name || !id || status === '' || !categoryId || !imageRoot) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        let data = await productTypeService.updateProductTypeService(req?.body?.data)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

module.exports = {
    getAllProductTypes,
    getLimitProductTypes,
    getProductTypeByCategoryId,
    getProductTypeById,
    createProductType,
    deleteProductTypeById,
    updateProductType
}