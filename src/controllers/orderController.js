const orderService = require('../services/orderService')

module.exports = {
    getOrderLimit: async (req, res) => {
        try {
            const {page, option} = req.query
            if (!page || !option) {
                return res.status(400).json("Missing required parameter")
            }
            let data = []
            if (option === 'all') {
                data = await orderService.getOrderLimit(page)
            }
            else if (option === 'waitConfirmation') {
                data = await orderService.getOrderWaitConfirmationLimit(page)
            }
            else if (option === 'waitPay') {
                data = await orderService.getOrderWaitPayLimit(page)
            }
            else if (option === 'shipping') {
                data = await orderService.getOrderShippingLimit(page)
            }
            else if (option === 'finished') {
                data = await orderService.getOrderFinishedLimit(page)
            }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    },
    getOrderById: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json("Missing required parameter")
            }
            const data = await orderService.getOrderById(id)
            if (!data) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Order is not exist'
                })
            }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    },
    confirmOrder: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json("Missing required parameter")
            }
            const order = await orderService.confirmOrder(id)
            if (!order) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Confirm order failed'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Confirm order success'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    },
    cancelOrder: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(400).json("Missing required parameter")
            }
            const order = await orderService.cancelOrder(id)
            if (!order) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Cancel order failed'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Cancel order success'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    },
    getListOrderId: async (req, res) => {
        try {
            const {id} = req.user
            if (!id) {
                return res.status(400).json("Missing required parameter")
            }
            const order = await orderService.getListOrderId(id)
            if (!order) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Cancel order failed'
                })
            }
            const listOrderId = order?.dataOrder.map(item => item.id)
            return res.status(200).json({
                errCode: 0,
                data: listOrderId
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    }
}
