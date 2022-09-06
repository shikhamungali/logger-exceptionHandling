const authorModel = require('../models/authormodel')


//-------------------------------------------------- APIs /authors --------------------------------

const createAuthors = async function(req,res){
    try{

        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        const nameRegex = /^[a-z]{3,15}+$/i
//=========================================== user not entered any data ==========================================
        let authorData = req.body
        if(Object.keys(authorData).length == 0){
            return res.status(400).send({status:false,message:"please enter data"})
        }

//====================================Validating fname ================================================
        if (!authorData.fname){
            return res.status(400).send({status:false,message:"fname is required"})
        }
        if(!authorData.fname.match(nameRegex)){
            return res.status(400).send({ status: false, message: "Invalid format of fname" })
        }
//================================ VALIDATING lname ===============================================
        if (!authorData.lname){
            return res.status(400).send({status:false,message:"lname is required"})
        }
        if(!authorData.lname.match(nameRegex)){
            return res.status(400).send({ status: false, message: "Invalid format of lname" })
        }

//=======================================title validation =============================================
        if (!authorData.title){
            return res.status(400).send({status:false,message:"title is required"})
        }
        if (["Mr", "Mrs", "Miss"].indexOf(authorData.title)== -1){
            return res.status(400).send({ status: false, message: "please enter Mr ,Mrs,Miss" })
        }
//=========================================email validation =============================================
        if (!authorData.email){
            return res.status(400).send({status:false,message:"email is required."})
        }
        if (!authorData.email.match(emailRegex)){
            return res.status(400).send({ status: false, message: "Invalid Format of email." })
        }

        let emailAlreadyExist = await authorModel.findOne({email:authorData.email})
        if (emailAlreadyExist){
            return res.status(400).send({ status: false, message: "Email already exist." })
        }

 //====================================== password validation =======================================       
        if (!authorData.password){
            return res.status(400).send({status:false,message:"password is required"})
        }

        let createdAuthor = await authorModel.create(authorData)
        res.status(201).send({status:true,message:"Author created sucessfully",data:createdAuthor})

    }
    catch(error){
        res.status(500).send({ status: false, Error: error.message })
    }
}


//--------------------------------------------- get /authors -------------------------------------------------

const getAuthor = async function (req, res) {
    try{let alldata = await authorModel.find()
    res.status(200).send({ status: true, data: alldata })}
    catch(error){
        res.status(500).send({ status: false, Error: error.message })
    }
}


module.exports.createAuthors = createAuthors
module.exports.getAuthor = getAuthor