// const tutorialService = require('../services/tutorialSizeService')
const tutorialService = require('../services/firebaseService')

let getSize = async (req, res) => {
    try {
        let data = await tutorialService.getSizeService()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json(e)
    }
}

module.exports = {
    // getSize: async (req, res) => {
    //     try {
    //         let data = await tutorialService.getFileService()
    //         console.log(data)
    //         return res.status(200).json(data)
    //     } catch (e) {
    //         return res.status(200).json(e)
    //     }
    // }   
    getSize
}