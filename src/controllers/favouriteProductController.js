const productService = require('../services/favouriteProductService')

let getAllFavouriteProduct = async (req, res) => {
    try {
        if (!req?.query?.userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await productService.getAllFavouriteProductService(req?.query?.userId)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the serser'
        }) 
    }
}

let getAllFavouriteProductLimit = async (req, res) => {
    try {
        if (!req?.query?.userId || !req?.query?.offset) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await productService.getAllFavouriteProductLimitService(req?.query?.userId, req?.query?.offset)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the serser'
        }) 
    }
}

let changeProductFavourite = async (req, res) => {
    try {
        const { productId, userId } = req?.body
        if (!productId || !userId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let productFavourite = await productService.findProductFavouriteService(req?.body)
        let data = []
        if (!productFavourite) {
            data = await productService.createProductFavouriteService(req?.body)
        }
        else {
            data = await productService.deleteProductFavouriteService(productFavourite)
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the serser'
        })
    }
}

module.exports = {
    getAllFavouriteProduct,
    getAllFavouriteProductLimit,
    changeProductFavourite,
}
