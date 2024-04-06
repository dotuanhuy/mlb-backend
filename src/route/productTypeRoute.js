const express = require('express')
const productTypeController = require('../controllers/productTypeController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')
const { upload, uploadMultiple } = require('../middlewares/multer')
const firebaseController = require('../controllers/firebaseController')

const productTypeRoute = express.Router()

// GET: /api/v1/producttype
productTypeRoute.get('/', productTypeController.getAllProductTypes)
// GET: /api/v1/producttype/limit
productTypeRoute.get('/limit', productTypeController.getLimitProductTypes)
// GET: /api/v1/producttype/categoryId
productTypeRoute.get('/categoryId', productTypeController.getProductTypeByCategoryId)
// GET: /api/v1/producttype/id
productTypeRoute.get('/id', productTypeController.getProductTypeById)
// POST: /api/v1/producttype/create
productTypeRoute.post('/create', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    upload,
    firebaseController.upload,
    productTypeController.createProductType
)
// DELTE: /api/v1/producttype/delete
productTypeRoute.delete('/delete', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    productTypeController.getImageProductTypeById,
    firebaseController.delete,
    productTypeController.deleteProductTypeById
)
// POST: /api/v1/producttype/update
productTypeRoute.post('/update', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    productTypeController.getImageProductTypeById,
    upload,
    firebaseController.upload,
    firebaseController.delete,
    productTypeController.updateProductType
)

module.exports = productTypeRoute
