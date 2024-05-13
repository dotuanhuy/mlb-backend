const express = require('express')
const userRoute = require('./userRoute')
const authRoute = require('./authRoute')
const categoryRoute = require('./categoryRoute')
const productTypeRoute = require('./productTypeRoute')
const discountRoute = require('./discountRoute')
const brandRoute = require('./brandRoute')
const sizeRoute = require('./sizeRoute')
const colorRoute = require('./colorRoute')
const logoRoute = require('./logoRoute')
const productRoute = require('./productRoute')
const imageRoute = require('./imageRoute')
const reviewRoute = require('./reviewRoute')
const favouriteProductRoute = require('./favouriteProductRoute')
const cartRoute = require('./cartRoute')
const firebaseRoute = require('./firebaseRoute')
const orderRoute = require('./orderRoute')
const notificationRoute = require('./notificationRoute')
const reportRoute = require('./reportRoute')

let router = express.Router()

const apiVersion = process.env.API_VERSION

router.use(`/api/${apiVersion}/user`, userRoute)
router.use(`/api/${apiVersion}/auth`, authRoute)
router.use(`/api/${apiVersion}/category`, categoryRoute)
router.use(`/api/${apiVersion}/producttype`, productTypeRoute)
router.use(`/api/${apiVersion}/discount`, discountRoute)
router.use(`/api/${apiVersion}/brand`, brandRoute)
router.use(`/api/${apiVersion}/size`, sizeRoute)
router.use(`/api/${apiVersion}/color`, colorRoute)
router.use(`/api/${apiVersion}/logo`, logoRoute)
router.use(`/api/${apiVersion}/product`, productRoute)
router.use(`/api/${apiVersion}/image`, imageRoute)
router.use(`/api/${apiVersion}/review`, reviewRoute)
router.use(`/api/${apiVersion}/favourite`, favouriteProductRoute)
router.use(`/api/${apiVersion}/cart`, cartRoute)
router.use(`/api/${apiVersion}/firebase`, firebaseRoute)
router.use(`/api/${apiVersion}/order`, orderRoute)
router.use(`/api/${apiVersion}/notification`, notificationRoute)
router.use(`/api/${apiVersion}/report`, reportRoute)

module.exports = router
