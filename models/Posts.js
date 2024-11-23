const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    desc:{
        type:String,
        required:true,
    },
    ImageURL:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('Posts', postsSchema)