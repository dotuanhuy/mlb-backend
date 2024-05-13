const reportService = require('../services/reportService')
const orderService = require('../services/orderService')
const productService = require('../services/productService')


const getTotalAmountBegin = (reports) => {
    let monney = 0
    reports?.map(item => {
        monney += item?.dataOrderProduct?.reduce((acc, curr) => acc + curr?.originalPrice * curr?.OrderDetail?.quantity, 0)
    })
    return monney
}

module.exports = {
    getMonthlyRevenue: async (req, res) => {
        try {
            const { year } = req.query
            if (!year) {
                return res.status(400).json("Missing required parameter")
            }
            const reports = await reportService.getMonthlyRevenue(year)
            const months = [{
                id: 1,
                name: 'Tháng 1'
            }, {
                id: 2,
                name: 'Tháng 2'
            }, {
                id: 3,
                name: 'Tháng 3'
            }, {
                id: 4,
                name: 'Tháng 4'
            }, {
                id: 5,
                name: 'Tháng 5'
            }, {
                id: 6,
                name: 'Tháng 6'
            }, {
                id: 7,
                name: 'Tháng 7'
            }, {
                id: 8,
                name: 'Tháng 8'
            }, {
                id: 9,
                name: 'Tháng 9'
            }, {
                id: 10,
                name: 'Tháng 10'
            }, {
                id: 11,
                name: 'Tháng 11'
            }, {
                id: 12,
                name: 'Tháng 12'
            }]
            const data = months.map(item => {
                let revenue = 0
                let profit = 0
                reports.map(report => {
                    const date = new Date(report?.createdAt)
                    if (+date.getMonth() + 1 === item.id) {
                        profit += report?.dataOrderProduct?.reduce((acc, curr) => acc + curr?.originalPrice * curr?.OrderDetail?.quantity, 0)
                        revenue += report?.totalMoney
                    }
                })
                return {
                    month: item.name,
                    revenue,
                    profit: revenue - profit,
                }
            })
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    },
    getDailyRevenue: async (req, res) => {
        try {
            const { day } = req.query
            if (!day) {
                return res.status(400).json("Missing required parameter")
            }
            const reports = await reportService.getDailyRevenue(day)
            const revenue = reports?.reduce((acc, curr) => acc + curr?.totalMoney , 0)
            const totalAmountBegin = getTotalAmountBegin(reports)
            return res.status(200).json({
                errCode: 0,
                data: { revenue, profit: revenue - totalAmountBegin }
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    },
    getWeeklyRevenue: async (req, res) => {
        try {
            const { startDate, endDate } = req.query
            if (!startDate || !endDate) {
                return res.status(400).json("Missing required parameter")
            }
            const reports = await reportService.getWeeklyRevenue(startDate, endDate)
            let currentDate = new Date(startDate) 
            const data = []
            while (currentDate <= new Date(endDate)) {
                let revenue = 0
                let profit = 0
                reports.map(report => {
                    const date = new Date(report?.createdAt)
                    if (+date.getDate() === currentDate.getDate()) {
                        profit += report?.dataOrderProduct?.reduce((acc, curr) => acc + curr?.originalPrice * curr?.OrderDetail?.quantity, 0)
                        revenue += report?.totalMoney
                    }
                })
                data.push({
                    day: `${currentDate.getDate()}-${currentDate.getMonth() + 1}`,
                    revenue,
                    profit: revenue - profit,
                })
                currentDate.setDate(currentDate.getDate() + 1)  // Tang ngay len 1
            }
            
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    },
    getYearRevenue: async (req, res) => {
        try {
            const startYear = new Date(`${process.env.ACTIVE_YEAR}-01-01`)
            const endYear = new Date()
            const reports = await reportService.getYearRevenue(startYear, endYear)
            const data = []
            for (let year = startYear.getFullYear(); year <= endYear.getFullYear(); year++) {
                let revenue = 0
                let profit = 0
                reports.map(report => {
                    const date = new Date(report?.createdAt)
                    if (+date.getFullYear() === +year) {
                        profit += report?.dataOrderProduct?.reduce((acc, curr) => acc + curr?.originalPrice * curr?.OrderDetail?.quantity, 0)
                        revenue += report?.totalMoney
                    }
                })
                data.push({
                    year,
                    revenue,
                    profit: revenue - profit,
                })
            }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    },
    getTotalRevenue: async (req, res) => {
        try {
            const totalRevenue = await reportService.getTotalRevenue()
            const reports = await orderService.getAllOrderFinished()
            const totalAmountBegin = getTotalAmountBegin(reports)
            return res.status(200).json({
                errCode: 0,
                data: {
                    totalRevenue,
                    totalPrefitRevenue: totalRevenue - totalAmountBegin
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    },
    getTopTenBestSellingProductsYear: async (req, res) => {
        try {
            const { year } = req.params
            if (!year) {
                return res.status(400).json("Missing required parameter")
            }
            const data = []
            const products = await productService.getAllProductByYear(+year)
            products?.sort((a, b) => b.quantitySold - a.quantitySold)
            const length = products?.length
            for (let i = 0; i < +process.env.TOP_10; i++) {
                if (i === length) {
                    break
                }
                data.push({
                    name: products[i]?.name,
                    quantitySold: products[i]?.quantitySold
                })
            }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ errMessage: 'Error the from server' })
        }
    }
}
