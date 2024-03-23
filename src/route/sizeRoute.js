const express = require('express')
const sizeController = require('../controllers/sizeController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const sizeRoute = express.Router()

// GET: /api/v1/size/type
sizeRoute.get('/type', sizeController.getAllSizesByType)

module.exports = sizeRoute
