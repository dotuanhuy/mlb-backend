const productService = require('../services/productService')
const optionCategories = require('../utils/optionCategory')

let createNewProduct = async (req, res, next) => {
    try {
        const {code} = req?.body
        if (!req?.body) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let data = await productService.createNewProductService(req.body)
        // let newData = await productService.getProductByCodeService(code)
        if (!data) {
            return res.status(200).json(newData)
        }
        req.body.id = data?.product?.id
        next()
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllProducts = async (req, res) => {
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
}

let getAllProductPublic = async (req, res) => {
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
}

let deleteProduct = async (req, res) => {
    try {
        const {id} = req.query
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let infor = await productService.deleteProductService(id) 
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getProductById = async (req, res) => {
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
}

let updateProduct = async (req, res, next) => {
    try {
        const {id} = req?.body
        if (!req.body || !id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let data = await productService.updateProductService(req.body) 
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1, 
            errMessage: 'Error from the server'
        })
    }
}

let getCountProducts = async (req, res) => {
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
}

let changeImageProduct = async (req, res) => {
    try {
        const {id, image} = req?.body
        if (!id || !image) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parmeters'
            })
        }
        let infor = await productService.changeImageProductService(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let addDescriptionProduct = async (req, res) => {
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
}

let getAllDescriptionProduct = async (req, res) => {
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
}

let getQuantityOfEachProductByCategory = async (req, res) => {
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
}

let getProductByCategory = async (req, res) => {
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
}

let getProductByCategoryLimit = async (req, res) => {
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
}

let getLimitProducts = async (req, res) => {
    try {
        if (!req.query.page || !req.query.categore) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requied parameters'
            })
        }
        let data = await productService.getLimitProductByCategoryService(req.query.categore, req.query.page)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getLimitProductByOption = async (req, res) => {
    try {
        let optionSort = req?.query?.option
        optionSort = optionSort === process.env.SORT_NAME_BY_AZ ? ['name', 'ASC'] : optionSort
        optionSort = optionSort === process.env.SORT_NAME_BY_ZA ? ['name', 'DESC'] : optionSort
        optionSort = optionSort === process.env.SORT_PRICE_BY_LOW_TO_HIGH ? ['price', 'ASC'] : optionSort
        optionSort = optionSort === process.env.SORT_PRICE_BY_HIGH_TO_LOW ? ['price', 'DESC'] : optionSort
        let optionColors = req?.query?.colors ? req?.query?.colors?.split(',')?.map(item => +item) : []
        let optionLogos = req?.query?.logos ? req?.query?.logos?.split(',')?.map(item => +item) : []
        let optionCategory = optionCategories.optionCategory(req?.query?.type).length === 0 ? req?.query?.type?.split(',').map(item => +item) : optionCategories.optionCategory(req?.query?.type) 
        let data = []
        data = await productService.findlAndCountAllSortNotExistOptionColor(optionCategory, req?.query?.page, optionSort, optionLogos, req?.query?.optionTypeName, optionColors)

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
}

let searchProductByName = async (req, res) => { 
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
}

let searchProductByNameLimit = async (req, res) => {
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


module.exports = {
    createNewProduct,
    getAllProducts,
    getAllProductPublic,
    deleteProduct,
    getProductById,
    updateProduct,
    getCountProducts,
    changeImageProduct,
    getAllDescriptionProduct,
    addDescriptionProduct,
    getQuantityOfEachProductByCategory,
    getProductByCategory,
    getProductByCategoryLimit,
    getLimitProducts,
    getLimitProductByOption,
    searchProductByName,
    searchProductByNameLimit,
}