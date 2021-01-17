let mongoose = require('mongoose')

var shema = mongoose.Schema({
    idWho: String,
    idWhom: String,
    status: Boolean
})

var friend = mongoose.model( 'friend', shema) 

module.exports = friend
