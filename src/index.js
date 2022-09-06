const express = require('express')
require("dotenv").config()
const route = require ('./routes/route.js')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.Mongo_Db_String,{
useNewUrlParser : true
})
.then(()=>{
    console.log('MongoDB is connected')
})
.catch((err)=>{
    console.log(err)
})


app.use('/' , route)

app.listen(process.env.PORT || 3000 , function(){
    console.log('Express app is running on port '+(process.env.PORT||3000) )
})