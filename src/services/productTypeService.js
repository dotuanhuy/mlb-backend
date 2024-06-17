const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')


module.exports = {
    getAllProductTypes: () => {
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
            } catch (e) {
                reject(e)
            }
        })
    },
    getLimitProductTypes: (page) => {
        return new Promise(async (resolve, reject) => {
            db.ProductType.findAndCountAll({
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
                .then(resolve)
                .catch(reject)
        })
    },
    getProductTypeByCategoryId: (categoryId) => {
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
            } catch (e) {
                reject(e)
            }
        })
    },
    getProductTypeById: (id) => {
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
            } catch (e) {
                reject(e)
            }
        })
    },
    getImageProductTypeById: (id) => {
        return new Promise(async (resolve, reject) => {
            db.ProductType.findOne({
                attributes: ['imageRoot'],
                where: {
                    id
                },
                raw: true
            })
                .then(resolve)
                .catch(reject)
        })
    },
    createProductType: ({ name, categoryId, imageRoot }) => {
        return new Promise(async (resolve, reject) => {
            db.ProductType.create({
                name,
                categoryId,
                imageRoot
            })
                .then(resolve)
                .catch(reject)
        })
    },
    deleteProductTypeById: (id) => {
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
            } catch (e) {
                reject(e)
            }
        })
    },
    updateProductType: (data, id) => {
        return new Promise(async (resolve, reject) => {
            db.ProductType.update({
                name: data.name,
                status: data.status,
                categoryId: data.categoryId,
                imageRoot: data.imageUrl
            }, {
                where: { id }
            })
                .then(resolve)
                .catch(reject)
        })
    },
    getLimitProductTypesByName: (page, name) => {
        return new Promise(async (resolve, reject) => {
            db.ProductType.findAndCountAll({
                where: {
                    name: {
                        [Sequelize.Op.substring]: name
                    }
                },
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
                .then(resolve)
                .catch(reject)
        })
    },
}