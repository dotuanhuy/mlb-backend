const orderService = require('../services/orderService')
const paymentService = require('../services/paymentService')
const productService = require('../services/productService')

module.exports = {
    getAllOrdersByUser: async (req, res) => {
        try {
            const { id } = req.user
            if (!id) {
                return res.status(400).json("Missing required parameter")
            }
            const data = await orderService.getAllOrdersByUser(id)
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
    getOrderLimit: async (req, res) => {
        try {
            const { page, option } = req.query
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
            const { id } = req.query
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
            const { id } = req.query
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
            const { id } = req.query
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
            const { id } = req.user
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
    },
    createOrder: async (req, res) => {
        try {
            const data = req.body
            const { id } = req.user
            if (!data) {
                return res.status(400).json("Missing required parameter")
            }
            data.address = `${data.address}, ${data.ward}, ${data.district}, ${data.city}`
            data.userId = id
            const promise = data?.products?.map(async item => {
                const data = await productService.getProductByIdService(item?.id)
                const product = data?.data
                if (product?.dataValues?.quantity === 0) {
                    throw {
                        errCode: 1,
                        errMessage: `Sản phẩm ${product?.dataValues?.name} đã hết!`
                    }
                }
                else if (product?.dataValues?.quantity - item?.quantityBuy < 0) {
                    throw {
                        errCode: 1,
                        errMessage: `Số lượng sản phẩm ${product?.dataValues?.name} không đủ!`
                    }
                }
                else {
                    const obj = {
                        id: item?.id,
                        quantityRemaining: product?.dataValues?.quantity - item?.quantityBuy,
                        size: item?.size,
                        quantityBuy: item?.quantityBuy
                    }
                    return obj
                }
            })
            Promise.all(promise)
                .then(async arr => {
                    const order = await orderService.createOrder(data)
                    for (const item of arr) {
                        const info = await productService.updateQuantity({ id: item?.id, quantity: item?.quantityRemaining })
                        const orderDetail = await orderService.createOrderDetail({
                            orderId: order?.dataValues?.id,
                            productId: item?.id,
                            size: item?.size,
                            quantity: item?.quantityBuy
                        })
                    }
                    const payment = await paymentService.createPayment({
                        orderId: order?.dataValues?.id,
                        paymentMethod: data.paymentType,
                        isPaid: data.paymentType === 'paypal' ? 1 : 0
                    })
                    return res.status(200).json({
                        errCode: 0,
                        data: {
                            orderId: order?.dataValues?.id
                        }
                    })
                })
                .catch(err => {
                    res.status(501).json(err);
                })
        } catch (e) {
            console.log(e)
            return res.status(500).json('Error from server')
        }
    }
}
