const db = require('../models/index')
const Op = db.Sequelize.Op
const {Sequelize} = require('sequelize')
const outSortOptionByWhere = require('../utils/outputSortOptionsByWhere')
const optionCategories = require('../utils/optionCategory')

module.exports = {
    getProductByCode: (code) => {
        return new Promise((resolve, reject) => {
            db.Product.findOne({
                where: { code }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createNewProductService: (data) => {
        return new Promise(async (resolve, reject) => {
            db.Product.create({
                name: data.name,
                code: data.code,
                price: data.price,
                categoryDetailId: data.categoryDetailId,
                discountId: data.discountId,
                image: data.image,
                productionSite: data.productionSite,
                releaseDate: data.releaseDate,
                brandId: data.brandId,
                material: data.material,
                quantity: data.quantity,
                logoId: data.logoId,
                gender: data.gender,
                productTypeId: data.productTypeId
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getAllProductsService: (type) => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Product.findAll({
                    include: [
                        {
                            model: db.Categories, as: 'dataCategory',
                            attributes: ['name', 'categoryId'],
                            where: {
                                type: type
                            }
                        },
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: products
                })
               
            } catch(e) {
                reject(e)
            }
        })
    },
    getAllProductPublicService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Product.findAll({
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['id', 'name', 'categoryId', 'type'],
                            include: [
                                {
                                    model: db.Category, as: 'dataCategory',
                                    attributes: ['id', 'name', 'type'],
                                }
                            ]
                        },
                        {
                            model: db.Discount, as: 'dataDiscounts',
                            attributes: ['id', 'value', 'description'],
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                            attributes: ['id', 'name', 'image'],
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: db.ImageProduct, as: 'dataImageProducts',
                            attributes: ['image'],
                            limit: 1
                        },
                        {
                            model: db.Size, as: 'dataSizeDetail',
                            through: { model: db.SizeDetail },
                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: products
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    deleteProductService: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.Product.findOne({
                    where: {
                        id: id
                    }
                })
                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Product is not exists'
                    })
                }
                else {
                    await db.Product.destroy({
                        where: {
                            id: id
                        }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'The product is deleted'
                    })
                }
            } catch(e) {
                reject(e)
            }
        })
    },
    getProductByIdService: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.Product.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['id', 'name', 'categoryId', 'type'],
                        },
                        {
                            model: db.ProductType, as: 'dataProductType',
                            attributes: ['id', 'name', 'categoryId'],
                        },
                        {
                            model: db.Discount, as: 'dataDiscounts',
                            attributes: ['id', 'value', 'description'],
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                            attributes: ['id', 'name', 'image'],
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: db.Description, as: 'dataDescriptions',
                            attributes: ['contentHTML'],
                        },
                        {
                            model: db.ImageProduct, as: 'dataImageProducts',
                            attributes: ['image'],
                        },
                        {
                            model: db.ColorDetail, as: 'dataColorDetail',
                            attributes: ['id', 'colorId'],
                            include: [
                                {
                                    model: db.Color, as: 'dataColor',
                                    attributes: ['id', 'name'],
                                }
                            ]
                        },
                        {
                            model: db.Size, as: 'dataSizeDetail',
                            through: { model: db.SizeDetail },
                        }
                    ],
                    raw: false,
                    nest: true
                })
                if (product) {
                    resolve({
                        errCode: 0,
                        data: product
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Product is not exists'
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    updateProductService: (data, id) => {
        return new Promise(async (resolve, reject) => {
            db.Product.update({
                name: data.name,
                code: data.code,
                price: data.price,
                categoryDetailId: data.categoryDetailId,
                productTypeId: data.productTypeId,
                discountId: data.discountId,
                image: data.image,
                productionSite: data.productionSite,
                releaseDate: data.releaseDate,  
                brandId: data.brandId,
                material: data.material,
                quantity: data.quantity,
                logoId: data.logoId,
                gender: data.gender
            }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getCountProductsService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let quantity = await db.Product.findOne({
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                    ]
                })
                resolve({
                    errCode: 0,
                    data: quantity
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    changeImageMainProductService: ({id, image}) => {
        return new Promise(async (resolve, reject) => {
            db.Product.update({
                image
            }, {
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getImageProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            db.Product.findOne({
                attributes: ['image'],
                where: { id },
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getAllDescriptionProductService: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let des = await db.Descriptions.findOne({
                    where: {
                        productId: id
                    }
                })
                if (des) {
                    resolve({
                        errCode: 0,
                        data: des
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Description product is not exist'
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    addDescriptionProductService: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let des = await db.Descriptions.findOne({
                    where: {
                        productId: data.productId
                    }
                })
                if (des) {
                    des.contentHTML = data.contentHTML
                    des.contentMarkdown = data.contentMarkdown,
                    des.productId = data.productId
    
                    await des.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update description product is success'
                    })
                }
                else {
                    await db.Descriptions.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        productId: data.productId
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Create description product is success'
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    getQuantityOfEachProductByCategoryService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await db.Product.findAll({
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('Product.id')), 'quantity']
                    ],
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['id', 'name', 'categoryId', 'type'],
                        },
                    ],
                    group: ['categoryDetailId'],
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        data
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    getProductByCategoryService: (type) => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Product.findAll({
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['name', 'type'],
                            include: [
                                {
                                    model: db.Category, as: 'dataCategory',
                                    where: {
                                        type
                                    }
                                }
                            ]
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                        }
                    ],
                })
                if (products) {
                    resolve({
                        errCode: 0,
                        data: products
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Product is not exist'
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getProductByCategoryLimitService: ({type, offset}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let option = optionCategories.optionCategory(type)
                let products = await db.Product.findAndCountAll({
                    where: {
                        categoryDetailId : option
                    },
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['name', 'type'],
                            include: [
                                {
                                    model: db.Category, as: 'dataCategory',
                                    where: {
                                        type
                                    }
                                }
                            ]
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                        }
                    ],
                    order: [
                        ['id', 'DESC']
                    ],
                    offset: +offset * (+process.env.LIMIT_PRODUCT),
                    limit: +process.env.LIMIT_PRODUCT,
                    raw: true,
                    nest: true
                })
                if (products) {
                    resolve({
                        errCode: 0,
                        data: products
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Product is not exist'
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getLimitProductByCategoryService: (categore, page) => {
        return new Promise(async (resolve, rejcet) => {
            try {
                let products = await db.Product.findAndCountAll({
                    include: [
                        {
                            model: db.Categories, as: 'dataCategory',
                            attributes: ['name', 'categoryId'],
                            where: {
                                type: categore
                            }
                        },
                        {
                            model: db.AllCodes, as: 'dataBrand',
                            attributes: ['valueEn'],
                        },
                        {
                            model: db.AllCodes, as: 'dataDiscount',
                            attributes: ['valueEn'],
                        }
                    ],
                    offset: +page * (+process.env.LIMIT_PAGE),
                    limit: +process.env.LIMIT_PAGE,
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: products
                })
            } catch (e) {
                rejcet(e)
            }
        })
    },
    findlAndCountAllSortNotExistOptionColor: async (optionCategory, page, sortOption, optionLogos, optionTypeName, optionColors, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = []
                let count = 0
                if (!optionTypeName) {
                    count = await db.Product.findAll({
                        include: [
                            {
                                model: db.Logo, as: 'dataLogos',
                                where: optionLogos.length > 0 ?  {
                                    id: optionLogos
                                } : null
                            },
                            {
                                model: db.ColorDetail, as: 'dataColorDetail',
                                where: optionColors.length > 0 ?{
                                    colorId: optionColors
                                } : null
                            }
                        ],
                        where: {
                            categoryDetailId : optionCategory,
                        },
                    })
    
                    products = await db.Product.findAll({
                        attributes: {
                            exclude: ['DiscountId', 'ProductTypeId'],
                        },
                        include: [
                            {
                                model: db.CategoryDetail, as: 'dataCategoryDetail',
                                attributes: ['id', 'name', 'categoryId', 'type'],
                                include: [
                                    {
                                        model: db.Category, as: 'dataCategory',
                                        attributes: ['id', 'name', 'type'],
                                    }
                                ]
                            },
                            {
                                model: db.Discount, as: 'dataDiscounts',
                                attributes: ['id', 'value', 'description'],
                            },
                            {
                                model: db.Logo, as: 'dataLogos',
                                attributes: ['id', 'name', 'image'],
                                where: optionLogos.length > 0 ?  {
                                    id: optionLogos
                                } : null
                            },
                            {
                                model: db.Brand, as: 'dataBrands',
                                attributes: ['id', 'name'],
                            },
                            {
                                model: db.ImageProduct, as: 'dataImageProducts',
                                attributes: ['image'],
                                limit: 1
                            },
                            {
                                model: db.Size, as: 'dataSizeDetail',
                                through: { model: db.SizeDetail },
                            },
                            {
                                model: db.ColorDetail, as: 'dataColorDetail',
                                where: optionColors.length > 0 ?{
                                    colorId: optionColors
                                } : null
                            }
                        ],
                        where: {
                            categoryDetailId : optionCategory,
                        },
                        order: sortOption === process.env.SORT_NAME_DEFAULT ? [] : [sortOption],
                        offset: +page * (+limit),
                        limit: +limit,
                        // raw: true,
                        // nest: true
                    })
                }
                else {
                    count =  await db.Product.findAll({
                        include: [
                            {
                                model: db.Logo, as: 'dataLogos',
                                where: optionLogos.length > 0 ?  {
                                    id: optionLogos
                                } : null
                            },
                            {
                                model: db.ColorDetail, as: 'dataColorDetail',
                                where: optionColors.length > 0 ?{
                                    colorId: optionColors
                                } : null
                            },
                            {
                                model: db.ProductType, as: 'dataProductType',
                                where: {
                                    name: optionTypeName
                                }
                            }
                        ],
                        where: {
                            categoryDetailId : optionCategory,
                            // productTypeId: optionTypeName
                        },
                    })
    
                    products =  await db.Product.findAll({
                        attributes: {
                            exclude: ['DiscountId', 'ProductTypeId']
                        },
                        include: [
                            {
                                model: db.CategoryDetail, as: 'dataCategoryDetail',
                                attributes: ['id', 'name', 'categoryId', 'type'],
                                include: [
                                    {
                                        model: db.Category, as: 'dataCategory',
                                        attributes: ['id', 'name', 'type'],
                                    }
                                ]
                            },
                            {
                                model: db.Discount, as: 'dataDiscounts',
                                attributes: ['id', 'value', 'description'],
                            },
                            {
                                model: db.Logo, as: 'dataLogos',
                                attributes: ['id', 'name', 'image'],
                                where: optionLogos.length > 0 ?  {
                                    id: optionLogos
                                } : null
                            },
                            {
                                model: db.Brand, as: 'dataBrands',
                                attributes: ['id', 'name'],
                            },  
                            {
                                model: db.ImageProduct, as: 'dataImageProducts',
                                attributes: ['image'],
                                limit: 1
                            },
                            {
                                model: db.Size, as: 'dataSizeDetail',
                                through: { model: db.SizeDetail },
                            },
                            {
                                model: db.ColorDetail, as: 'dataColorDetail',
                                where: optionColors.length > 0 ?{
                                    colorId: optionColors
                                } : null
                            },
                            {
                                model: db.ProductType, as: 'dataProductType',
                                where: {
                                    name: optionTypeName
                                }
                            }
                        ],
                        where: {
                            categoryDetailId : optionCategory,
                            // productTypeId: optionTypeName
                        },
                        order: sortOption === process.env.SORT_NAME_DEFAULT ? [] : [sortOption],
                        offset: +page * (+limit),
                        limit: +limit,
                        // raw: true,
                        // nest: true
                    })
                }
                resolve({
                    errCode: 0,
                    data: {
                        count: count.length,
                        rows: products
                    },
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    // let findlAndCountAllSortExistOptionColor = async (optionCategory, page, sortOption, optionColors, optionLogos, optionTypeName) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let products = []
    //             if (!optionTypeName) {
    //                 products = await db.ColorDetail.findAndCountAll({
    //                     include: [
    //                         {
    //                             model: db.Product, as: 'dataColorDetail',
    //                             attributes: {
    //                                 exclude: ['DiscountId', 'ProductTypeId']
    //                             },
    //                             include: [
    //                                 {
    //                                     model: db.CategoryDetail, as: 'dataCategoryDetail',
    //                                     attributes: ['id', 'name', 'categoryId', 'type'],
    //                                     include: [
    //                                         {
    //                                             model: db.Category, as: 'dataCategory',
    //                                             attributes: ['id', 'name', 'type'],
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     model: db.Discount, as: 'dataDiscounts',
    //                                     attributes: ['id', 'value', 'description'],
    //                                 },
    //                                 {
    //                                     model: db.Logo, as: 'dataLogos',
    //                                     attributes: ['id', 'name', 'image'],
    //                                     where: optionLogos.length > 0 ?  {
    //                                         id: optionLogos
    //                                     } : null
    //                                 },
    //                                 {
    //                                     model: db.Brand, as: 'dataBrands',
    //                                     attributes: ['id', 'name'],
    //                                 },
    //                                 {
    //                                     model: db.Size, as: 'dataSizeDetail',
    //                                     through: { model: db.SizeDetail },
    //                                 }
    //                             ],
    //                             where: {
    //                                 categoryDetailId : optionCategory
    //                             },
    //                             order: sortOption === process.env.SORT_NAME_DEFAULT ? [] : [sortOption],
    //                         }
    //                     ],
    //                     where: {
    //                         colorId: optionColors
    //                     },
    //                     group: ['productId'],
    //                     offset: +page * (+process.env.LIMIT_PAGE),
    //                     limit: +process.env.LIMIT_PAGE,
    //                     // raw: true,
    //                     // nest: true
    //                 })
    //             }
    //             else {
    //                 products = await db.ColorDetail.findAndCountAll({
    //                     include: [
    //                         {
    //                             model: db.Product, as: 'dataColorDetail',
    //                             attributes: {
    //                                 exclude: ['DiscountId', 'ProductTypeId']
    //                             },
    //                             include: [
    //                                 {
    //                                     model: db.CategoryDetail, as: 'dataCategoryDetail',
    //                                     attributes: ['id', 'name', 'categoryId', 'type'],
    //                                     include: [
    //                                         {
    //                                             model: db.Category, as: 'dataCategory',
    //                                             attributes: ['id', 'name', 'type'],
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     model: db.Discount, as: 'dataDiscounts',
    //                                     attributes: ['id', 'value', 'description'],
    //                                 },
    //                                 {
    //                                     model: db.Logo, as: 'dataLogos',
    //                                     attributes: ['id', 'name', 'image'],
    //                                     where: optionLogos.length > 0 ?  {
    //                                         id: optionLogos
    //                                     } : null
    //                                 },
    //                                 {
    //                                     model: db.Brand, as: 'dataBrands',
    //                                     attributes: ['id', 'name'],
    //                                 },
    //                                 {
    //                                     model: db.Size, as: 'dataSizeDetail',
    //                                     through: { model: db.SizeDetail },
    //                                 }
    //                             ],
    //                             where: {
    //                                 categoryDetailId : optionCategory,
    //                                 productTypeId: optionTypeName
    //                             },
    //                             order: sortOption === process.env.SORT_NAME_DEFAULT ? [] : [sortOption],
    //                         }
    //                     ],
    //                     where: {
    //                         colorId: optionColors
    //                     },
    //                     group: ['productId'],
    //                     offset: +page * (+process.env.LIMIT_PAGE),
    //                     limit: +process.env.LIMIT_PAGE,
    //                     // raw: true,
    //                     // nest: true
    //                 })
    //             }
    //             let newData = products?.rows?.map(item => item.dataColorDetail)
    //             resolve({
    //                 errCode: 0,
    //                 data:  {
    //                     count: products?.count.length,
    //                     rows: newData
    //                 }
    //             })
    //         } catch (e) {
    //             reject(e) 
    //         }
        
    //     })
    // }
    
    searchProductByNameService: (productName, offset) => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Product.findAll({
                    where: {
                        name: {
                            [Op.substring]: `${productName}`
                        }
                    },
                    attributes: {
                        exclude: ['DiscountId']
                    },
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['id', 'name', 'categoryId', 'type'],
                            include: [
                                {
                                    model: db.Category, as: 'dataCategory',
                                    attributes: ['id', 'name', 'type'],
                                }
                            ]
                        },
                        {
                            model: db.Discount, as: 'dataDiscounts',
                            attributes: ['id', 'value', 'description'],
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                            attributes: ['id', 'name', 'image'],
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                            attributes: ['id', 'name'],
                        },
                    ],
                    offset: +offset * (+process.env.LIMIT_SEARCH),
                    limit: +process.env.LIMIT_SEARCH,
                    raw: true,
                    nest: true
                })
                if (!products) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Search not result'
                    })
                }
                resolve({
                    errCode: 0,
                    data: products
                })
            } catch(e) {
                reject(e)
            }
        })
    },
    searchProductByNameServiceLimit: (productName, offset) => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.substring]: `${productName}`
                        }
                    },
                    attributes: {
                        exclude: ['DiscountId', 'ProductTypeId']
                    },
                    include: [
                        {
                            model: db.CategoryDetail, as: 'dataCategoryDetail',
                            attributes: ['id', 'name', 'categoryId', 'type'],
                            include: [
                                {
                                    model: db.Category, as: 'dataCategory',
                                    attributes: ['id', 'name', 'type'],
                                }
                            ]
                        },
                        {
                            model: db.Discount, as: 'dataDiscounts',
                            attributes: ['id', 'value', 'description'],
                        },
                        {
                            model: db.Logo, as: 'dataLogos',
                            attributes: ['id', 'name', 'image'],
                        },
                        {
                            model: db.ImageProduct, as: 'dataImageProducts',
                            attributes: ['image'],
                            limit: 1
                        },
                        {
                            model: db.Brand, as: 'dataBrands',
                            attributes: ['id', 'name'],
                        },
                    ],
                    offset: +offset * (+process.env.LIMIT_SEARCH),
                    limit: +process.env.LIMIT_SEARCH,
                    // raw: true,
                    // nest: true
                })
                if (!products) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Search not result'
                    })
                }
                resolve({
                    errCode: 0,
                    data: products
                })
            } catch(e) {
                reject(e)
            }
        })
    }
}
