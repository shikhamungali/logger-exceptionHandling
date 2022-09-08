const express = require('express')
const router = express.Router()
const { createAuthors, getAuthor, authorLogin } = require('../controllers/authorController')
const { createNewBlog, getBlogData, updateBlogData, deleteBlogs, deleteBlogsByQuery } = require('../controllers/blogController')
const { authentication, authorisation, authorisationQuery } = require("../middleware/auth")


router.get('/test-me', function (req, res) {
    res.send('My first Api!')
})

//------------------------------------------- AUTHOR api ----------------------------------------------------

router.post('/authors', createAuthors)
router.get('/authors', getAuthor)
router.post('/login', authorLogin)//------------------ author login ----------------------------



//--------------------------------------- BLOG api -------------------------------------------------------------

router.post('/blogs', authentication, createNewBlog)
router.get('/blogs', authentication, getBlogData)

router.put('/blogs/:blogId', authentication, authorisation, updateBlogData) //---- UPDATE BLOG -----
router.delete('/blogs/:blogId', authentication, authorisation, deleteBlogs) //---- DELETE BLOG by blogid ---
router.delete('/blogs', authentication, authorisationQuery, deleteBlogsByQuery) //------ DELETE BLOG by queryparams -----



module.exports = router