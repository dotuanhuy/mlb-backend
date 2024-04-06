const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op

module.exports = {
    getAllColorsService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let colors = await db.Color.findAll()
                if (colors) {
                    resolve({
                        errCode: 0,
                        data: colors
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Colors is not exitst'
                })
            } catch(e) {
                reject(e)
            }
        })
    },
    createColorDetailService: async ({listColorsAdded, id}) => {
        try {
            await Promise.all(
                listColorsAdded.map(async item => {
                    await db.ColorDetail.create({
                        productId: id,
                        colorId: item
                    })
                })
            )
            return {
                errCode: 0,
                errMessage: 'Create colorDetail success'
            }
        } catch(e) {
            throw e
        }
    },
    deleteColorDetailByProductIdService: async ({listColorsDeleted, id}) => {
        try {
            await Promise.all(
                listColorsDeleted.map(async item => {
                    await db.ColorDetail.destroy({
                        where: {
                            productId: id,
                            colorId: item
                        }
                    })
                })
            )
            return {
                errCode: 0,
                errMessage: 'Delete colorDetail success'
            }
        } catch (e) {
            throw e
        }
    },
    deleteColorDetailByProductId: async (id) => {
        return new Promise((resolve, reject) => {
            db.ColorDetail.destroy({
                where: {
                    productId: id                
                }
            })
            .then(resolve)
            .catch(reject)
        })
    }
}