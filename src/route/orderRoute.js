const express = require('express')
const orderController = require('../controllers/orderController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const orderRoute = express.Router()

// GET: /api/v1/order
orderRoute.get('/', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin,
    orderController.getOrderLimit
)

// GET: /api/v1/order/search
orderRoute.get('/search', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin,
    orderController.getOrderById
)

// POST: /api/v1/order/confirm
orderRoute.post('/confirm',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    orderController.confirmOrder
)

// POST: /api/v1/order/cancel
orderRoute.post('/cancel',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    orderController.cancelOrder
)

// GET: /api/v1/order/user
orderRoute.get('/user',
    verifyAccessToken,
    orderController.getListOrderId
)

module.exports = orderRoute
