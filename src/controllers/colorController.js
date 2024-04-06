const colorService = require('../services/colorService')

module.exports = {
    getAllColors: async (req, res) => {
        try {
            let data = await colorService.getAllColorsService()
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
}