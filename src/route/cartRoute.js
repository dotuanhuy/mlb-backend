const express = require('express')
const cartController = require('../controllers/cartController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const cartRoute= express.Router()

// GET: /api/v1/cart/user
cartRoute.get('/user', verifyAccessToken, cartController.getCartsByUser)
// POST: /api/v1/cart/create
cartRoute.post('/create', verifyAccessToken, cartController.addProductToCart)
// POST: /api/v1/cart/delete
cartRoute.post('/delete', verifyAccessToken, cartController.deleteCart)
// POST: /api/v1/cart/change
cartRoute.post('/change', verifyAccessToken, cartController.changeCart)

module.exports = cartRoute
