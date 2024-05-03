const express = require('express')
const notificationController = require('../controllers/notificationController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')

const notificationRoute = express.Router()

// GET: /api/v1/notification
notificationRoute.get('/', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    notificationController.getNotifications
)

// POST: /api/v1/notification/create
notificationRoute.post('/create', 
    verifyAccessToken,
    notificationController.createNotification
)

// POST: /api/v1/notification/update/read
notificationRoute.post('/update/read', 
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    notificationController.updateIsRead
)

module.exports = notificationRoute
