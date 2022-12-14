const express = require('express')
const router = express.Router()

// Controller:
const { register, login, checkAuth, deleteuser, getUserss } = require('../controllers/auth')
const { addNews, getNews, getnewss, updatenews, deletenews} = require('../controllers/news')
const { addPost, getPost, getPosts, updatepost, deletepost } = require('../controllers/post')
// Authentication
const { auth } = require('../middlewares/auth')

//news
const { uploadFile } = require('../middlewares/uploadFile')

//post
const { uploadFiles } = require('../middlewares/uploadFiles')

// Route:

router.post('/users', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)
router.delete('/deleteuser/:id', deleteuser)
router.get('/Users', getUserss)

router.post('/news', auth, uploadFile('newsImg'), addNews)
router.get('/all-news', getNews)
router.get('/newss/:id', auth, getnewss)
router.patch('/news/:id', auth, updatenews)
router.delete('/del-news/:id', auth, deletenews)

router.post('/post', auth, uploadFile('postImg'), addPost)
router.get('/posts', getPost)
router.get('/post/:id', auth, getPosts)
router.patch('/postt/:id', auth, updatepost)
router.delete('/delete-post/:id', auth, deletepost)

module.exports = router