const authorModel = require('../models/authormodel')
const jwt = require('jsonwebtoken')
const AppError = require("../errorHandler/appError")


//-------------------------------------------------- APIs /authors --------------------------------

const createAuthors = async function (req, res) {
    try {

        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        const nameRegex = /^[a-z\s]+$/i
        const passwordRegex = /^(?!.\s)[A-Za-z\d@$!%?&]{8,}$/

        //=========================================== user not entered any data ==========================================
        let authorData = req.body
        if (Object.keys(authorData).length == 0) {
            throw new AppError("please enter data", 400)
        }

        //====================================Validating fname ================================================
        if (!authorData.fname) {
            throw new AppError("fname is required", 400)
        }
        if (!authorData.fname.match(nameRegex)) {
            throw new AppError("Invalid format of fname", 400)
        }
        //================================ VALIDATING lname ===============================================
        if (!authorData.lname) {
            throw new AppError("lname is required", 400)
        }
        if (!authorData.lname.match(nameRegex)) {
            throw new AppError("Invalid format of lname", 400)
        }

        //=======================================title validation =============================================
        if (!authorData.title) {
            throw new AppError("title is required", 400)
        }
        if (["Mr", "Mrs", "Miss"].indexOf(authorData.title) == -1) {
            throw new AppError("please enter Mr , Mrs, Miss", 400)
        }
        //=========================================email validation =============================================
        if (!authorData.email) {
            throw new AppError("email is required.", 400)
        }
        if (!authorData.email.match(emailRegex)) {
            throw new AppError("Invalid Format of email.", 400)
        }
        let emailAlreadyExist = await authorModel.findOne({ email: authorData.email })
        if (emailAlreadyExist) {
            throw new AppError("Email already exist.", 400)
        }

        //====================================== password validation =======================================       
        if (!authorData.password) {
            throw new AppError("password is required", 400)
        }
        if (!passwordRegex.test(authorData.password)) {
            throw new AppError("Invalid format of password", 400)
        }

        //========================================= author created ========================================
        let createdAuthor = await authorModel.create(authorData)
        return res.status(201).send({ status: true, message: "Author created sucessfully", data: createdAuthor })

    }
    catch (error) {
        next(error)
    }
}

//-----------------------------------------------POST /login------------------------------------------------

const authorLogin = async function (req, res,next) {
    try {
        let userName = req.body.email;
        let password = req.body.password;

        let user = await authorModel.findOne({ email: userName, password: password });
        //======================== if body is empty =============================================
        if (Object.keys(req.body).length == 0) {
            throw new AppError("Data is required", 400)
        }
        //============================= if username is not entered ====================================
        if (!userName) {
            throw new AppError("UserName is required", 400)
        }
        //================================= if password id not entered ================================
        if (!password) {
            throw new AppError("Password is required", 400)
        }
        //===================================== if no matching data found =======================================
        if (!user) {
            throw new AppError("UserName or Password incorrect",401)
        }
        //=============================== token generation =====================================================
        let payload = { _id: user._id,  projectName: "BloggingSite" }
        let token = jwt.sign(payload, "loggerandexceptionalhandling");
        return res.status(201).send({ status: true, token: token });
    }
    catch (error) {
        next(error)
    }
};

module.exports = { createAuthors, authorLogin }
