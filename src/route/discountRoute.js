const express = require('express')
const authMiddlewareController = require('../middlewareControllers/authMiddlewareController')
const discountController = require('../controllers/discountController')
const {verifyAccessToken} = require('../middlewareControllers/verifyAccessTokenMiddleware')

const discountRoute = express.Router()

// GET: /api/v1/discount
discountRoute.get('/', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getAllDiscounts)
// GET: /api/v1/discount/limit
discountRoute.get('/limit', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getLimitDiscount)
// POST: /api/v1/discount/create
discountRoute.post('/create', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.createDiscount)
// POST: /api/v1/discount/update
discountRoute.post('/update', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.updateDiscount)
// DELETE: /api/v1/discount/delete
discountRoute.delete('/delete', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.deleteDiscount)
// GET: /api/v1/discount/id
discountRoute.get('/id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, discountController.getDiscountById)

module.exports = discountRoute
