const sizeService = require('../services/sizeService')

let getAllSizesByType = async (req, res) => {
    try {
        if (!req?.query?.type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await sizeService.getAllSizesByTypeService(req.query.type)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let createSizeDetail = async (req, res, next) => {
    try {
        const {listSizesAdded} = req?.body
        if (listSizesAdded.length === 0) {
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Size is not exist'
            })
        }
        let data = await sizeService.createSizeDetailService(req.body)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let deleteSizeDetailByProductId = async (req, res, next) => {
    try {
        const {id} = req.query
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await sizeService.deleteSizeDetailByProductIdService(id)
        next()
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let updateSizeDetailByProductId = async (req, res, next) => {
    try {
        if (!req?.body?.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data1 = await sizeService.deleteSizeDetailByProductIdService(req.body.id)
        req.body.productId = req.body.id
        let data2 = await sizeService.createSizeDetailService(req.body)
        next()
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let changeSizeDetailByProductId = async (req, res, next) => {
    try {
        const {listSizesDeleted, listSizesAdded} = req?.body
        const {id} = req.query
        let resDeleted = ''
        let resAdded = ''

        if (!id || !listSizesDeleted || !listSizesAdded) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        if (listSizesDeleted.length === 0 && listSizesAdded.length === 0) {
            next()
        }
        if (listSizesDeleted.length > 0) {
          resDeleted  = await sizeService.deleteSizeDetailByProductIdService({listSizesDeleted, id})
        }
        if (listSizesAdded.length > 0) {
            resAdded = await sizeService.createSizeDetailService({listSizesAdded, id})
        }
        next()
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

module.exports = {
    getAllSizesByType,
    createSizeDetail,
    deleteSizeDetailByProductId,
    updateSizeDetailByProductId,
    changeSizeDetailByProductId
}