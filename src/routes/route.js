const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const middleware = require("../middleware/auth")


router.get('/test-me', function(req,res){
    res.send('My first Api!')
})

//------------------------------------------- AUTHOR api ----------------------------------------------------

router.post('/authors', authorController.createAuthors)
router.get('/authors', authorController.getAuthor)
router.post('/login',authorController.authorLogin)//------------------ author login ----------------------------



//--------------------------------------- BLOG api -------------------------------------------------------------

router.post('/blogs', middleware.authentication, blogController.createNewBlog)
router.get('/blogs', middleware.authentication, blogController.getBlogData)

router.put('/blogs/:blogId', middleware.authentication, middleware.authorisation, blogController.updateBlogData) //---------- UPDATE BLOG -------------------------
router.delete('/blogs/:blogId', middleware.authentication, middleware.authorisation, blogController.deleteBlogs) //-----------DELETE BLOG by blogid---------------------
router.delete('/blogs', middleware.authentication, blogController.deleteBlogsByQuery) //-----------DELETE BLOG by queryparams -----------------



module.exports = router