const express = require('express')
const firebaseController = require('../controllers/firebaseController')
const { upload, uploadMultiple } = require('../middlewares/multer')

const firebaseRoute = express.Router()

// GET: /api/v1/firebase/image/size
firebaseRoute.get('/image/size', firebaseController.getSize)

// POST: /api/v1/firebase/mlb/upload
firebaseRoute.post('/mlb/upload', upload, firebaseController.upload)

// POST: /api/v1/firebase/mlb/delete
firebaseRoute.post('/mlb/delete', firebaseController.delete)

// GET: /api/v1/firebase/image/logo
firebaseRoute.get('/image/logo', firebaseController.getLogo)

module.exports = firebaseRoute
