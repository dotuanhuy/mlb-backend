const brandService = require('../services/brandService')

let getAllBrands = async (req, res) => {
    try {
        let data = await brandService.getAllBrandsService()
        return res.status(200).json(data)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error the from server'
        })
    }
}

module.exports = {
    getAllBrands,
}