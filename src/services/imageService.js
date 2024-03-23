const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op


let getAllImagesProducService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let images = await db.ImageProduct.findAll()
            resolve({
                errCode: 0,
                data: images
            })
        } catch(e) {
            reject(e)
        }
    })
}

let getAllImagesByProductIdService = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let images = await db.ImageProduct.findAll({
                where: {
                    productId
                } 
            })
            resolve({
                errCode: 0,
                data: images
            })
        } catch(e) {
            reject(e)
        }
    })
}

let createImageProductsService = async ({listImages, productId}) => {
    try {
        await Promise.all(
            listImages.map(async item => {
                let image = await db.ImageProduct.findOne({
                    where: {
                        image: item,
                        productId
                    }
                });
                if (!image) {
                    await db.ImageProduct.create({
                        image: item,
                        productId
                    });
                }
            })
        );

        return {
            errCode: 0,
            errMessage: 'Create success'
        };
    } catch (e) {
        throw e;
    }
};

let deleteImageService = async (listImagesDeleted, productId) => {
    try {
        await Promise.all(
            listImagesDeleted.map(async item => {
                let image = await db.ImageProduct.findOne({
                    where: {
                        image: item,
                        productId
                    }
                });
                if (image) {
                    await image.destroy()
                }
            })
        );

        return {
            errCode: 0,
            errMessage: 'Create success'
        };
    } catch (e) {
        throw e;
    }
}

let getImageProductByCategoryService = (category) => {
    return new Promise(async (resolve, reject) => {
        try {
            let images = await db.ImageProduct.findAll({
                include: [
                    {
                        model: db.Product, as: 'dataImageProducts',
                        attributes: ['name'],
                        where: {
                            categoryDetailId: category
                        }
                    }
                ]
            })
            if (images.length > 0) {
                resolve({
                    errCode: 0,
                    data: images
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Image product by category not exist'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllImagesProducService,
    getAllImagesByProductIdService,
    createImageProductsService,
    deleteImageService,
    getImageProductByCategoryService
}