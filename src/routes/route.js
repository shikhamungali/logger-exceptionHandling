const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')


router.get('/test-me', function(req,res){
    res.send('My first Api!')
})


router.post('/authors', authorController.createAuthors)

router.post('/blogs', blogController.createNewBlog)

// router.get('/authors', authorController.createAuthors)

// router.get('/blogs', blogController.createBlog)



module.exports = router