const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-api-key"]; //=======handleing case sensitivty =========================
        if (!token) {
            return res.status(401).send({ status: false, msg: "token must be present" })
        };
        //============================= decoding the token ========================================
        let decodedToken = jwt.verify(token, "Blogging_site_group_35", function (error, decodedToken) {
            if (error) { return res.status(401).send({ status: false, msg: "token is invalid" }) };
            req.loggedInAuthorId = decodedToken._id

        });
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}



const authorisation = async function (req, res, next) {
    try {
        let blogToBeModified = req.params.blogId
        let blog = await blogModel.findById({ _id: blogToBeModified })
        if(blog){ 
            if (blog.authorId != req.loggedInAuthorId) { 
                return res.status(403).send({ status: false, msg: 'Author logged is not allowed to modify the requested data' })
            }else{
                next()
            }
        }
            else{
               return res.status(404).send({ status: false, msg: "blogId does not exist"})
            }
        
    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}



module.exports = { authentication, authorisation }