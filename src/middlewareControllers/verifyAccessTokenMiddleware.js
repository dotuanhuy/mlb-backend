require('dotenv').config()
const JWT = require('jsonwebtoken')

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['x-token']) {
            return res.status(200).json({
                errCode: 1, 
                errMessage: 'Invalid token'
            })
        }
        const authHeader = req.headers['x-token']
        const bearerToken = authHeader.split(' ')[1]
        // start verify token
        JWT.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) { 
                if (err.name === 'TokenExpiredError') {
                    return res.status(200).json({
                        errCode: 401, 
                        errMessage: err.message
                    })
                }
                return res.status(200).json({
                    errCode: 1, 
                    errMessage: err.message
                })
            }
            req.user = payload
            return next()
        })
    }
} 
