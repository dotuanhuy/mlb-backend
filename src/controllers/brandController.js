const brandService = require('../services/brandService')

module.exports = {
    getAllBrands: async (req, res) => {
        try {
            let data = await brandService.getAllBrands()
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    }
}