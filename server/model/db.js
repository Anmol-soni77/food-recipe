const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MYDATABASE)
.then(()=>{
    console.log('Database connected successfully');
})
.catch((e)=>{
    console.log(`Error:${e} occured while connecting to database`);
})

require('./catagory')
require('./recipes')