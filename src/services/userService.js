const db = require('../models/index')
const bcrypt = require('bcrypt')
const { Sequelize } = require('sequelize')
const salt = bcrypt.genSaltSync(10)
const fs = require('fs');
const OptGeneration = require('otp-generator')
const { createOTPService, validOTPService } = require('./otpService')
const Otp = require('../models/mongodb/otp');
const { sendEmail } = require('./nodemailerService');

module.exports = {
    hasUserPassword: async (password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const hashPassowrd = await bcrypt.hashSync(password, salt)
                resolve(hashPassowrd)
            } catch (err) {
                reject(err)
            }
        })
    },
    getAlllUsersService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAll({
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
    },
    findUserByEmailService: (email) => {
        return new Promise(async (resolve, reject) => {
            db.User.findOne({
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
                .then(resolve)
                .catch(reject)
        })
    },
    findUserByIdAndTokenService: ({ id, token }) => {
        return new Promise(async (resolve, resject) => {
            try {
                const user = await db.User.findOne({
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
    },
    checkEmail: (email) => {
        return new Promise(async (resolve, resject) => {
            db.User.findOne({
                where: { email: email }
            })
                .then(resolve)
                .catch(resject)
        })
    },
    createNewUserService: (data) => {
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
                        const hashPasswordBcrypt = await hasUserPassword(data.password)
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
            } catch (e) {
                reject(e)
            }
        })
    },
    deleteUserService: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.User.findOne({
                    where: { id: userId }
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
            } catch (e) {
                reject(e)
            }
        })
    },
    updateUserService: (data, id) => {
        return new Promise(async (resolve, reject) => {
            await db.User.update(data, {
                where: { id }
            })
                .then(resolve)
                .catch(reject)
        })
    },
    loginWebService: (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = {}
                const user = await db.User.findOne({
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
            } catch (e) {
                reject(e)
            }
        })
    },
    handleLogoutService: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.User.findOne({
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
    },
    addDateTokeService: (token, id) => {
        return new Promise(async (resolve, reject) => {
            db.User.update({ token }, {
                where: { id }
            })
                .then(resolve)
                .catch(reject)

        })
    },
    getAllAddressService: () => {
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
    },
    getUserByIdService: (id) => {
        return new Promise(async (resolve, reject) => {
            await db.User.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Role, as: 'dataRole',
                        attributes: ['id', 'name']
                    }
                ],
                raw: false,
                nest: true
            })
                .then(resolve)
                .catch(reject)
        })
    },
    getLimitUserService: (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAndCountAll({
                    attributes: {
                        exclude: ['password']
                    },
                    include: {
                        model: db.Role, as: 'dataRole'
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
    },
    findEmailOtp: (email) => {
        return new Promise((resolve, reject) => {
            Otp.find({
                email
            })
                .then(resolve)
                .catch(reject)
        })
    },
    deleteOtp: (email) => {
        return new Promise((resolve, reject) => {
            Otp.deleteMany({ email })
                .then(resolve)
                .catch(reject)
        })
    },
    sendMailService: (email) => {
        return new Promise(async (resolve, reject) => {
            // otp random 6 ký tự số
            let otp = OptGeneration.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })
            const infor = await createOTPService({ email, otp })
            const data = await sendEmail({ email, otp })
            if (!data) {
                otp = ''
            }
            resolve({
                errCode: infor.errCode,
                data: otp
            })
        })
    },
    register: (data) => {
        return new Promise(async (resolve, reject) => {
            db.User.create(data)
                .then(resolve)
                .catch(reject)
        })
    },
    getPasswordById: (id) => {
        return new Promise((resolve, reject) => {
            db.User.findOne({
                where: id,
                attributes: ['password'],
                raw: true
            })
                .then(resolve)
                .catch(reject)
        })
    },
    changePassword: ({ id, password }) => {
        return new Promise(async (resolve, reject) => {
            db.User.update({ password }, {
                where: { id }
            })
                .then(resolve)
                .catch(reject)
        })
    },
    getCountUsersService: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const quantity = await db.User.findOne({
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
    },
    updateRefreshRokenService: ({ id, token }) => {
        return new Promise(async (resolve, reject) => {
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
    updateInfor: ({ id, firstName, lastName, birthDate, phone, gender, address }) => {
        return new Promise((resolve, reject) => {
            db.User.update({ firstName, lastName, birthDate, phone, gender, address }, {
                where: {
                    id
                }
            })
                .then(resolve)
                .catch(reject)
        })
    },
    findUserByName: (userName, page) => {
        return new Promise((resolve, reject) => {
            db.User.findAndCountAll({
                where: {
                    [Sequelize.Op.or]: [
                        {
                            firstName: {
                                [Sequelize.Op.substring]: userName
                            },
                        },
                        {
                            lastName: {
                                [Sequelize.Op.substring]: userName
                            }
                        }
                    ]
                },
                attributes: {
                    exclude: ['password']
                },
                include: {
                    model: db.Role, as: 'dataRole'
                },
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
                .then(resolve)
                .catch(reject)
        })
    }
}