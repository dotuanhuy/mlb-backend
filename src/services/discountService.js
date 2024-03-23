const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op

module.exports = {
    getAllDiscountsService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let discounts = await db.Discount.findAll()
                if (discounts) {
                    resolve({
                        errCode: 0,
                        data: discounts
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Discounts is not exitst'
                })
            } catch(e) {
                reject(e)
            }
        })
    },
    getLimitDiscount: (page) => {
        return new Promise((resolve, reject) => {
            db.Discount.findAndCountAll({
                order: [['id', 'DESC']],
                offset: +page * (+process.env.LIMIT_PAGE),
                limit: +process.env.LIMIT_PAGE,
                raw: true,
                nest: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createDiscount: (data) => {
        return new Promise((resolve, reject) => {
            db.Discount.create(data)
            .then(resolve)
            .catch(reject)
        })
    },
    updateDiscount: ({code, value, description, id}) => {
        return new Promise((resolve, reject) => {
            db.Discount.update({ code, value, description }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    deleteDiscount: (id) => {
        return new Promise((resolve, reject) => {
            db.Discount.destroy({
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getDiscountById: (id) => {
        return new Promise((resolve, reject) => {
            db.Discount.findOne({
                where: { id },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    }
}