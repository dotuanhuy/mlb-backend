const db = require('../models/index')


let getAllFavouriteProductService = (userId) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Favourite.findAll({
                where: {
                    userId: userId
                }
            })
            
            if (!products) {
                resolve({
                    errCode: 1,
                    errMessage: 'Products is not exists'
                })
            }
            resolve({
                errCode: 0,
                data: products
            })
            
        } catch (e) {
            reject(e)
        }
    })
}

let getAllFavouriteProductLimitService = (userId, offset) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.Favourite.count({
                where: {
                    userId: userId
                }
            })
            let products = await db.Favourite.findAll({
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
            
            if (!products) {
                resolve({
                    errCode: 1,
                    errMessage: 'Products is not exists'
                })
            }
            resolve({
                errCode: 0,
                data: {
                    count,
                    rows: products
                }
            })
            
        } catch (e) {
            reject(e)
        }
    })
}

let findProductFavouriteService = ({productId, userId}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let favourite = await db.Favourite.findOne({
                where: {
                    productId,
                    userId
                }
            })
            resolve(favourite)
        } catch (e) {
            reject(e)
        }
    })
}

let createProductFavouriteService = ({productId, userId}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Favourite.create({
                userId,
                productId
            })
            resolve({
                errCode: 0,
                status: +process.env.CREATE,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let deleteProductFavouriteService = (favourite) => {
    return new Promise(async (resolve, reject) => {
        try {
            await favourite.destroy()
            resolve({
                errCode: 0,
                status: +process.env.DELETE,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllFavouriteProductService,
    getAllFavouriteProductLimitService,
    findProductFavouriteService,
    createProductFavouriteService,
    deleteProductFavouriteService,
}
