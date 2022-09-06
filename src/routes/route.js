const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')


router.get('/test-me', function(req,res){
    res.send('My first Api!')
})

//------------------------------------------- AUTHOR api ----------------------------------------------------

router.post('/authors', authorController.createAuthors)
router.get('/authors', authorController.getAuthor)


//--------------------------------------- BLOG api -------------------------------------------------------------

router.post('/blogs', blogController.createNewBlog)
router.get('/blogs', blogController.getBlogData)

router.put('/blogs/:blogId', blogController.updateBlogData) //---------- UPDATE BLOG -------------------------
router.delete('/blogs/:blogId', blogController.deleteBlogs) //-----------DELETE BLOG ---------------------
router.delete('/blogs', blogController.deleteBlogsByQuery) //-----------DELETE BLOG by queryparams ---------------------



module.exports = router