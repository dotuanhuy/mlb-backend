const db = require('../models/index')
const { Sequelize, Op } = require('sequelize')

let findCartByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await db.Cart.findOne({
                where: {
                    userId
                }
            })
            resolve({
                errCode: 0,
                data: cart ? cart : []
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getCartsByUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Cart.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: db.Product, as: 'dataCartProduct',
                        attributes: [
                            'id', 'name', 'image', 'price',
                            // [Sequelize.fn('SUM', Sequelize.col('price')), 'price'],
                            // [Sequelize.fn('SUM', Sequelize.col('dataCartProduct.CartDetail.quantity')), 'totalQuantity'],
                        ],
                        order: ['CartDetail.createdAt', 'DESC'],
                        include: [
                            {
                                model: db.Discount, as: 'dataDiscounts',
                            },
                        ],
                    },
                ],
                // group: ['dataCartProduct.id'],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: data?.reverse()
            })
        } catch (e) {
            reject(e)
        }
    })
}

let addNewCartService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Cart.create({
                userId
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

let addProductToCartService = ({productId, userId, quantity, size, status=true}, cartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ''
            if (size) {
                data = await db.CartDetail.findOne({
                    where: { 
                        cartId,
                        productId,
                        size,
                        status: true
                    },
                })
            }
            else {
                data = await db.CartDetail.findOne({
                    where: { 
                        cartId,
                        productId,
                        status: true
                    },
                })
            }
            if (data) {
                data.quantity += +quantity
                await data.save()
            }
            else {
                await db.CartDetail.create({
                    cartId,
                    productId,
                    quantity: +quantity,
                    size,
                    status
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Added product to cart success'
            })
        } catch (e) {
            reject(e)
        }
    })
}


let deleteCartService = (cartDetailId) => {
    return new Promise(async (resolve, reject) => {
        try {   
            await db.CartDetail.destroy({
                where: { 
                    id: cartDetailId,
                    status: true
                }
            })
            resolve({
                errCode: 0,
                errMessage: 'Delete products in cart success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let changeCartService = ({cartDetailId, typeStep}) => {
    return new Promise(async (resolve, reject) => {
        try {   
            let data = await db.CartDetail.findOne({
                where: { 
                    id: cartDetailId,
                    status: true,
                    quantity: {
                        [Op.gt]: 0
                    }
                },
            })
            if (data) {
                let quantity = typeStep === process.env.STEPDOWN  ? +data.quantity - 1 : +data.quantity + 1
                if (quantity === 0) {
                    await data.destroy()
                }
                else {
                    data.quantity = quantity
                    await data.save()
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Change product in cart success'
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'The product dose not exist in cart'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    findCartByUserId,
    getCartsByUserService,
    addNewCartService,
    addProductToCartService,
    deleteCartService,
    changeCartService
}
