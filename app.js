const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layouts')
const path = require('path')
const port = process.env.PORT || 8000;
const routes = require('./server/routes/reciperoutes.js')
const catagory = require('./server/model/catagory')
const fileupload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
 

// connecting the database
require('./server/model/db')

//
app.use(express.urlencoded({extended:true}))

//path of public folder
let pathofpublicfolder = path.join(__dirname,'./public')

//initializing the static folder
app.use(express.static(pathofpublicfolder))

//setting the dotenv
require('dotenv').config()

// setting the view engine
app.set('view engine','ejs')

// Using the layouts 
app.use(expresslayouts)
app.set('layout','./layout/main')




     //
app.use(cookieParser('cookingblogsecure'))
app.use(session({
    secret:'cookingblogsecuresession',
    saveUninitialized:true,
    resave:true
}));
app.use(flash());
app.use(fileupload())

 

//setting the routes
app.use('/', routes)


app.listen(port,()=>{
    console.log(`server is heard on http://127.0.0.1:8000`);
})