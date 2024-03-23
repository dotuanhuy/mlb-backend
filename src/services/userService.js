const db = require('../models/index')
const bcrypt = require('bcrypt')
const {Sequelize} = require('sequelize')
const salt = bcrypt.genSaltSync(10)
const fs = require('fs');
const OptGeneration = require('otp-generator')
const {createOTPService, validOTPService} = require('./otpService')
const Otp = require('../models/mongodb/otp');
const { resolve } = require('path');
const { sendEmail } = require('./nodemailerService')

// let check = await bcrypt.compareSync(password, user.password)
let hasUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassowrd = await bcrypt.hashSync(password, salt)
            resolve(hashPassowrd)
        }catch (err) {
            reject(err)
        }
    })
}

let getAlllUsersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                raw: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let findUserByEmailService = (email) => {
    return new Promise(async (resolve, resject) => {
        try {
            let user = await db.User.findOne({
                where: { email },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Role, as: 'dataRole'
                    }
                ],
                raw: true,
                nest: true
            })
            if (user) {
                resolve({
                    errCode: 0,
                    user
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'User is not exist'
                })
            }
        } catch (e) {
            resject(e)
        }
    })
}

let findUserByIdAndTokenService = ({id, token}) => {
    return new Promise(async (resolve, resject) => {
        try {
            let user = await db.User.findOne({
                where: { id: +id, token },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Role, as: 'dataRole'
                    }
                ],
                raw: true,
                nest: true
            })
            if (user) {
                resolve({
                    errCode: 0,
                    data: user
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'User is not exist'
                })
            }
        } catch (e) {
            resject(e)
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, resject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            resject(e)
        }
    })
}

let createNewUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1, 
                    errMessage: 'Email already exists'
                })
            }
            else {
                if (!data.firstName || !data.lastName || !data.phone || !data.password) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Missing required parameters in service'
                    })
                }
                else {
                    let hashPasswordBcrypt = await hasUserPassword(data.password)
                    await db.User.create({
                            email: data.email,
                            password: hashPasswordBcrypt,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phone: data.phone,
                            address: data.address,
                            gender: data.gender,
                            roleId: data.roleId,
                            avatar: data.avatar
                        })
                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    })
                }
            }
        } catch(e) {
            reject(e)
        }
    })
}

let deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId}
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exists'
                })
            }
            else {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'The user is deleted'
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}


let updateUserService = (data, id) => {
    return new Promise(async (resolve, reject) => {
        await db.User.update(data ,{
            where: { id }
        })
        .then(resolve)
        .catch(reject)
    })
}


let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await db.User.findOne({
                where: { email: email },
                include: [
                    {
                        model: db.Role, as: 'dataRole'
                    }
                ],
                raw: true,
                nest: true
            })
            if (user) {
                let check = await bcrypt.compareSync(password, user.password)    
                if (check) {
                    userData.errCode = 0
                    userData.errMessage = 'OK'
                    if (user.roleId === +process.env.ADMIN_ROLE) {
                        user.isAdmin = true
                    }
                    else {
                        user.isAdmin = false
                    }
                    delete user['password']
                    userData.data = user                 
                }
                else {
                    userData.errCode = 1
                    userData.errMessage = 'Wrong password'
                }
            }
            else {                
                userData.errCode = 1,
                userData.errMessage = `Your's Email isn't exist in your system`
            }
            resolve(userData)
        } catch(e) {
            reject(e)
        }
    })
}

let handleLogoutService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false,
            })
            if (user) {
                user.token = ''
                await user.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Successfully updated user token'
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exists'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let addDateTokeService = (token, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false,
            })
            if (user) {
                user.token = token
                await user.save()
                resolve({
                    errCode: 0,
                    data: 'Successfully updated user token'
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exists'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllAddressService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const pathToFile = './src/API/address.json';
            fs.readFile(pathToFile, 'utf8', (err, data) => {
                if (err) {
                  console.error('Error reading file:', err);
                  reject(err)
                }
              
                const jsonData = JSON.parse(data);
                resolve({
                    errCode: 0,
                    data: jsonData
                });
            });
        } catch (e) {
            reject(e)
        }
    })
}

let getUserByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        await db.User.findOne({
            where: {
                id : id
            },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Role, as: 'dataRole',
                    attributes: ['id' ,'name']
                }
            ],
            raw: false,
            nest: true
        })
        .then(resolve)
        .catch(reject)
    })
}

let getLimitUserService = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAndCountAll({
                attributes: {
                    exclude: ['password']
                },
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let verifyOtpService = async ({otp, email}) => {
    try {
        const otpHolder = await Otp.find({
            email
        })
        if (!otpHolder.length) {
            return {
                errCode: 1,
                errMessage: 'Mã xác thực đã hiệu lực hết hạn'
            }
        }
        // get last otp
        const lastOtp = otpHolder[otpHolder.length - 1]
        const isValid = await validOTPService({ otp, hashOtp: lastOtp.otp })
        if (!isValid) {
            return{
                errCode: 1,
                errMessage: 'Mã xác thực không chính xác'
            }
        }
        if (isValid && email === lastOtp.email) {
            await Otp.deleteMany({ email })
            return {
                errCode: 0,
                data: email
            }
        }
    } catch (e) {
        console.log('verifyOtpService error: ', e)
        return (e)
    }
}

let sendMailService = (email) => {
    return new Promise(async (resolve, reject) => {
        // otp random 6 ký tự số
        let otp = OptGeneration.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        const infor = await createOTPService({ email, otp })
        const data = await sendEmail({email, otp})
        if (!data) {
            otp = ''
        }
        resolve({
            errCode: infor.errCode,
            data: otp
        })
    })
}

let registerSevice = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.password) {
                let hashPasswordBcrypt = await hasUserPassword(password)
                data.password = hashPasswordBcrypt
            }
            let user = await db.User.create(data)
            if (user) {
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo tài khoản thành công',
                    user
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let resetPasswordService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                let check = await bcrypt.compareSync(data.oldPassword, user.password)
                if (check) {
                    let hashPasswordBcrypt = await hasUserPassword(data.newPassword)
                    user.set({
                        password: hashPasswordBcrypt
                    })
                    await user.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Reset pasword the success'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mật khẩu cũ chưa chính xác'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getCountUsersService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quantity = await db.User.findOne({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                ]
            })
            resolve({
                errCode: 0,
                data: quantity
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAlllUsersService,
    findUserByEmailService,
    checkEmail,
    findUserByIdAndTokenService,
    createNewUserService,
    deleteUserService,
    handleLoginService,
    handleLogoutService,
    addDateTokeService,
    getAllAddressService,
    updateUserService,
    updateRefreshRokenService: ({id, token}) => {
        return new Promise(async(resolve, reject) => {
            try {
                await db.User.update({ token }, {
                    where: { id }
                })
                resolve({
                    errCode: 0
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getUserByIdService,
    getLimitUserService,
    verifyOtpService,
    sendMailService,
    registerSevice,
    resetPasswordService,
    getCountUsersService
}