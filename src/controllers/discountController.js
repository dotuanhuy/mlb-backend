const discountController = require('../services/discountService')

module.exports = {
    getAllDiscounts: async (req, res) => {
        try {
            let data = await discountController.getAllDiscountsService()
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getLimitDiscount: async (req, res) => {
        try {
            const {page} = req.query
            const discount = await discountController.getLimitDiscount(page)
            return res.status(200).json({
                errCode: 0,
                data: discount
            })
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    createDiscount: async (req, res) => {
        try {
            const {code, value, description} = req.body
            if (!code || !value) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            }
            const data = {
                code,
                value: (value/100).toFixed(2), 
                description
            }
            const discount = await discountController.createDiscount(data)
            if (!discount) {
                return res.status(400).json({errCode: 1, errMessage: 'Create discount failed'}) 
            }
            return res.status(200).json({errCode: 0, errMessage: 'Successfully created discount'})
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    updateDiscount: async (req, res) => {
        try {
            const {code, value, description} = req.body
            const {id} = req.query
            if (!code || !value || !id) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            }
            const discount = await discountController.updateDiscount({code, value: (value/100).toFixed(2), description, id})
            if (!discount) {
                return res.status(400).json({errCode: 1, errMessage: 'Update discount failed'}) 
            }
            return res.status(200).json({errCode: 0, errMessage: 'Successfully updated discount'})
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    deleteDiscount: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            }
            const discount = await discountController.deleteDiscount(id)
            if (!discount) {
                return res.status(400).json({errCode: 1, errMessage: 'Delete discount failed'}) 
            }
            return res.status(200).json({errCode: 0, errMessage: 'Successfully deleted discount'})
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getDiscountById: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            }
            const discount = await discountController.getDiscountById(id)
            const newDiscount = {
                ...discount,
                value: discount?.value ? discount?.value*100 : 0
            }
            if (!discount) {
                return res.status(400).json({errCode: 1, errMessage: 'Discount is not exist'}) 
            }
            return res.status(200).json({errCode: 0, data: newDiscount })
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    }
}