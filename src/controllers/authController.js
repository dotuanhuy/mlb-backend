const { verifyRefreshToken, signAccessToken, signRefreshToken } = require('../config/jwt')
const userService = require('../services/userService')
const authService = require('../services/authService')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const { AES } = require('crypto-js')

module.exports = {
    handleRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.token
            if (!refreshToken) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Refresh token is missing'
                })
            }
            const { id, roleId, firstName, lastName, email } = await verifyRefreshToken(refreshToken)
            const accessToken = await signAccessToken({ id, roleId, firstName, lastName, email })
            const refToken = await signRefreshToken({ id, roleId, firstName, lastName, email })

            await res.clearCookie('token')
            await res.cookie('token', refToken, {
                httpOnly: true,
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Ngăn chặn tất công CSRT,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            })
            return res.status(200).json({
                errCode: 0,
                accessToken
            })
        } catch (e) {
            await res.clearCookie('token')
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    // getRefreshToken,
    authentication: (req, res) => {
        const { roleId } = req?.user
        if (!roleId) {
            return res.json({
                errCode: 1,
                errMessage: 'Invalid user'
            })
        }
        else {
            if (roleId === +process.env.ADMIN_ROLE) {
                return res.status(200).json({
                    errCode: 0,
                    isAdmin: 1
                })
            }
            return res.status(200).json({
                errCode: 0,
                isAdmin: 0
            })
        }
    },
    loginWeb: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    errMessage: 'Missing required parameters'
                })
            }
            const user = await authService.isUserWeb(email)
            if (!user) {
                return res.status(400).json({
                    errMessage: 'Người dùng không tồn tại trong hệ thống'
                })
            }
            const comparePassword = await bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({
                    errMessage: 'Mật khẩu không đúng. Vui lòng nhập lại!'
                })
            }
            const accessToken = await signAccessToken(user)
            const refreshToken = await signRefreshToken(user)

            delete user['password']
            user.accessToken = accessToken
            // Tạo refresh token
            await res.cookie('token', refreshToken, {
                httpOnly: true,
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Ngăn chặn tất công CSRT,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            })
            const { firstName, lastName, phone, gender, avatar, birthDate, address } = user
            // Tạo cookie my infor
            const jsonInfo = JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                gender,
                avatar,
                birthDate,
                address
            })
            const encrypted = AES.encrypt(jsonInfo, process.env.KEY_AES).toString()
            user.info = encrypted
            // await res.cookie('info', encrypted, {
            //     httpOnly: false,
            //     path: '/',
            //     sameSite: 'none',
            //     secure: true,
            //     expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            // })
            return res.status(200).json({
                errCode: 0,
                data: user
            })
        } catch (e) {
            await res.clearCookie('token')
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    loginWebDifferently: async (req, res) => {
        try {
            const profile = req?.user
            let user = await userService.findUserByEmailService(profile?.emails[0]?.value)
            if (!user) {
                const data = await userService.register({
                    email: profile?.emails[0]?.value,
                    firstName: profile?.name?.givenName,
                    lastName: profile?.name?.familyName,
                    avatar: profile?.photos[0]?.value,
                    typeLogin: profile?.provider,
                    roleId: process.env.USER_ROLE,
                })
                user = data?.dataValues
            }
            const token = await signRefreshToken({
                id: user.id,
                roleId: user.roleId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
            return res.redirect(`${process.env.CLIENT_URL}/login-success?id=${user?.id}&token=${token}`)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    loginWebDifferentlySuccess: async (req, res) => {
        try {
            const { id, token } = req?.body
            if (!id || !token) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const user = await userService.getUserById(+id)
            if (!user) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
            const refreshToken = await signRefreshToken(user)
            const accessToken = await signAccessToken(user)
            user.accessToken = accessToken
            await res.cookie('token', refreshToken, {
                httpOnly: true,
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Ngăn chặn tất công CSRT,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            })

            const { firstName, lastName, email, phone, gender, avatar, birthDate, address } = user
            // Tạo cookie my infor
            const jsonInfo = JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                gender,
                avatar,
                birthDate,
                address
            })
            const encrypted = AES.encrypt(jsonInfo, process.env.KEY_AES).toString()
            user.info = encrypted
            // await res.cookie('info', encrypted, {
            //     httpOnly: false,
            //     path: '/',
            //     sameSite: 'none',
            //     secure: true,
            //     expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            // })
            return res.status(200).json({
                errCode: 0,
                data: user
            })
        } catch (e) {
            await res.clearCookie('token')
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    handleLogout: async (req, res) => {
        try {
            const user = req.user
            await res.clearCookie('token')
            // await res.clearCookie('info')
            if (!user) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
            const data = await userService.getUserById(user?.id)
            if (!data) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Đăng xuất thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    sendMail: async (req, res) => {
        try {
            const { email, type } = req.body
            if (!email || !type) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const check = await userService.checkEmail(email)
            if (check) {
                if (type === 'register') {
                    return res.status(400).json({
                        errCode: 1,
                        errMessage: 'Email đã tồn tại. Vui lòng nhập email khác'
                    })
                }
            }
            else {
                if (type === 'forgot password') {
                    return res.status(400).json({
                        errCode: 1,
                        errMessage: 'Email không tồn tại trên hệ thống. Vui lòng kiểm tra lại'
                    })
                }
            }
            const data = await userService.sendMailService(email)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    verifyOtp: async (req, res) => {
        try {
            const { otp, email } = req.body
            if (!otp || !email) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const otpHolder = await userService.findEmailOtp(email)
            if (!otpHolder.length) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Mã xác thực hết hạn'
                })
            }
            const lastOtp = otpHolder[otpHolder.length - 1]
            const isValid = await bcrypt.compareSync(otp, lastOtp?.otp)
            if (!isValid) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Mã xác thực không chính xác'
                })
            }
            if (isValid && email === lastOtp?.email) {
                const deleted = await userService.deleteOtp(email)
                return res.status(200).json({
                    errCode: 0,
                    data: email,
                    isVerify: true
                })
            }
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Xác thực thất bại. Vui lòng thử lại'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    register: async (req, res) => {
        try {
            const { email, firstName, lastName, phone, password } = req?.body
            if (!email || !firstName || !lastName || !phone || !password) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const check = await userService.checkEmail(email)
            if (check) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại. Vui lòng nhập email khác'
                })
            }
            const hashPassword = await bcrypt.hashSync(password, salt)
            const infor = await userService.register({ email, firstName, lastName, phone, password: hashPassword, roleId: 2 })
            if (infor) {
                return res.status(200).json({
                    errCode: 0,
                    errMessage: 'Đăng ký tài khoản thành công'
                })
            }
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Đăng ký tài khoản thất bại'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const hashPassowrd = await bcrypt.hashSync(password, salt)
            const info = await authService.forgotPassword({ email, password: hashPassowrd })
            if (!info) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Lấy lại mật khẩu thất bại. Vui lòng thử lại'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Lấy lại mật khẩu thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
}
