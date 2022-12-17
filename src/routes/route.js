const express = require('express')
const router = express.Router()
const { createAuthors,  authorLogin } = require('../controllers/authorController')
const { createNewBlog, getBlogData} = require('../controllers/blogController')
const { authentication} = require("../middleware/auth")

//------------------------------------------- AUTHOR api ----------------------------------------------------

router.post('/authors', createAuthors)
router.post('/login', authorLogin)



//--------------------------------------- BLOG api ------------------------------------------------------

router.post('/blogs', authentication, createNewBlog)
router.get('/blogs', authentication, getBlogData)




module.exports = router