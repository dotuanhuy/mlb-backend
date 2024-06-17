const mongoose = require('mongoose')

async function connectMongodb() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ugkr7r1.mongodb.net/db_otp?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connect mongodb successed');
    }
    catch (err) {
        console.log('Connect Failure');
    }
}

module.exports = { connectMongodb };