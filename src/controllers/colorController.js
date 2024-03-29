const colorService = require('../services/colorService')

let getAllColors = async (req, res) => {
    try {
        let data = await colorService.getAllColorsService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let createColorDetail = async (req, res) => {
    try {
        const {listColorsAdded} = req?.body
        if (!req?.body) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        if (listColorsAdded.length > 0) {
            let data = await colorService.createColorDetailService(req.body)
            return res.status(200).json(data)
        }
        else {
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Create success'
            })
        }
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let deleteColorDetailByProductId = async (req, res, next) => {
    try {
        const {id} = req.query
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await colorService.deleteColorDetailByProductIdService(id)
        next()
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let updateColorDetailByProductId = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data1 = await colorService.deleteColorDetailByProductIdService(req.body.id)
        req.body.productId = req.body.id
        let data2 = await colorService.createColorDetailService(req.body)
        if (data1.errCode === 0 && data2.errCode === 0) {
            return res.status(200).json(data2)
        }
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let changeColorDetailByProductId = async (req, res) => {
    try {
        const {listColorsDeleted, listColorsAdded} = req?.body
        const {id} = req.query
        let resDeleted = ''
        let resAdded = ''
        if (!id || !listColorsAdded || !listColorsDeleted) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        if (listColorsDeleted.length > 0) {
            resDeleted = await colorService.deleteColorDetailByProductIdService({listColorsDeleted, id})
        }
        if (listColorsAdded.length > 0) {
            resAdded = await colorService.createColorDetailService({listColorsAdded, id})
        }
        if (resAdded.errCode === 0) {
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update product success'
            })
        }
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

module.exports = {
    getAllColors,
    createColorDetail,
    deleteColorDetailByProductId,
    updateColorDetailByProductId,
    changeColorDetailByProductId,
}