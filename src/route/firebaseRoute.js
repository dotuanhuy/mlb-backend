const express = require('express')
const firebaseController = require('../controllers/firebaseController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const firebaseRoute = express.Router()

// GET: /api/v1/firebase/image/size
firebaseRoute.get('/image/size', firebaseController.getSize)

module.exports = firebaseRoute
