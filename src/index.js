require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookies = require("cookie-parser")
const { initializeApp } = require("firebase/app");
const http = require('http')
// const https = require('https')
const router = require('./route/web')
let connectDB = require('./config/connectDB')
const { connectMongodb } = require('./config/mongodb')
const SocketService = require('./services/socketService')
let { firebaseConfigImageSize, firebaseConfigImageMlb } = require('./config/firebase')
require('./passport')

const app = express()
const port = process.env.PORT

app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cookies())

app.use(router)
connectDB()
connectMongodb()
initializeApp(firebaseConfigImageSize, 'app1')
initializeApp(firebaseConfigImageMlb, 'app2')

const server = http.createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        creadentials: true,
        allowedHeaders: ["my-custom-header"]
    }
})
global._io = io

global._io.on('connection', SocketService.connection)


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})