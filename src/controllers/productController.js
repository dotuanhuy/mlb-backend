const productService = require('../services/productService')
const sizeService = require('../services/sizeService')
const colorService = require('../services/colorService')
const optionCategories = require('../utils/optionCategory')

module.exports = {
    createNewProduct: async (req, res, next) => {
        try {
            const product = JSON.parse(req?.body?.product)
            const infor = await productService.getProductByCode(product?.code)
            if (infor) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Code is not exist'
                })
            } 
            product.image = req.image
            let data = await productService.createNewProductService(product)
            if (!data) {
                return res.status(200).json('Create product failed')
            }
            const {listSizesAdded, listColorsAdded} = product
            const id = data?.dataValues?.id
            if (listSizesAdded && listSizesAdded.length > 0) {
                const size = await sizeService.createSizeDetailService({listSizesAdded, id})
            }
            if (listColorsAdded && listColorsAdded.length > 0) {
                const color = await colorService.createColorDetailService({listColorsAdded, id})
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Create product success'
            })
        } catch(e) {
            console.log(e)
            return res.status(200).json({
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
            let data = await productService.getAllProductsService(req.query.type)
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getAllProductPublic: async (req, res) => {
        try {
            let data = await productService.getAllProductPublicService()
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const {id} = req.query
            if (!id) {
                return res.status(200).json({
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
            return res.status(200).json({
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
            const {id} = req?.query
            const product = JSON.parse(req.body.product)
            req.body.product = product
            const {listSizesDeleted, listSizesAdded, listColorsDeleted, listColorsAdded} = req.body.product
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
                const resDeleted  = await sizeService.deleteSizeDetailByProductIdService({listSizesDeleted, id})
            }
            if (listSizesAdded.length > 0) {
                const resAdded = await sizeService.createSizeDetailService({listSizesAdded, id})
            }
            if (listColorsDeleted.length > 0) {
                const resDeleted = await colorService.deleteColorDetailByProductIdService({listColorsDeleted, id})
            }
            if (listColorsAdded.length > 0) {
                const resAdded = await colorService.createColorDetailService({listColorsAdded, id})
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update product success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1, 
                errMessage: 'Error from the server'
            })
        }
    },
    getCountProducts: async (req, res) => {
        try {
            let data = await productService.getCountProductsService() 
            return res.status(200).json(data)
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
            const {id} = req?.query
            const image = req?.image
            if (!id || !image) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parmeters'
                })
            }
            let infor = await productService.changeImageMainProductService({id, image})
            if (!infor) {
                return res.status(200).json({
                    errCode: 2,
                    errMessage: 'Update image main product failed'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update image main product success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    getImageProductById: async (req, res, next) => {
        try {
            const {id} = req.query 
            if (!id) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing required parmeters'
                })
            }
            const data = await productService.getImageProductById(id)
            if (!data.image) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Image is not exist'
                })
            }
            req.imageUrl = data.image
            next()
        } catch (e) {
            console.log(e)
            return res.status(200).json({
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
            if (!req.query.type){
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
            const {type, offset} = req?.query
            if (!type || !offset){
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await productService.getProductByCategoryLimitService(req.query)
            return res.status(200).json(data)
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
            const {id, limit} = req?.query
            if (!id || !limit){
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await productService.getProductByCategoryDetailLimit(id, limit)
            if (!data || data.length === 0) {
                return res.status(400).json({ errCode: 1, errMessage: 'Product same is not exist'})
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
            const {limit, page} = req.query
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
            let {productName, offset} = req?.query
            if (!productName || !offset) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await productService.searchProductByNameService(productName, offset)
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    },
    searchProductByNameLimit: async (req, res) => {
        try {
            let {productName, offset} = req.query
            if (!productName || !offset) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await productService.searchProductByNameServiceLimit(productName, offset)
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }
        
}