const db = require('../models/index')

module.exports = {
    getAllOrderFinished: () => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    orderStatus: 'finished',
                },
                include: [
                    {
                        model: db.Payment, as: 'dataPayment'
                    },
                    {
                        model: db.Product, as: 'dataOrderProduct',
                        include: [
                            {
                                model: db.Discount, as: 'dataDiscounts'
                            }
                        ]
                    },
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getAllOrdersByUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: db.Payment, as: 'dataPayment'
                    },
                    {
                        model: db.Product, as: 'dataOrderProduct',
                        include: [
                            {
                                model: db.Discount, as: 'dataDiscounts'
                            }
                        ]
                    },
                ],
                order: [['id', 'DESC']],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderLimit: (page) => {
        return new Promise((resolve, reject) => {
            db.Order.findAndCountAll({
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderWaitConfirmationLimit: (page) => {
        return new Promise((resolve, reject) => {
            db.Order.findAndCountAll({
                where: {
                    isCancelled: 0,
                    orderStatus: 'wait confirmation'
                },  
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderWaitPayLimit: (page) => {
        return new Promise((resolve, reject) => {
            db.Order.findAndCountAll({
                where: {
                    isCancelled: 0,
                    orderStatus: 'wait pay'
                },  
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderShippingLimit: (page) => {
        return new Promise((resolve, reject) => {
            db.Order.findAndCountAll({
                where: {
                    isCancelled: 0,
                    orderStatus: 'shipping'
                },  
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderFinishedLimit: (page) => {
        return new Promise((resolve, reject) => {
            db.Order.findAndCountAll({
                where: {
                    isCancelled: 0,
                    orderStatus: 'finished'
                },  
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getOrderById: (id) => {
        return new Promise((resolve, reject) => {
            db.Order.findOne({
                where: {
                    id
                },  
                include: [
                    {
                        model: db.Payment, as: 'dataPayment'
                    },
                    {
                        model: db.Product, as: 'dataOrderProduct',
                        include: [
                            {
                                model: db.Discount, as: 'dataDiscounts'
                            }
                        ]
                    },
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    confirmOrder: (id) => {
        return new Promise((resolve, reject) => {
            db.Order.update({ orderStatus: 'shipping' }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    cancelOrder: (id) => {
        return new Promise((resolve, reject) => {
            db.Order.update({ isCancelled: 1 }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getListOrderId: (id) => {
        return new Promise((resolve, reject) => {
            db.User.findOne({
                attributes: ['id'],
                where: { id },
                include: [
                    {
                        model: db.Order, as: 'dataOrder',
                        attributes: ['id'],
                        where: {
                            orderStatus: 'finished',
                            isCancelled: 0
                        }
                    }
                ]
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createOrder: (data) => {
        return new Promise((resolve, reject) => {
            db.Order.create({
                userId: data.userId,
                fullName: data.fullName,
                phone: data.phone,
                address: data.address,
                totalMoney: data.totalMoney,
                shippingMethod: data.shippingMethod,
                orderStatus: 'wait confirmation',
                isCancelled: 0
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createOrderDetail: ({orderId, productId, size, quantity, price}) => {
        return new Promise((resolve, reject) => {
            db.OrderDetail.create({
                orderId,
                productId,
                size,
                quantity,
                price
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getTotalOrder: () => {
        return new Promise((resolve, reject) => {
            db.Order.count()
            .then(resolve)
            .catch(reject)
        })
    },
}
