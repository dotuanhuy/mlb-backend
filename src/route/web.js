const express = require('express')
const passport = require('passport')
const roleController = require('../controllers/roleController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
const productTypeController = require('../controllers/productTypeController')
const discountController = require('../controllers/discountController')
const brandController = require('../controllers/brandController')
const sizeController = require('../controllers/sizeController')
const colorController = require('../controllers/colorController')
const logoController = require('../controllers/logoController')
const productController = require('../controllers/productController')
const imageController = require('../controllers/imageController')
const authController = require('../controllers/authController')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const fouriteProductController = require('../controllers/favouriteProductController')
const cartController = require('../controllers/cartController')
const firebaseController = require('../controllers/firebaseController')
const reviewController = require('../controllers/reviewController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const userRoute = require('./userRoute')
const authRoute = require('./authRoute')
const categoryRoute = require('./categoryRoute')
const productTypeRoute = require('./productTypeRoute')
const discountRoute = require('./discountRoute')
const brandRoute = require('./brandRoute')
const sizeRoute = require('./sizeRoute')
const colorRoute = require('./colorRoute')
const logoRoute = require('./logoRoute')
const productRoute = require('./productRoute')
const imageRoute = require('./imageRoute')
const reviewRoute = require('./reviewRoute')
const favouriteProductRoute = require('./favouriteRoute')

let router = express.Router()

const apiVersion = process.env.API_VERSION

// let initRoutes = (app) => {
//     // auth
//     app.post('/api/authentication', verifyAccessToken, authController.authentication)
//     app.post('/api/refresh', authController.handleRefreshToken)
//     // app.get('/api/get-refresh-token', authController.getRefreshToken)

//     // role
//     app.get('/api/get-all-roles', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, roleController.getAllRoles)

//     // google
//     app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
//     app.get('/api/auth/google/callback', (req, res, next) => {
//         passport.authenticate('google', (err, profile) => {
//             req.user = profile
//             next()
//         })(req, res, next)
//     }, userController.handleLoginDifferently)
//     app.post('/api/login-google-success', userController.handleLoginDifferentlySuccess)

//     // user
//     // app.get(`/api/${apiVersion}/user`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getAllUsers)
//     // app.post(`/api/${apiVersion}/user/create`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.createNewUser)
//     // app.delete(`/api/${apiVersion}/user/delete`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.deleteUser)
//     // app.post(`/api/${apiVersion}/user/update`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.updateUser)
//     // app.post(`/api/${apiVersion}/login`, userController.handleLogin)
//     // app.post(`/api/${apiVersion}/logout`,verifyAccessToken, userController.handleLogout)
//     // app.get(`/api/${apiVersion}/user/limit`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getLimitUsers)
//     // app.post(`/api/${apiVersion}/verifyotp`, userController.verifyOtp)
//     // app.post(`/api/${apiVersion}/send-mail`, userController.sendMail)
//     // app.post(`/api/${apiVersion}/register`, userController.register)
//     // app.post(`/api/${apiVersion}/reset-password`, userController.resetPassword)
//     // app.get(`/api/${apiVersion}/get-all-address`, userController.getAllAddress)
//     // app.get(`/api/${apiVersion}/get-user-by-id`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getUserById)
//     // app.get(`/api/${apiVersion}/get-count-users`, verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getCountUsers)
    
//     // category
//     app.get('/api/get-all-categories', categoryController.getAllCategories)
//     app.get('/api/get-all-categories-detail', categoryController.getAllCategoriesDetail)
//     app.get('/api/get-all-categories-detail-by-type', categoryController.getAllCategoriesDetailByType)
//     app.get('/api/get-categories-by-type', categoryController.getCategoriesByType)

//     // product type
//     app.get('/api/get-all-product-type', productTypeController.getAllProductTypes)
//     app.get('/api/get-product-type-limit', productTypeController.getLimitProductTypes)
//     app.get('/api/get-product-type-by-categoryId', productTypeController.getProductTypeByCategoryId)
//     app.get('/api/get-product-type-by-id', productTypeController.getProductTypeById)
//     app.post('/api/create-product-type', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productTypeController.createProductType)
//     app.post('/api/delete-product-type-by-id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productTypeController.deleteProductTypeById)
//     app.post('/api/update-product-type', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productTypeController.updateProductType)

//     // discount
//     app.get('/api/get-all-discounts', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getAllDiscounts)
//     app.get('/api/discount/limit', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getLimitDiscount)
//     app.post('/api/discount/create', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.createDiscount)
//     app.post('/api/discount/update', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.updateDiscount)
//     app.delete('/api/discount/delete', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.deleteDiscount)
//     app.get('/api/discount/get', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getDiscountById)

//     // brands
//     app.get('/api/get-all-brands', brandController.getAllBrands)

//     // size
//     app.get('/api/get-all-sizes-by-type', sizeController.getAllSizesByType)

//     //color
//     app.get('/api/get-all-colors', colorController.getAllColors)

//     //logo
//     app.get('/api/get-all-logos', logoController.getAllLogos)

//     // product
//     app.get('/api/get-all-prducts', productController.getAllProducts)
//     app.post('/api/create-new-product', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productController.createNewProduct, sizeController.createSizeDetail, colorController.createColorDetail)
//     app.post('/api/delete-product-by-id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, sizeController.deleteSizeDetailByProductId, colorController.deleteColorDetailByProductId, productController.deleteProduct)
//     app.get('/api/get-product-by-id', productController.getProductById)
//     app.post('/api/update-product', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productController.updateProduct, sizeController.changeSizeDetailByProductId, colorController.changeColorDetailByProductId)
//     app.get('/api/get-count-products', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productController.getCountProducts)
//     app.post('/api/change-image-product-by-id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productController.changeImageProduct) 
//     app.get('/api/get-all-description-product', productController.getAllDescriptionProduct)
//     app.post('/api/add-description-product', productController.addDescriptionProduct)
//     app.get('/api/get-all-product-public', productController.getAllProductPublic)
//     app.get('/api/get-quantity-ofeach-product-by-category', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, productController.getQuantityOfEachProductByCategory)
//     app.get('/api/get-product-by-category', productController.getProductByCategory)
//     app.get('/api/get-product-by-category-limit', productController.getProductByCategoryLimit)
//     app.get('/api/get-limit-products', productController.getLimitProducts)
//     app.get('/api/get-limit-product-by-option-sort', productController.getLimitProductByOption) 
//     app.get('/api/search-product-by-name', productController.searchProductByName)
//     app.get('/api/search-product-by-name-limit', productController.searchProductByNameLimit)
    
//     // Image
//     app.get('/api/get-all-images-product', imageController.getAllImagesProduct)
//     app.get('/api/get-all-images-by-productId', imageController.getAllImagesByProductId)
//     app.post('/api/change-image-product', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, imageController.changeImageProducts)
//     app.post('/api/delete-image-product', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, imageController.deleteImageProduct)
//     app.get('/api/get-image-product-by-category', imageController.getImageProductByCategory)

//     // review and feedback
//     app.get('/api/product/review', reviewController.getReviewProduct)
//     app.post('/api/product/feedback/create', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, reviewController.createFeebback)
//     app.post('/api/product/feedback/update', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, reviewController.updateFeebback)
//     app.delete('/api/product/feedback/delete/:id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, reviewController.deleteFeebback)
//     app.post('/api/product/review/update', verifyAccessToken, reviewController.updateReview)
//     app.delete('/api/product/review/delete', verifyAccessToken, reviewController.deleteReview)

//     // favourite
//     app.get('/api/get-all-favourite-products', verifyAccessToken, fouriteProductController.getAllFavouriteProduct)
//     app.get('/api/get-all-favourite-products-limit', verifyAccessToken, fouriteProductController.getAllFavouriteProductLimit)
//     app.post('/api/add-product-favourite',  verifyAccessToken, fouriteProductController.changeProductFavourite)

//     // cart
//     app.get('/api/get-product-cart-by-user', verifyAccessToken, cartController.getCartsByUser)
//     app.post('/api/add-product-to-cart', verifyAccessToken, cartController.addProductToCart)
//     app.post('/api/delet-products-cart', verifyAccessToken, cartController.deleteCart)
//     app.post('/api/delete-a-product-cart', verifyAccessToken, cartController.deleteAProductCart)

//     // firebase
//     app.get('/api/get-tutorial-sizes', firebaseController.getSize)

//     return app.use('/', router)
// }

router.use(`/api/${apiVersion}/user`, userRoute)
router.use(`/api/${apiVersion}/auth`, authRoute)
router.use(`/api/${apiVersion}/category`, categoryRoute)
router.use(`/api/${apiVersion}/producttype`, productTypeRoute)
router.use(`/api/${apiVersion}/discount`, discountRoute)
router.use(`/api/${apiVersion}/brand`, brandRoute)
router.use(`/api/${apiVersion}/size`, sizeRoute)
router.use(`/api/${apiVersion}/color`, colorRoute)
router.use(`/api/${apiVersion}/logo`, logoRoute)
router.use(`/api/${apiVersion}/product`, productRoute)
router.use(`/api/${apiVersion}/image`, imageRoute)
router.use(`/api/${apiVersion}/review`, reviewRoute)
router.use(`/api/${apiVersion}/favourite`, favouriteProductRoute)

// module.exports = initRoutes
module.exports = router
