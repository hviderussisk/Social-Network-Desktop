let mongoose = require('mongoose')

var shema = mongoose.Schema({
    liked: Boolean,
    idUser: Number,
    whomIdUser: Number,
    id: Object,
    name: String,
    timePost: String,
    info: String,
    likeList: Array,
    comment: Array,
    share: Array
})

var Post = mongoose.model( 'Post', shema) 

module.exports = Post
