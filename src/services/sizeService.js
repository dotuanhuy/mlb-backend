const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op


module.exports = {
    getAllSizesByTypeService: (type) => {
        return new Promise(async (resolve, reject) => {
            try {
                let sizes = await db.Size.findAll({
                    where: { type }
                })
                if (sizes) {
                    resolve({
                        errCode: 0,
                        data: sizes
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Sizes is not exitst'
                })
            } catch(e) {
                reject(e)
            }
        })
    },
    createSizeDetailService: async ({listSizesAdded, id}) => {
        try {
            await Promise.all(
                listSizesAdded.map(async item => {
                    await db.SizeDetail.create({
                        productId: id,
                        sizeId: item
                    })
                })
            )
            return {
                errCode: 0,
                errMessage: 'Create sizeDetail success'
            }
        } catch(e) {
            throw e
        }
    },
    deleteSizeDetailByProductIdService: async ({listSizesDeleted, id}) => {
        try {
            await Promise.all(
                listSizesDeleted.map(async item => {
                    await db.SizeDetail.destroy({
                        where: {
                            productId: id,
                            sizeId: item
                        }
                    })
                })
            )
            return {
                errCode: 0,
                errMessage: 'Delete sizeDetail success'
            }
        } catch (e) {
            throw e
        }
    },
    deleteSizeDetailByProductId: async (id) => {
        return new Promise((resolve, rejcet) => {
            db.SizeDetail.destroy({
                where: {
                    productId: id,
                }
            })
            .then(resolve)
            .catch(rejcet)
        })
    }
}