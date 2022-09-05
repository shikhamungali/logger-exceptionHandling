const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: 'Author',
    },
    tags: [String],
    category: {
        types: String,
        required: true
    },
    subcategory: [String],
    deletedAt: Date,
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    isPublished: {
        type: Boolean,
        default: false
    }
},
{timestamps:true});

module.exports = mongoose.model('Blog',BlogSchema)