const express = require('express')
const userController = require('../controllers/userController')
const roleController = require('../controllers/roleController')
const authMiddlewareController = require('../middlewares/authMiddlewareController')
const { verifyAccessToken } = require('../middlewares/verifyAccessTokenMiddleware')

const userRoute = express.Router()

// GET: /api/v1/user
userRoute.get('/', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getAllUsers)
// POST: /api/v1/user/create
userRoute.post('/create', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.createNewUser)
// DELETE: /api/v1/user/delete
userRoute.delete('/delete', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.deleteUser)
// POST: /api/v1/user/update
userRoute.post('/update', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.updateUser)
// GET: /api/v1/user/limit
userRoute.get('/limit', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getLimitUsers)
// GET: /api/v1/user/address
userRoute.get('/address', userController.getAllAddress)
// GET: /api/v1/user/get/id
userRoute.get('/get/id', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getUserById)
// GET: /api/v1/user/count
userRoute.get('/count', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, userController.getCountUsers)
// GET: /api/v1/user/roles
userRoute.get('/roles', verifyAccessToken, authMiddlewareController.verifyTokenAdmin, roleController.getAllRoles)
// POST: /api/v1/user/update/info
userRoute.post('/update/info', verifyAccessToken, userController.updateInfo)
// GET: /api/v1/user/name
userRoute.get('/name',
    verifyAccessToken,
    authMiddlewareController.verifyTokenAdmin,
    userController.findUserByName
)

module.exports = userRoute
