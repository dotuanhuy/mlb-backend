const express = require('express')
const reviewController = require('../controllers/reviewController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const reviewRoute = express.Router()

// GET: /api/v1/review/product
reviewRoute.get('/product', reviewController.getReviewProduct)
// POST: /api/v1/review/feedback/create
reviewRoute.post('/feedback/create', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    reviewController.createFeebback
)
// POST: /api/v1/review/feedback/update
reviewRoute.post('/feedback/update', 
    verifyAccessToken, 
    authMiddlewareController.verifyTokenAdmin, 
    reviewController.updateFeebback
)
// DELETE: /api/v1/review/feedback/delete
reviewRoute.delete('/feedback/delete/:id', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin, 
    reviewController.deleteFeebback
)
// POST: /api/v1/review/update
reviewRoute.post('/update', verifyAccessToken, reviewController.updateReview)
// DELETE: /api/v1/review/delete
reviewRoute.delete('/delete', verifyAccessToken, reviewController.deleteReview)

module.exports = reviewRoute
