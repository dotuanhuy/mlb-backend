require('dotenv').config()
const JWT = require('jsonwebtoken')

const signAccessToken = async (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user.id, 
            roleId: user.roleId, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const option = {
            expiresIn: '1m' // 1p
        }
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
}

const signRefreshToken = async (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user.id, 
            roleId: user.roleId, 
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email
        }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const option = {
            expiresIn: '2d' // 2 day
        }
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
}

const verifyAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) { 
                reject(err)
            }
            resolve(payload)
        })
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                reject(err)
            }
            resolve(payload)
        })
    })
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}
