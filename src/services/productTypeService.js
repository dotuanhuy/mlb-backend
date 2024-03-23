const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op

let getAllProductTypesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let productTypes = await db.ProductType.findAll({
                include: [
                    {
                        model: db.Category, as: 'dataProductTypeCategory',
                        attributes: ['id', 'name', 'type']
                    }
                ],
            })
            if (productTypes.length > 0) {
                resolve({
                    errCode: 0,
                    data: productTypes
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Product type is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getLimitProductTypesService = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productTypes = await db.ProductType.findAndCountAll({
                include: [
                    {
                        model: db.Category, as: 'dataProductTypeCategory',
                        attributes: ['id', 'name', 'type']
                    }
                ],
                order: [
                    ['id', 'DESC']
                ],
                offset: +page * (+process.env.LIMIT_PRODUCT),
                limit: +process.env.LIMIT_PRODUCT,
            })
            if (productTypes) {
                resolve({
                    errCode: 0,
                    data: productTypes
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Product type is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getProductTypeByCategoryIdService = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productTypes = await db.ProductType.findAll({
                include: [
                    {
                        model: db.Category, as: 'dataProductTypeCategory',
                        where: {
                            type: categoryId
                        }
                    }
                ]
            })
            if (productTypes) {
                resolve({
                    errCode: 0,
                    data: productTypes
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Product type is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getProductTypeByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productTypes = await db.ProductType.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: db.Category, as: 'dataProductTypeCategory',
                        attributes: ['id', 'name', 'type']
                    }
                ]
            })
            if (productTypes) {
                resolve({
                    errCode: 0,
                    data: productTypes
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Product type is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}


let createProductTypeService = ({name, categoryId, imageRoot}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ProductType.create({
                name,
                categoryId,
                imageRoot
            })
            resolve({
                errCode: 0,
                errMessage: 'Create product type success'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let deleteProductTypeByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ProductType.destroy({
                where: {
                    id
                }
            })
            resolve({
                errCode: 0,
                errMessage: 'Delete product type success'
            })
        } catch(e) {
            reject(e)
        }
    })
}

let updateProductTypeService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ProductType.update({
                name: data.name,
                status: data.status,
                categoryId: data.categoryId,
                imageRoot: data.imageRoot
            }, {
                where: { id: data.id }
            })
            resolve({
                errCode: 0,
                errMessage: 'Update product type success'
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllProductTypesService,
    getLimitProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeByIdService,
    updateProductTypeService,
}