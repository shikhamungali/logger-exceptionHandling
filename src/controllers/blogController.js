const blogModel = require('../models/blogModel')


const createBlog = async function (req, res) {
    try {
        let data = req.body
        let savedData = await blogModel.create(data)
        
    }
}