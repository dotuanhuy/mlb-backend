const sizeService = require('../services/sizeService')

module.exports = {
    getAllSizesByType: async (req, res) => {
        try {
            if (!req?.query?.type) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            }
            let data = await sizeService.getAllSizesByTypeService(req.query.type)
            return res.status(200).json(data)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    }
}