const express = require('express')
const favouriteProductController = require('../controllers/favouriteProductController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const favouriteProductRoute = express.Router()
// GET: /api/v1/favourite
favouriteProductRoute.get('/', verifyAccessToken, favouriteProductController.getAllFavouriteProduct)
<<<<<<< HEAD:src/route/favouriteProductRoute.js
// GET: /api/v1/favourite/limit
favouriteProductRoute.get('/limit', verifyAccessToken, favouriteProductController.getAllFavouriteProductLimit)
// POST: /api/v1/favourite/create
favouriteProductRoute.post('/create',  verifyAccessToken, favouriteProductController.changeProductFavourite)
=======
// GET: /api/v1/favourite
favouriteProductRoute.get('/limit', verifyAccessToken, favouriteProductController.getAllFavouriteProductLimit)

favouriteProductRoute.post('/api/add-product-favourite',  verifyAccessToken, favouriteProductController.changeProductFavourite)
>>>>>>> 89e38582dad20c4182ab0beb0a93397c5078df64:src/route/favouriteRoute.js

module.exports = favouriteProductRoute
