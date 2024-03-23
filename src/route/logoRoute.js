const express = require('express')
const logoController = require('../controllers/logoController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const logoRoute = express.Router()

// GET: /api/v1/logo
logoRoute.get('/', logoController.getAllLogos)

module.exports = logoRoute
