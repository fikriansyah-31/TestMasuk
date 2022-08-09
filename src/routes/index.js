const express = require('express')
const router = express.Router()

// Controller:
const { register, login, checkAuth, } = require('../controllers/auth')
const { addNews, getNews, getnewss, updatenews, deletenews} = require('../controllers/news')
// Authentication
const { auth } = require('../middlewares/auth')

const { uploadFile } = require('../middlewares/uploadFile')

// Route:
router.post('/users', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

router.post('/news', auth, uploadFile('newsImg'), addNews)
router.get('/all-news', getNews)
router.get('/newss/:id', auth, getnewss)
router.patch('/news/:id', auth, updatenews)
router.delete('/del-news/:id', auth, deletenews)

module.exports = router