const imageService = require('../services/imageService')
const optionCategories = require('../utils/optionCategory')

let getAllImagesProduct = async (req, res) => {
    try {
        let data = await imageService.getAllImagesProducService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let getAllImagesByProductId = async (req, res) => {
    try {
        if (!req?.query?.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await imageService.getAllImagesByProductIdService(req.query.id)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let changeImageProducts = async (req, res) => {
    try {
        const {listImages, productId} = req?.body
        if (!listImages || listImages.length === 0 || !productId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await imageService.createImageProductsService(req.body)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

let deleteImageProduct = async (req, res) => {
    try {
        const {listImagesDeleted, productId} = req?.body
        if (!listImagesDeleted || listImagesDeleted.length === 0 || !productId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await imageService.deleteImageService(listImagesDeleted, productId)
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

// let updateColorDetailByProductId = async (req, res) => {
//     try {
//         if (!req?.body?.id) {
//             return res.status(200).json({
//                 errCode: 1,
//                 errMessage: 'Missing requied parameters'
//             })
//         }
//         let data1 = await colorService.deleteColorDetailByProductIdService(req.body.id)
//         req.body.productId = req.body.id
//         let data2 = await colorService.createColorDetailService(req.body)
//         if (data1.errCode === 0 && data2.errCode === 0) {
//             return res.status(200).json(data2)
//         }
//     } catch(e) {
//         console.log(e)
//         return res.status.json({
//             errCode: -1,
//             errMessage: 'Error the from server'
//         })
//     }
// }

let getImageProductByCategory = async (req, res) => {
    try {
        const {category} = req?.query
        if (!category) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await imageService.getImageProductByCategoryService(optionCategories.optionCategory(category))
        return res.status(200).json(data)
    } catch (e) {
        console.log( e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

module.exports = {
    getAllImagesProduct,
    getAllImagesByProductId,
    changeImageProducts,
    deleteImageProduct,
    getImageProductByCategory,
    // updateColorDetailByProductId,
}