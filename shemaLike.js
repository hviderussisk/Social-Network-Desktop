let mongoose = require('mongoose')

var shema = mongoose.Schema({
    idUser: Number,
    idLike: Object,
    idPost: String
})

var Like = mongoose.model( 'Like', shema) 

module.exports = Like
