const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')


router.get('/test-me', function(req,res){
    res.send('My first Api!')
})


router.post('/authors', authorController.createAuthor)

router.post('/blogs', blogController.createBlog)

router.get('/authors', authorController.createBlog)

router.get('/blogs', blogController.createBlog)



module.exports = router