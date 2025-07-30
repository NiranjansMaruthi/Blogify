
const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Blog', blogSchema);