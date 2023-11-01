const mongoose = require('mongoose')
const suthModelSchema = mongoose.Schema({
    username : String,
    email : String,
    password :String,
    gender : String,
    dob : String
})
module.exports = mongoose.model('JWT',suthModelSchema)