const productService = require('../services/productService')
const sizeService = require('../services/sizeService')
const colorService = require('../services/colorService')
const optionCategories = require('../utils/optionCategory')
const { category } = require('../utils/constant')

module.exports = {
    createNewProduct: async (req, res, next) => {
        try {
            const product = JSON.parse(req?.body?.product)
            product.image = req.image
            let data = await productService.createNewProductService(product)
            if (!data) {
                return res.status(400).json('Thêm sản phẩm thất bại')
            }
            const { listSizesAdded, listColorsAdded } = product
            const id = data?.dataValues?.id
            if (listSizesAdded && listSizesAdded.length > 0) {
                const size = await sizeService.createSizeDetailService({ listSizesAdded, id })
            }
            if (listColorsAdded && listColorsAdded.length > 0) {
                const color = await colorService.createColorDetailService({ listColorsAdded, id })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Thêm sản phẩm thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getProductByCode: async (req, res, next) => {
        try {
            const product = JSON.parse(req?.body?.product)
            if (!product?.code) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const infor = await productService.getProductByCode(product?.code)
            if (infor) {
                return res.status(400).json({
                    errCode: 3,
                    errMessage: 'Đã có lỗi xảy ra. Vui lòng thêm lại'
                })
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getAllProducts: async (req, res) => {
        try {
            if (!req.query.type) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const data = await productService.getAllProductsService(req.query.type)
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getAllProductPublic: async (req, res) => {
        try {
            const optionShoes = optionCategories.optionCategory(category.shoes)
            const optionBag = optionCategories.optionCategory(category.bag)
            const optionHat = optionCategories.optionCategory(category.hat)
            const optionClothes = optionCategories.optionCategory(category.clothes)

            let shoes = await productService.getAllProductPublicService(optionShoes)
            let bags = await productService.getAllProductPublicService(optionBag)
            let hats = await productService.getAllProductPublicService(optionHat)
            let clothes = await productService.getAllProductPublicService(optionClothes)
            const data = { shoes, bags, hats, clothes }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.query
            if (!id) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const size = await sizeService.deleteSizeDetailByProductId(id)
            const color = await colorService.deleteColorDetailByProductId(id)
            const infor = await productService.deleteProductService(id)
            return res.status(200).json(infor)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getProductById: async (req, res) => {
        try {
            if (!req?.query?.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            let data = await productService.getProductByIdService(req.query.id)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req?.query
            const product = JSON.parse(req.body.product)
            req.body.product = product
            const { listSizesDeleted, listSizesAdded, listColorsDeleted, listColorsAdded } = req.body.product
            if (req?.image) {
                product.image = req.image
            }
            if (!id || !listSizesDeleted || !listSizesAdded || !listColorsAdded || !listColorsDeleted) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            const data = await productService.updateProductService(product, id)
            if (listSizesDeleted.length > 0) {
                const resDeleted = await sizeService.deleteSizeDetailByProductIdService({ listSizesDeleted, id })
            }
            if (listSizesAdded.length > 0) {
                const resAdded = await sizeService.createSizeDetailService({ listSizesAdded, id })
            }
            if (listColorsDeleted.length > 0) {
                const resDeleted = await colorService.deleteColorDetailByProductIdService({ listColorsDeleted, id })
            }
            if (listColorsAdded.length > 0) {
                const resAdded = await colorService.createColorDetailService({ listColorsAdded, id })
            }
            console.log('check data: ', data);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Sửa sản phẩm thành công'
            })

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getCountProducts: async (req, res) => {
        try {
            const totalProducts = await productService.getTotalProducts()
            const totalProductsSold = await productService.getTotalProductSold()
            return res.status(200).json({
                errCode: 0,
                data: {
                    totalProducts,
                    totalProductsSold
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    changeImageMainProduct: async (req, res) => {
        try {
            const { id } = req?.query
            const image = req?.image
            if (!id || !image) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parmeters'
                })
            }
            let infor = await productService.changeImageMainProductService({ id, image })
            if (!infor) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Thay đổi anh gốc thất bại'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Thay đổi ảnh gốc thành công'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getImageProductById: async (req, res, next) => {
        try {
            const { id } = req.query
            if (!id) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing required parmeters'
                })
            }
            const data = await productService.getImageProductById(id)
            if (!data.image) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Ảnh không tồn tại'
                })
            }
            req.imageUrl = data.image
            return next()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    addDescriptionProduct: async (req, res) => {
        try {
            if (!req.body) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let infor = await productService.addDescriptionProductService(req.body)
            return res.status(200).json(infor)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getAllDescriptionProduct: async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            let data = await productService.getAllDescriptionProductService(req.query.id)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getQuantityOfEachProductByCategory: async (req, res) => {
        try {
            let data = await productService.getQuantityOfEachProductByCategoryService()
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getProductByCategory: async (req, res) => {
        try {
            if (!req.query.type) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await productService.getProductByCategoryService(req.query.type)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getProductByCategoryLimit: async (req, res) => {
        try {
            const { type, offset } = req?.query
            if (!type || !offset) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const option = optionCategories.optionCategory(type)
            const data = await productService.getProductByCategoryLimitService({ type, option, offset })
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getProductByCategoryDetailLimit: async (req, res) => {
        try {
            const { id, limit } = req?.query
            if (!id || !limit) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const data = await productService.getProductByCategoryDetailLimit(id, limit)
            if (!data || data.length === 0) {
                return res.status(400).json({ errCode: 1, errMessage: 'Product same is not exist' })
            }
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status().json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getLimitProductByOption: async (req, res) => {
        try {
            let optionSort = req?.query?.option
            const { limit, page } = req.query
            optionSort = optionSort === process.env.SORT_NAME_BY_AZ ? ['name', 'ASC'] : optionSort
            optionSort = optionSort === process.env.SORT_NAME_BY_ZA ? ['name', 'DESC'] : optionSort
            optionSort = optionSort === process.env.SORT_PRICE_BY_LOW_TO_HIGH ? ['price', 'ASC'] : optionSort
            optionSort = optionSort === process.env.SORT_PRICE_BY_HIGH_TO_LOW ? ['price', 'DESC'] : optionSort
            let optionColors = req?.query?.colors ? req?.query?.colors?.split(',')?.map(item => +item) : []
            let optionLogos = req?.query?.logos ? req?.query?.logos?.split(',')?.map(item => +item) : []
            let optionCategory = optionCategories.optionCategory(req?.query?.type).length === 0 ? req?.query?.type?.split(',').map(item => +item) : optionCategories.optionCategory(req?.query?.type)
            let data = []
            data = await productService.findlAndCountAllSortNotExistOptionColor(optionCategory, page, optionSort, optionLogos, req?.query?.optionTypeName, optionColors, limit)

            // if (req?.query?.colors) {
            //     data = await productService.findlAndCountAllSortExistOptionColor(optionCategory, req?.query?.page, optionSort, optionColors, optionLogos, req?.query?.optionTypeName)
            // }
            // else {
            //     data = await productService.findlAndCountAllSortNotExistOptionColor(optionCategory, req?.query?.page, optionSort, optionLogos, req?.query?.optionTypeName)
            // }
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    searchProductByName: async (req, res) => {
        try {
            const { productName, offset } = req?.query
            if (!productName || !offset) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const data = await productService.searchProductByNameService(productName, offset)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    searchProductByNameLimit: async (req, res) => {
        try {
            const { productName, offset } = req.query
            if (!productName || !offset) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const data = await productService.searchProductByNameServiceLimit(productName, offset)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    findNameProductByCategory: async (req, res) => {
        try {
            const { productName, type, offset } = req.query
            if (!productName || !type || !offset) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            const option = optionCategories.optionCategory(type)
            const data = await productService.findNameProductByCategory({ productName, type, option, offset })
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }
}