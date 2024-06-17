const express = require('express')
const imageController = require('../controllers/imageController')
const firebaseController = require('../controllers/firebaseController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const { verifyAccessToken } = require('../middlewares/verifyAccessTokenMiddleware')
const { upload, uploadMultiple } = require('../middlewares/multer')

const imageRoute = express.Router()

// GET: /api/v1/image
imageRoute.get('/', imageController.getAllImagesProduct)
// GET: /api/v1/image/product/id
imageRoute.get('/product/id', imageController.getAllImagesByProductId)
// POST: /api/v1/image/change
imageRoute.post('/change',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    uploadMultiple,
    firebaseController.upload,
    imageController.changeImageProducts,
)
// POST: /api/v1/image/delete
imageRoute.post('/delete',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    uploadMultiple,
    firebaseController.delete,
    imageController.deleteImageProduct
)
// GET: /api/v1/image/category
imageRoute.get('/category', imageController.getImageProductByCategory)

module.exports = imageRoute
