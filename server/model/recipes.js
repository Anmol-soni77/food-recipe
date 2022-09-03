const mongoose = require('mongoose')
require('./db')

const recipieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"This field is required"
    },
    image:{
        type:String,
        required:"This field is required"
    },
    description:{
        type:String,
        required:"This field is required"
    },
    ingridients:{
        type:Array,
        required:"This field is required"
    },
    email:{
        type:String,
        required:"This field is required"
    },
    catagory:{
        type:String,
        required:"This field is required"
    }
})

recipieSchema.index({name:'text',description:"text"})

const recipies = new mongoose.model('recipies',recipieSchema)

module.exports = recipies