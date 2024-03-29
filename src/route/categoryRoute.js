const express = require('express')
const categoryController = require('../controllers/categoryController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const categoryRoute = express.Router()

// GET: /api/v1/category
categoryRoute.get('/', categoryController.getAllCategories)
// GET: /api/v1/category/detail
categoryRoute.get('/detail', categoryController.getAllCategoriesDetail)
// GET: /api/v1/category/detail/type
categoryRoute.get('/detail/type', categoryController.getAllCategoriesDetailByType)
// GET: /api/v1/category/type
categoryRoute.get('/type', categoryController.getCategoriesByType)

module.exports = categoryRoute
