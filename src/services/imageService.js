const db = require('../models/index')

module.exports = {
    getAllImagesProduc: () => {
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
    },
    getAllImagesByProductId: (productId) => {
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
    },
    createImageProducts: async ({listImages, productId}) => {
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
                errMessage: 'Thêm ảnh thành công'
            };
        } catch (e) {
            throw e;
        }
    },
    deleteImage: async (arrId) => {
        try {
            await Promise.all(
                arrId.map(async item => {
                    await db.ImageProduct.destroy({
                        where: {
                            id: arrId
                        }
                    })
                })
            );
    
            return {
                errCode: 0,
                errMessage: 'Xóa ảnh thành công'
            };
        } catch (e) {
            throw e;
        }
    },
    getImageProductByCategory: (category) => {
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
}
