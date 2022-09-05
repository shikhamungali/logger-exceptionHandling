const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
     body: {
        type:String,
        required:true
      },
      authorId: {
        type:ObjectId,
        required:true,
        ref:'author',
      },
       tags: [String],
        category: {
            types:, examples: [technology, entertainment, life style, food, fashion] }, subcategory: { array of string, examples[technology - [web development, mobile development, AI, ML etc]] }, deletedAt: { when the document is deleted },
         isDeleted: { boolean, default: false },
          publishedAt: { when the blog is published },
           isPublished: { boolean, default: false }
})