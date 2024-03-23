const db = require('../models/index')

module.exports = {
    getAllBrandsService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let brands = await db.Brand.findAll()
                if (brands) {
                    resolve({
                        errCode: 0,
                        data: brands
                    })
                }
                resolve({
                    errCode: 2,
                    errMessage: 'Brands is not exitst'
                })
            } catch(e) {
                reject(e)
            }
        })
    }
    
}