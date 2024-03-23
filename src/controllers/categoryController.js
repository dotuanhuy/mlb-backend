const categoryService = require('../services/categoryService')
const optionCategories = require('../utils/optionCategory')

let getAllCategories = async (req, res) => {
    try {
        let data = await categoryService.getAllCategoriesService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getAllCategoriesDetail = async (req, res) => {
    try {
        let data = await categoryService.getAllCategoriesDetailService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getAllCategoriesDetailByType = async (req, res) => {
    try {
        if (!req?.query?.type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await categoryService.getAllCategoriesDetailByTypeService(req.query.type)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getCategoriesByType = async (req, res) => {
    try {
        let data = null
        if (!req?.query?.type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        data = await categoryService.getCategoryDetailByTypeService(req.query.type.split(','))
        // if (optionCategories.optionCategory(req?.query?.type).length === 0) {
        // }
        // else {
        //     data = await categoryService.getCategoriesByTypeService(req.query.type)
        // }
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
    getAllCategories,
    getAllCategoriesDetail,
    getAllCategoriesDetailByType,
    getCategoriesByType,
}