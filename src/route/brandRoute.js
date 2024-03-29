const express = require('express')
const brandController = require('../controllers/brandController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const brandRoute = express.Router()

// GET: /api/v1/brand
brandRoute.get('/', brandController.getAllBrands)

module.exports = brandRoute
