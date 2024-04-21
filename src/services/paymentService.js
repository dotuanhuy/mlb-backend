const db = require('../models/index')

module.exports = {
    createPayment: (data) => {
        return new Promise((resolve, reject) => {
            db.Payment.create(data)
            .then(resolve)
            .catch(reject)
        })
    }
}
