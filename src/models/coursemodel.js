
const mongoose = require('mongoose');

const courseschema = new mongoose.Schema({
    name:{
        type:String
    },
    author:{
        type:String
    },
    tags:{
        type:[String]
    },
    date:{
        type:Date,
        default:Date.now
    },
    isPublished:{
        type:Boolean
    },
    price:{
        type:Number
    }

})

module.exports = mongoose.model('course',courseschema);