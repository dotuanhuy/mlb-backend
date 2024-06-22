const favouriteProductService = require('../services/favouriteProductService')

let getAllFavouriteProduct = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        const data = await favouriteProductService.getAllFavouriteProduct(id)
        return res.status(200).json({
            errCode: 0,
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the serser'
        })
    }
}

let getAllFavouriteProductLimit = async (req, res) => {
    try {
        const { offset } = req.query
        const { id } = req.user
        if (!id || !offset) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        const count = await favouriteProductService.countProductFavourite(id)
        const data = await favouriteProductService.getAllFavouriteProductLimit(id, offset)
        return res.status(200).json({
            errCode: 0,
            data: {
                count,
                rows: data
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the serser'
        })
    }
}

let changeProductFavourite = async (req, res) => {
    try {
        const { id } = req.user
        const { productId } = req?.body
        if (!productId || !id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        const productFavourite = await favouriteProductService.getProductFavourite(id, productId)
        if (!productFavourite) {
            const data = await favouriteProductService.createProductFavourite(id, productId)
            return res.status(200).json({
                errCode: 0,
                status: +process.env.CREATE,
            })
        }
        else {
            const data = await favouriteProductService.deleteProductFavourite(id, productId)
            return res.status(200).json({
                errCode: 0,
                status: +process.env.DELETE,
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
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
