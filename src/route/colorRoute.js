const express = require('express')
const colorController = require('../controllers/colorController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const colorRoute = express.Router()

// GET: /api/v1/color
colorRoute.get('/', colorController.getAllColors)

module.exports = colorRoute
