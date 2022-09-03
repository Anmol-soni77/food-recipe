const mongoose = require('mongoose')
require('./db')

const catagorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:"This field is required"
    },
    image:{
        type:String,
        required:"This field is required"
    }
})

const catagory = new mongoose.model('catagory',catagorySchema)

module.exports = catagory;