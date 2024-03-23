const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op
const salt = bcrypt.genSaltSync(10)
const sortOption = require('../utils/sortOptions')
const fs = require('fs');


let getAlllRolesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let roles = await db.Role.findAll()
            if (roles) {
                resolve({
                    errCode: 0,
                    data: roles
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Roles is not exists'
                })
            }
        }catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    getAlllRolesService,
}