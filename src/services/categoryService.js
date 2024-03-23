const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op

let getAllCategoriesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll({
                where: {
                    status: true
                },
                include: [
                    {
                        model: db.CategoryDetail, as: 'dataCategory',
                        attributes: ['id', 'name', 'type'],
                    },
                ]
            })
            if (categories) {
                resolve({
                    errCode: 0,
                    data: categories
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Categories is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getAllCategoriesDetailService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.CategoryDetail.findAll()
            if (categories) {
                resolve({
                    errCode: 0,
                    data: categories
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Categories is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getAllCategoriesDetailByTypeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll({
                where: {
                    type
                },
                include: [
                    {
                        model: db.CategoryDetail, as: 'dataCategory',
                        attributes: ['id', 'name', 'type'],
                    },
                ]
            })
            if (categories) {
                resolve({
                    errCode: 0,
                    data: categories
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Categories is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getCategoriesByTypeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findOne({
                where: {
                    type
                },
                include: [
                    {
                        model: db.CategoryDetail, as: 'dataCategory',
                        attributes: ['id', 'name', 'type']
                    }
                ]
            })
            if (categories) {
                resolve({
                    errCode: 0,
                    data: categories
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Categories is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getCategoryDetailByTypeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.CategoryDetail.findAll({
                where: {
                    type: [type]
                }
            })
            if (categories) {
                resolve({
                    errCode: 0,
                    data: categories
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'Categories is not exitst'
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getAllCategoriesDetailByTypeService,
    getCategoriesByTypeService,
    getCategoryDetailByTypeService
}