const mongoose = require('mongoose')

async function connectMongodb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/db_otp');
        console.log('Connect mongodb successed');
    }
    catch(err) {
        console.log('Connect Failure');
    }
}

module.exports = { connectMongodb };