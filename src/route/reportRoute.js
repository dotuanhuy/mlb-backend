const express = require('express')
const reportController = require('../controllers/reportController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const reportRoute = express.Router()

// GET: /api/v1/report/month
reportRoute.get('/month', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    reportController.getMonthlyRevenue
)

// GET: /api/v1/report/day
reportRoute.get('/day', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    reportController.getDailyRevenue
)

// GET: /api/v1/report/day
reportRoute.get('/week', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    reportController.getWeeklyRevenue
)

// GET: /api/v1/report/year
reportRoute.get('/year', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    reportController.getYearRevenue
)

// GET: /api/v1/report/revenue
reportRoute.get('/revenue',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin, 
    reportController.getTotalRevenue
)

// GET: /api/v1/report/product/sell/top
reportRoute.get('/product/sell/top/:year',
    // verifyAccessToken,
    // authMiddlewareController.verifyTokenAdmin, 
    reportController.getTopTenBestSellingProductsYear
)


module.exports = reportRoute
