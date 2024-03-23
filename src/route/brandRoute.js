const express = require('express')
const brandController = require('../controllers/brandController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const brandRoute = express.Router()

// GET: /api/v1/brand
brandRoute.get('/', brandController.getAllBrands)

module.exports = brandRoute
