const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const { signAccessToken, signRefreshToken } = require('../config/jwt')
const { AES } = require('crypto-js')
const moment = require('moment')

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const data = await userService.getAlllUsersService()
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    createNewUser: async (req, res) => {
        try {
            const { newUser } = req.body
            if (!newUser) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const isEmail = await userService.checkEmail(newUser?.email)
            if (isEmail) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại. Vui lòng sử dụng email khác'
                })
            }
            const hashPassword = await bcrypt.hashSync(newUser?.password, salt)
            newUser.password = hashPassword
            newUser.birthDate = moment(newUser.birthDate).format('YYYY-MM-DD')
            const info = await userService.createNewUserService(newUser)
            if (!info) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Thêm người dùng thất bại'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Thêm người dùng thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.query
            if (!id) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const user = await userService.getUserById(id)
            if (!user) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
            const info = await userService.deleteUserService(id)
            if (!info) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Xóa người dùng thất bại'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Xóa người dùng thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.query
            const { newUser } = req?.body
            if (!newUser || !id) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const user = await userService.getUserById(id)
            if (!user) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
            newUser.birthDate = moment(newUser.birthDate).format('YYYY-MM-DD')
            const info = await userService.updateUserService(newUser, id)
            if (!info) {
                return res.status(400).json({ errCode: 1, errMessage: 'Sửa người dùng thất bại. Vui lòng thử lại' })
            }
            return res.status(200).json({ errCode: 0, errMessage: 'Sửa người dùng thành công' })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getAllAddress: async (req, res) => {
        try {
            const data = await userService.getAllAddressService()
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getUserById: async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const user = await userService.getUserById(req.query.id)
            if (!user) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'User is not exist'
                })
            }
            return res.status(200).json({ errCode: 0, data: user })
        } catch (e) {
            console.log(e)
            return res.status(200).jso({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getLimitUsers: async (req, res) => {
        try {
            if (!req.query.page) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const data = await userService.getLimitUserService(req.query.page)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { id } = req.user
            const { newPassword, oldPassword } = req?.body
            if (!id || !newPassword || !oldPassword) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const { password } = await userService.getPasswordById(id)
            if (!password) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Mật khẩu không tồn tại'
                })
            }
            const isPassword = await bcrypt.compareSync(oldPassword, password)
            if (!isPassword) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Mật khẩu không đúng. Vui lòng nhập lại!'
                })
            }
            const hashPassowrd = await bcrypt.hashSync(newPassword, salt)
            const info = await userService.changePassword({ id, password: hashPassowrd })
            if (info) {
                return res.status(200).json({
                    errCode: 0,
                    errMessage: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại!'
                })
            }
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Đổi mật khẩu thất bại'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    getCountUsers: async (req, res) => {
        try {
            const data = await userService.getCountUsersService()
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    updateInfo: async (req, res) => {
        try {
            const { id, roleId, email } = req.user
            const { firstName, lastName, birthDate, phone, gender, address } = req.body
            const infoUser = await userService.getUserById(id)
            if (!id) {
                return res.status(400).json({
                    errCode: 0,
                    errMessage: 'Người dùng không tồn tại',
                })
            }
            const user = await userService.updateInfor({ id, firstName, lastName, birthDate: moment(birthDate).format('YYYY-MM-DD'), phone, gender, address })
            if (user) {
                const accessToken = await signAccessToken({ id, roleId, firstName, lastName, email })
                const refToken = await signRefreshToken({ id, roleId, firstName, lastName, email })
                await res.clearCookie('token')
                await res.cookie('token', refToken, {
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict', // Ngăn chặn tất công CSRT,
                    secure: false,
                    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                })
                const jsonInfo = JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    avatar: infoUser.avatar,
                    birthDate,
                    address,
                })
                const encrypted = AES.encrypt(jsonInfo, process.env.KEY_AES).toString()
                await res.clearCookie('info')
                await res.cookie('info', encrypted, {
                    httpOnly: false,
                    path: '/',
                    sameSite: 'strict', // Ngăn chặn tất công CSRT,
                    secure: false,
                    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                })
                return res.status(200).json({
                    errCode: 0,
                    errMessage: 'Sửa thông tin thành công',
                    accessToken
                })
            }
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Sửa thông tin thất bại'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    findUserByName: async (req, res) => {
        try {
            const { userName, page } = req.query
            if (!userName) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const users = await userService.findUserByName(userName, page)
            return res.status(200).json({
                errCode: 0,
                data: users
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
}