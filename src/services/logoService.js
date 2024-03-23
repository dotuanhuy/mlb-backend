const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op

let getAllLogosService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let logos = await db.Logo.findAll()
            if (logos) {
                resolve({
                    errCode: 0,
                    data: logos
                })
            }
            resolve({
                errCode: 2,
                errMessage: 'Logos is not exitst'
            })
        } catch(e) {
            reject(e)
        }
    })
}


module.exports = {
    getAllLogosService,
    
}