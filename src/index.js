const express = require('express')
const route = require ('./routes/route.js')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Shikhamungali:4t2GRX51VoOU37yQ@cluster0.8hmxve1.mongodb.net/Blogging_Project-DB?retryWrites=true&w=majority",{
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