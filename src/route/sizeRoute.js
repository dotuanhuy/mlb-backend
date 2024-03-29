const express = require('express')
const sizeController = require('../controllers/sizeController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const sizeRoute = express.Router()

// GET: /api/v1/size/type
sizeRoute.get('/type', sizeController.getAllSizesByType)

module.exports = sizeRoute
