const express = require('express')
const favouriteProductController = require('../controllers/favouriteProductController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const favouriteProductRoute = express.Router()
// GET: /api/v1/favourite
favouriteProductRoute.get('/', verifyAccessToken, favouriteProductController.getAllFavouriteProduct)
// GET: /api/v1/favourite
favouriteProductRoute.get('/api/get-all-favourite-products-limit', verifyAccessToken, favouriteProductController.getAllFavouriteProductLimit)
favouriteProductRoute.post('/api/add-product-favourite',  verifyAccessToken, favouriteProductController.changeProductFavourite)

module.exports = favouriteProductRoute
