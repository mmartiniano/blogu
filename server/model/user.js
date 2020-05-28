/* 
* This is a mongoose model (database schema)
* for User entity
*/

// Import mongoose
const mongoose = require('mongoose')

/*
* User database schema.
*
* _id, name, username, password, member_since and
* avatar (profile image)
*/

let UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 255
    },

    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        maxlength: 16
    },

    member_since: {
        type: Date,
        required: true
    },

    avatar: String
})

module.exports = mongoose.model('User', UserSchema)