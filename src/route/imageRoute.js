const express = require('express')
const imageController = require('../controllers/imageController')
const firebaseController = require('../controllers/firebaseController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')
const { upload, uploadMultiple } = require('../middlewares/multer')

const imageRoute = express.Router()

imageRoute.get('/', imageController.getAllImagesProduct)
imageRoute.get('/product/id', imageController.getAllImagesByProductId)
imageRoute.post('/change', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    uploadMultiple, 
    firebaseController.upload,
    imageController.changeImageProducts,
)
imageRoute.post('/delete', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    uploadMultiple,
    firebaseController.delete,
    imageController.deleteImageProduct
)
imageRoute.get('/category', imageController.getImageProductByCategory)

module.exports = imageRoute
