const db = require('../models/index')

module.exports = {
    getAllFavouriteProduct: (userId) => {
        return new Promise(async (resolve, reject) => {
            db.Favourite.findAll({
                where: {
                    userId
                },
                raw: true
            })
                .then(resolve)
                .catch(reject)
        })
    },
    countProductFavourite: (userId) => {
        return new Promise((resolve, reject) => {
            db.Favourite.count({
                where: {
                    userId
                }
            })
                .then(resolve)
                .catch(reject)
        })
    },
    getAllFavouriteProductLimit: (userId, offset) => {
        return new Promise((resolve, reject) => {
            db.Favourite.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: db.Product, as: 'dataProductFavourite',
                        include: [
                            {
                                model: db.CategoryDetail, as: 'dataCategoryDetail',
                                attributes: ['id', 'name', 'categoryId', 'type'],
                                include: [
                                    {
                                        model: db.Category, as: 'dataCategory',
                                        attributes: ['id', 'name', 'type'],
                                    }
                                ]
                            },
                            {
                                model: db.Discount, as: 'dataDiscounts',
                                attributes: ['id', 'value', 'description'],
                            },
                            {
                                model: db.Logo, as: 'dataLogos',
                                attributes: ['id', 'name', 'image'],
                            },
                            {
                                model: db.Brand, as: 'dataBrands',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: db.ImageProduct, as: 'dataImageProducts',
                                attributes: ['image'],
                                limit: 1
                            },
                            {
                                model: db.Size, as: 'dataSizeDetail',
                                through: { model: db.SizeDetail },
                            }
                        ],
                    }
                ],
                offset: +offset * (+process.env.LIMIT_FAVOURITE),
                limit: +process.env.LIMIT_FAVOURITE,
            })
                .then(resolve)
                .catch(reject)
        })
    },
    getProductFavourite: (userId, productId) => {
        return new Promise(async (resolve, reject) => {
            db.Favourite.findOne({
                where: {
                    productId,
                    userId
                }
            })
                .then(resolve)
                .catch(reject)

        })
    },
    createProductFavourite: (userId, productId) => {
        return new Promise((resolve, reject) => {
            db.Favourite.create({
                userId,
                productId
            })
                .then(resolve)
                .catch(reject)
        })
    },
    deleteProductFavourite: (userId, productId) => {
        return new Promise((resolve, reject) => {
            db.Favourite.destroy({
                where: {
                    userId,
                    productId
                }
            })
                .then(resolve)
                .catch(reject)
        })
    },
}
