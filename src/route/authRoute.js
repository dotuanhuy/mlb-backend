const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const {verifyAccessToken} = require('../middlewares/verifyAccessTokenMiddleware')
const passport = require('passport')

const authRoute = express.Router()

// GET: /api/v1/auth/authentication
authRoute.post('/authentication', verifyAccessToken, authController.authentication)
// POST: /api/v1/auth/refresh
authRoute.post('/refresh', authController.handleRefreshToken)
// POST: /api/v1/auth/login
authRoute.post('/login', authController.handleLogin)
// GET: /api/v1/auth/google
authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
authRoute.get('/google/callback', (req, res, next) => {
passport.authenticate('google', (err, profile) => {
    req.user = profile
    next()
})(req, res, next)
}, authController.handleLoginDifferently)
// GET: /api/v1/auth/google/success
authRoute.post('/google/success', authController.handleLoginDifferentlySuccess)
// GET: /api/v1/auth/logout
authRoute.post('/logout',verifyAccessToken, authController.handleLogout)
// GET: /api/v1/auth/password/reset
authRoute.post('/password/reset', userController.resetPassword)

// app.get('/api/get-refresh-token', authController.getRefreshToken)

module.exports = authRoute
