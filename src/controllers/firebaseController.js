// const tutorialService = require('../services/tutorialSizeService')
const firebaseService = require('../services/firebaseService')

module.exports = {
    getSize: async (req, res) => {
        try {
            let data = await firebaseService.getSize()
            return res.status(200).json(data)
        } catch (e) {
            return res.status(200).json(e)
        }
    }   
}