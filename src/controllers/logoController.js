const logoService = require('../services/logoService')

let getAllLogos = async (req, res) => {
    try {
        let data = await logoService.getAllLogosService()
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
    getAllLogos,
}