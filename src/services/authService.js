const db = require('../models/index')

module.exports = {
    isUserWeb: (email) => {
        return new Promise((resolve, reject) => {
            db.User.findOne({
                where: { email, typeLogin: 'Web' },
                raw: true
            })
                .then(resolve)
                .catch(reject)
        })
    },
    forgotPassword: ({ email, password }) => {
        return new Promise((resolve, reject) => {
            db.User.update({ password }, {
                where: { email }
            })
                .then(resolve)
                .catch(reject)
        })
    },
}