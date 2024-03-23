const express = require('express')
const favouriteProductController = require('../controllers/favouriteProductController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const favouriteProductRoute = express.Router()
// GET: /api/v1/favourite
favouriteProductRoute.get('/', verifyAccessToken, favouriteProductController.getAllFavouriteProduct)
// GET: /api/v1/favourite/limit
favouriteProductRoute.get('/limit', verifyAccessToken, favouriteProductController.getAllFavouriteProductLimit)
// POST: /api/v1/favourite/create
favouriteProductRoute.post('/change',  verifyAccessToken, favouriteProductController.changeProductFavourite)

module.exports = favouriteProductRoute
