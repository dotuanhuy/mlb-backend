const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const { verifyAccessToken } = require('../middlewares/verifyAccessTokenMiddleware')
const passport = require('passport')

const authRoute = express.Router()

// GET: /api/v1/auth/authentication
authRoute.post('/authentication', verifyAccessToken, authController.authentication)
// POST: /api/v1/auth/refresh
authRoute.post('/refresh', authController.handleRefreshToken)
// POST: /api/v1/auth/login
authRoute.post('/login', authController.loginWeb)
// GET: /api/v1/auth/google
authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
authRoute.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, authController.loginWebDifferently)
// POST: /api/v1/auth/google/success
authRoute.post('/google/success', authController.loginWebDifferentlySuccess)
// POST: /api/v1/auth/logout
authRoute.post('/logout', verifyAccessToken, authController.handleLogout)
// POST: /api/v1/auth/send-mail
authRoute.post('/send-mail', authController.sendMail)
// POST: /api/v1/auth/verifyotp
authRoute.post('/verifyotp', authController.verifyOtp)
// POST: /api/v1/auth/register
authRoute.post('/register', authController.register)
// POST: /api/v1/auth/password/change
authRoute.post('/password/change', verifyAccessToken, userController.changePassword)
// POST: /api/v1/auth/password/forgot
authRoute.post('/password/forgot', authController.forgotPassword)

// app.get('/api/get-refresh-token', authController.getRefreshToken)

module.exports = authRoute
