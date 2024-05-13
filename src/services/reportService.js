const { model } = require('mongoose')
const db = require('../models/index')
const Sequelize = require('sequelize')

module.exports = {
    getMonthlyRevenue: (year) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    orderStatus: 'finished',
                    createdAt: {
                        [Sequelize.Op.between]: [`${year}-01-01`, `${year}-12-31`]
                    }
                },
                include: [
                    {
                        model: db.Product, as: 'dataOrderProduct',
                    },
                    {
                        model: db.Payment, as: 'dataPayment',
                        where: {
                            isPaid: 1
                        }
                    }
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getDailyRevenue: (day) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    orderStatus: 'finished',
                    createdAt: {
                        [Sequelize.Op.between]: [new Date(day), new Date(day + ' 23:59:59')]
                    }
                },
                include: [
                    {
                        model: db.Product, as: 'dataOrderProduct',
                    },
                    {
                        model: db.Payment, as: 'dataPayment',
                        where: {
                            isPaid: 1
                        }
                    }
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getWeeklyRevenue: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    orderStatus: 'finished',
                    createdAt: {
                        [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                },
                include: [
                    {
                        model: db.Product, as: 'dataOrderProduct',
                    },
                    {
                        model: db.Payment, as: 'dataPayment',
                        where: {
                            isPaid: 1
                        }
                    }
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getYearRevenue: (startYear, endYear) => {
        return new Promise((resolve, reject) => {
            db.Order.findAll({
                where: {
                    orderStatus: 'finished',
                    createdAt: {
                        [Sequelize.Op.between]: [startYear, endYear]
                    }
                },
                include: [
                    {
                        model: db.Product, as: 'dataOrderProduct',
                    },
                    {
                        model: db.Payment, as: 'dataPayment',
                        where: {
                            isPaid: 1
                        }
                    }
                ],
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getTotalRevenue: () => {
        return new Promise((resolve, reject) => {
            db.Order.sum('totalMoney', {
                where: {
                    orderStatus: 'finished'
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },
}
