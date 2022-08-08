const express = require('express')
const router = express.Router()

// Controller:
const { register, login, checkAuth, } = require('../controllers/auth')

// Authentication
const { auth } = require('../middlewares/auth')

// Route:
router.post('/users', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)


module.exports = router