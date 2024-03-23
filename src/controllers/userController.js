const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const { signAccessToken, signRefreshToken } = require('../config/jwt')

let getAllUsers = async (req, res) => {
    try {
        let data = await userService.getAlllUsersService()
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createNewUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let infor = await userService.createNewUserService(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1, 
            errMessage: 'Error from the server'
        })
    }
}

let deleteUser = async (req, res) => {
    try {
        const {id} = req.query
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let infor = await userService.deleteUserService(id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateUser = async (req, res) => {
    try {
        const {id} = req.query
        const { firstName, lastName, phone, address, gender, roleId } = req?.body
        if (!firstName || !lastName || !phone || !address || !gender || !roleId || !id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        const user = await getUserByIdService(id)
        if (!user) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'User is not exist'
            })
        }
        const data = {
            firstName,
            lastName,
            phone,
            address,
            gender,
            roleId
        }
        const infor = await userService.updateUserService(data, id)
        if (!infor) {
            return res.status(200).json({ errCode: 1, errMessage: 'Update user failed'})
        }
        return res.status(200).json({ errCode: 0, errMessage: 'Update user successfully'})
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}



let getAllAddress = async (req, res) => {
    try {
        let data = await userService.getAllAddressService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getUserById = async (req, res) => {
    try {
        if(!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        const user = await userService.getUserByIdService(req.query.id)
        if (!user) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'User is not exist'
            })
        }
        return res.status(200).json({ errCode: 0, data: user})
    } catch(e) {
        console.log(e)
        return res.status(200).jso({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getLimitUsers = async (req, res) => {
    try {
        if (!req.query.page) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await userService.getLimitUserService(req.query.page)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let verifyOtp = async (req, res) => {
    try {   
        const { otp, email } = req.body
        if (!otp || !email ) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        const data = await userService.verifyOtpService({otp, email})
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let sendMail = async (req, res) => {
    try {   
        const { email } = req.body
        if (!email) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let check = await userService.checkEmail(email)
        if (check) {
            return res.status(200).json({
                errCode: 2,
                errMessage: 'Email đã tồn tại. Vui lòng nhập email khác'
            })
        }
        const data = await userService.sendMailService(email)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let register = async (req, res) => {
    try {
        const { email, firstName, lastName, phone, password } = req?.body
        if (!email || !firstName || !lastName || !phone || !password) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let check = await userService.checkEmail(email)
        if (check) {
            return res.status(200).json({
                errCode: 2,
                errMessage: 'Email đã tồn tại. Vui lòng nhập email khác'
            })
        }
        let infor = await userService.registerSevice({email, firstName, lastName, phone, password})
        return res.status(200).json(infor)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let resetPassword = async (req, res) => {
    try {   
        const { id, newPassword, oldPassword } = req?.body
        if (!id || !newPassword || !oldPassword) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let infor = await userService.resetPasswordService(req.body)
        return res.status(200).json(infor)
    } catch (e) {   
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getCountUsers = async (req, res) => {
    try {   
        let data = await userService.getCountUsersService()
        return res.status(200).json(data)
    } catch (e) {   
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}
module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    // generrateAccessToken,
    // generrateRefreshToken,
    getAllAddress,
    updateUser,
    getUserById,
    getLimitUsers,
    verifyOtp,
    sendMail,
    register,
    resetPassword,
    getCountUsers
}