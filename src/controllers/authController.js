const { verifyRefreshToken, signAccessToken, signRefreshToken } = require('../config/jwt')
const userService = require('../services/userService')

const handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.token
        if (!refreshToken) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Refresh token is missing'
            })
        }
        const { id, roleId, firstName, lastName, email } = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken({id, roleId, firstName, lastName, email})
        const refToken = await signRefreshToken({id, roleId, firstName, lastName, email})

        await res.clearCookie('token')
        await res.cookie('token', refToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict', // Ngăn chặn tất công CSRT,
            secure: false,
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({
            errCode: 0,
            accessToken
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// const getRefreshToken = async (req, res, next) => {
//     try {
//         const {refreshToken} = req.body
//         if (!refreshToken) {
//             return res.status(200).json({
//                 errCode: 1,
//                 errMessage: 'Refresh token is missing'
//             })
//         }
//         const { id, roleId, firstName, lastName, email } = await verifyRefreshToken(refreshToken)
//         const accessToken = await signAccessToken({id, roleId, firstName, lastName, email})
//         const refToken = await signRefreshToken({id, roleId, firstName, lastName, email})
//         return res.status(200).json({
//             errCode: 0,
//             accessToken
//         })
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from server'
//         })
//     }
// }

const authentication =  (req, res) => {
    const {roleId} = req?.user
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
}

module.exports = {
    handleRefreshToken,
    // getRefreshToken,
    authentication,
    handleLogin: async (req, res) => {
        try {
            let email = req.body.email
            let password = req.body.password
            if (!email || !password) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await userService.handleLoginService(email, password) 
            if (user.errCode === 0) {
                const accessToken = await signAccessToken(user.data)
                const refreshToken = await signRefreshToken(user.data)
                let data = await userService.addDateTokeService(refreshToken, user.data.id)    // Thêm token khi đăng nhập thành công
                if (data.errCode !== 0) {
                    return res.status(200).json({
                        errCode: -1,
                        errMessage: 'Error from the server'
                    })
                }
                user = {
                    ...user,
                    accessToken,
                }
                await res.cookie('token', refreshToken, {
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict', // Ngăn chặn tất công CSRT,
                    secure: false,
                    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                })
            }
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    handleLoginDifferently: async (req, res) => {
        try {
            const profile = req?.user
            const {user} = await userService.findUserByEmailService(profile?.emails[0]?.value)
            let token = ''
            let id = ''
            if (!user) {
                const data = await userService.registerSevice({
                    email: profile?.emails[0]?.value, 
                    firstName: profile?.name?.givenName, 
                    lastName: profile?.name?.familyName, 
                    avatar: profile?.photos[0]?.value,
                    typeLogin: profile?.provider,
                    roleId: process.env.USER_ROLE,
                })
                const userDB = data.user
                id = userDB.id
                token = await signRefreshToken({
                    id: userDB.id, 
                    roleId: userDB.roleId, 
                    firstName: userDB.firstName, 
                    lastName: userDB.lastName,
                    email: userDB.email
                })
                await userService.updateRefreshRokenService({ id: userDB.id, token })
            }
            else {
                id = user.id
                token = await signRefreshToken({
                    id: user.id, 
                    roleId: user.roleId, 
                    firstName: user.firstName, 
                    lastName: user.lastName,
                    email: user.email
                })
                await userService.updateRefreshRokenService({ id: user.id, token })
            }
            res.redirect(`${process.env.CLIENT_URL}/login-success?id=${id}&token=${token}`)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    handleLoginDifferentlySuccess: async (req, res) => {
        try {
            let { id, token } = req?.body
            if (!id || !token) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            let infor = await userService.findUserByIdAndTokenService(req?.body)
            if (infor.errCode !== 0) {
                return res.status(200).json(infor)
            }
    
            const accessToken = await signAccessToken(infor.data)
            await res.cookie('token', infor?.data?.token, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict', // Ngăn chặn tất công CSRT,
                secure: false,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            })
            return res.status(200).json({
                ...infor,
                accessToken,
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    handleLogout: async (req, res) => {
        try {
            await res.clearCookie('token')
            if (req?.user) {
                let data = await userService.handleLogoutService(req?.user.id)
                return res.status(200).json(data)
            }
            return res.status(200).json({
                errCode: 2,
                errMessage: 'User is not exist'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }
}
