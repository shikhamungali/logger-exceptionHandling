const blogModel = require('../models/blogmodel')
const authorModel = require('../models/authormodel')


//--------------------------------------------POST /blogs---------------------------------------------------


const createNewBlog = async function (req, res) {
    try {
        let blogData = req.body
//============================================ data not entered ==============================================
        if (!blogData.body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
/// ============================================== title not entered ========================================
        if (!blogData.title) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        }
///=======================================tags not entered =================================================        

        if (!blogData.tags) {
            return res.status(400).send({ status: false, msg: "Tags is required" })
        }
 ///=================================category not entered ==================================================       
        if (!blogData.category) {
            return res.status(400).send({ status: false, msg: "Category is required" })
        }
//// ============================= authodId not entered ======================================================
        if (!blogData.authorId) {
            return res.status(400).send({ status: false, msg: "AuthorId is required" })
        }
// ============================== setting date if isPublished is true ================================
        if (blogData.isPublished === true) {
            blogData['publishedAt'] = new Date()
        }
        
 // ============================ setting date if isDeleted id true =========================================
 
        if (blogData.isDeleted === true) {
            blogData['deletedAt'] = new Date()
        }
        
//===================== validating the author if it exist or not =============================================
        let authorId = await authorModel.findById(blogData.authorId)
        if(!authorId){
           return res.status(400).send({ status: false, msg: "Author doesn't exist" })
        }
 //========================================  creating blogs ===============================================      
        let blogCreated = await blogModel.create(blogData)
        return res.status(201).send({ status:true,message:"Blog created sucessfully",data: blogCreated })
        
    } catch (error) {
         return res.status(500).send({ status: false, Error: error.message })
    }
}


//------------------------------------------------ GET /blogs ------------------------------------------------------



const getBlogData = async function (req, res) {
    try {
        const queryData = req.query
//====================================== if data is not entered in queryparams ====================================
        if (Object.keys(queryData).length == 0) {
            const blog = await blogModel.find({ isPublished: true, isDeleted: false })
            if (blog.length == 0) {
                return res.status(404).send({ status: false, msg: "Blog doesn't Exists, field is required." })
            }
            res.status(200).send({ status: true, data: blog })
        }
//======================================= if data is entered in queryparams ======================================
        if (Object.keys(queryData).length !== 0) {
            let getBlog = await blogModel.find(queryData).populate("authorId")
            if (getBlog.length == 0) {
                return res.status(404).send({ status: false, msg:"No such blog exist.Please provide correct data" })
            }
            res.status(200).send({ status: true, data: getBlog })
        }
    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}


//------------------------------------------PUT /blogs/:blogId ---------------------------------------------------


const updateBlogData = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        const blogUpdatedData = req.body

        if (Object.keys(blogUpdatedData).length == 0)
           { return res.status(404).send({ status: false, msg: "Please enter Data to be updated" });}

        let blog = await blogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            {
                $set: { isPublished: true, body: blogUpdatedData.body, title: blogUpdatedData.title, publishedAt: new Date() },
                $push: { tags: blogUpdatedData.tags, subcategory: blogUpdatedData.subcategory }
            },
            { new: true });
        return res.status(200).send({ status: true, data: blog });

    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}

//------------------------------------------- DELETE /blogs/:blogId --------------------------------------------

const deleteBlogs = async function (req, res) {
    try {
        let blogIdData = req.params.blogId
        let blog = await blogModel.findById(blogIdData)
        if (blog.isDeleted === true) {
            return res.status(404).send({ status: false, message: "No blog exists" })
        }
        let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: new Date() })
        res.status(200).send({ status: true, msg: "Data is successfully deleted" })
    } catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}

///--------------------------------------------------- DELETE /blogs?queryParams -----------------------------------------

const deleteBlogsByQuery = async function(req,res){
    try{
         const dataQuery = req.query
         const isDeletedFalse = {isDeleted:false,}
    }
    catch(error){
        res.status(500).send({ status: false, Error: error.message })
    }
}

module.exports.createNewBlog = createNewBlog
module.exports.getBlogData = getBlogData
module.exports.updateBlogData=updateBlogData
module.exports.deleteBlogs=deleteBlogs
module.exports.deleteBlogsByQuery=deleteBlogsByQuery


