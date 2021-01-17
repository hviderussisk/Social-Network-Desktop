let mongoose = require('mongoose')

var shema = mongoose.Schema({
    email: String,
    name: String,
    id: Object,
    s: String,
    lastname: String,
    password: String,
    cookie: String,
    photo: String,
    photomini: String,
    status: String,
    friend: String
})

var User = mongoose.model( 'User', shema) 

module.exports = User
