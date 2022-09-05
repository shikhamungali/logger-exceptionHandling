const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        valid_email: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Author', authorSchema)