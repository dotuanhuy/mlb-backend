const express = require('express')
const productController = require('../controllers/productController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')
const { upload, uploadMultiple } = require('../middlewares/multer')
const firebaseController = require('../controllers/firebaseController')

const productRoute = express.Router()

// GET: /api/v1/product
productRoute.get('/', productController.getAllProducts)
// POST: /api/v1/product/create
productRoute.post('/create', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    upload,
    firebaseController.upload,
    productController.createNewProduct, 
)
// DELETE: /api/v1/product/delete
productRoute.delete('/delete', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    productController.getImageProductById,
    firebaseController.delete,
    productController.deleteProduct
)
// GET: /api/v1/product/id
productRoute.get('/id', productController.getProductById)
// POST: /api/v1/product/update
productRoute.post('/update', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    upload, 
    productController.getImageProductById,
    firebaseController.upload, 
    firebaseController.delete,
    productController.updateProduct, 
)
// GET: /api/v1/product/count
productRoute.get('/count', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    productController.getCountProducts
)
// POST: /api/v1/product/image/change
productRoute.post('/image/change', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    upload, 
    productController.getImageProductById,
    firebaseController.delete,
    firebaseController.upload, 
    productController.changeImageMainProduct
) 
// GET: /api/v1/product/description
productRoute.get('/description', productController.getAllDescriptionProduct)
// POST: /api/v1/product/description/create
productRoute.post('/description/create', productController.addDescriptionProduct)
// GET: /api/v1/product/public
productRoute.get('/home_page', productController.getAllProductPublic)
// GET: /api/v1/product/category/count
productRoute.get('/category/count', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    productController.getQuantityOfEachProductByCategory
)
// GET: /api/v1/product/category
productRoute.get('/category', productController.getProductByCategory)
// GET: /api/v1/product/category/limit
productRoute.get('/category/limit', productController.getProductByCategoryLimit)
// GET: /api/v1/product/categoryDetail
productRoute.get('/categoryDetail', productController.getProductByCategoryDetailLimit)
// GET: /api/v1/product/sort/limit
productRoute.get('/sort/limit', productController.getLimitProductByOption) 
// GET: /api/v1/product/search/name
productRoute.get('/search/name', productController.searchProductByName)
// GET: /api/v1/product/search/name/limit
productRoute.get('/search/name/limit', productController.searchProductByNameLimit)

module.exports = productRoute
