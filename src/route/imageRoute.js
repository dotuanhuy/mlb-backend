const express = require('express')
const imageController = require('../controllers/imageController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const imageRoute = express.Router()

imageRoute.get('/', imageController.getAllImagesProduct)
imageRoute.get('/product/id', imageController.getAllImagesByProductId)
imageRoute.post('/change', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, imageController.changeImageProducts)
imageRoute.post('/delete', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, imageController.deleteImageProduct)
imageRoute.get('/category', imageController.getImageProductByCategory)

module.exports = imageRoute
