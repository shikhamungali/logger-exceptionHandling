const blogModel = require('../models/blogmodel')
const authorModel = require('../models/authormodel')

const createNewBlog = async function (req, res) {
    try {
        let blogData = req.body
//===================== data not entered ==============================================
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
// ============================== setting date id isPublished is true ================================
        if (blogData.isPublished === true) {
            blogData['publishedAt'] = new Date()
        }
        
//===================== validating the author if it exist or not =============================================
        let authorId = await authorModel.findById(blogData.authorId)
        if(!authorId){
            res.status(400).send({ status: false, msg: "Author doesn't exist" })
        }
     
 //========================================  creating blogs ===============================================      
        let blogCreated = await blogModel.create(blogData)
        return res.status(201).send({ status:true,message:"Blog created sucessfully",data: blogCreated })
        
    } catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}

module.exports.createNewBlog = createNewBlog