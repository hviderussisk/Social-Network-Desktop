let mongoose = require('mongoose')

var shema = mongoose.Schema({
    id: Object,
    idUser: Number,
    name: String,
    timePost: String, 
    info: String,
    idPost: String
})

var Comment = mongoose.model( 'Comment', shema) 

module.exports = Comment
