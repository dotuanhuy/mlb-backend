const cartService = require('../services/cartService')

let getCartsByUser = async (req, res) => {
    try {
        const userId = req?.user.id
        let data = []
        if (!userId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        data = await cartService.findCartByUserId(userId)
        if (data && data.errCode === 0) {
            data = await cartService.getCartsByUserService(userId)
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let addProductToCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req?.body?.data
        if (!productId || !userId || !quantity) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let infor = await cartService.findCartByUserId(userId)
        if (infor && infor.data.length === 0) {
            infor = await cartService.addNewCartService(userId)
        }
        let data = await cartService.addProductToCartService(req?.body?.data, infor?.data?.id)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteCart = async (req, res) => {
    try {
        const { cartDetailId } = req?.body?.data
        if (!cartDetailId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let data = await cartService.deleteCartService(cartDetailId)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let changeCart = async (req, res) => {
    try {
        const { cartDetailId, typeStep } = req?.body?.data
        if (!cartDetailId || !typeStep) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let data = await cartService.changeCartService({ cartDetailId, typeStep })
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getCartsByUser,
    addProductToCart,
    deleteCart,
    changeCart
}
