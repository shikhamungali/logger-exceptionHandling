const express = require('express')
const route = require ('./routes/route.js')
const mongoose = require('mongoose')
const logger = require('./loggerFile/logger.js')
const app = express()
const appError = require("./errorHandler/appError")
const errorController = require('./errorController/errorController.js')
 
app.use(express.json())

mongoose.connect("mongodb+srv://GroupDatabase:yysYmXKv6mOkoW9N@cluster0.jwlonbw.mongodb.net/Group35-DB?retryWrites=true&w=majority",{
useNewUrlParser : true
})
.then(()=>{
    console.log('MongoDB is connected')
})
.catch((err)=>{
    console.log(err)
})


app.use('/', (req, res,next) => {
    logger.info(`localhost:3000${req.originalUrl} - ${req.method} - ${req.ip}`)
    next()
}, route)




app.all('*', (req, res, next) => {
    throw new appError(`Requested URL localhost:3000${req.path} not found!`, 404);

})



app.use(errorController)


app.listen(process.env.PORT||3000  , function(){
    console.log('Express app is running on port '+(process.env.PORT||3000) )
})