const blogModel = require('../models/blogmodel')
const authorModel = require('../models/authormodel')
const mongoose = require('mongoose')



//--------------------------------------------POST /blogs---------------------------------------------------


const createNewBlog = async function (req, res) {
    try {
        let blogData = req.body
        //============================================ data not entered ======================================
        if (!blogData.body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
        /// ============================================== title not entered =================================
        if (!blogData.title) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        }
        ///=======================================tags not entered ======================================       

        if (!blogData.tags) {
            return res.status(400).send({ status: false, msg: "Tags is required" })
        }
        ///=================================category not entered ==========================================     
        if (!blogData.category) {
            return res.status(400).send({ status: false, msg: "Category is required" })
        }
        //// ============================= authodId not entered ============================================
        if (!blogData.authorId) {
            return res.status(400).send({ status: false, msg: "AuthorId is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(blogData.authorId)) {
            return res.status(400).send({ status: false, msg: "invalid authorId format" });
        }
        //===================== validating the author if it exist or not ================================
        let authorId = await authorModel.findById(blogData.authorId)
        if (!authorId) {
            return res.status(404).send({ status: false, msg: "Author doesn't exist" })
        }
        //***************** if author id is not matched with token author id *******************
        if (!(blogData.authorId == req.loggedInAuthorId)) {
            return res.status(403).send({ status: false, msg: "author loggedIn is not allowed to create other author blogs" });
        }

        // ============================== setting date if isPublished is true ================================
        if (blogData.isPublished === true) {
            blogData['publishedAt'] = new Date()
        }

        // ============================ setting date if isDeleted id true =========================================
        if (blogData.isDeleted === true) {
            blogData['deletedAt'] = new Date()
        }

        //========================================  creating blogs ==========================================   
        let blogCreated = await blogModel.create(blogData)
        return res.status(201).send({ status: true, message: "Blog created sucessfully", data: blogCreated })

    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}


//------------------------------------------------ GET /blogs ---------------------------------------------------


const getBlogData = async function (req, res) {
    try {
        const queryData = req.query
        //============================== if data is not entered in queryparams ====================================
        if (Object.keys(queryData).length == 0) {
            const blog = await blogModel.find({ isPublished: true, isDeleted: false })
            if (blog.length == 0) {
                return res.status(404).send({ status: false, msg: "Blog doesn't Exists." })
            }
            return res.status(200).send({ status: true, data: blog })
        }
        //======================================= if data is entered in queryparams ==============================
        if (Object.keys(queryData).length !== 0) {
        
            let getBlog = await blogModel.find({$and:[queryData,{isDeleted:false,isPublished:true}]}).populate("authorId")
            if (getBlog.length == 0) {
                return res.status(404).send({ status: false, msg: "No such blog exist.Please provide correct data" })
            }
            return res.status(200).send({ status: true, data: getBlog })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}


module.exports = { createNewBlog, getBlogData }


