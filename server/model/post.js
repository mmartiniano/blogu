/* 
* This is a mongoose model (database schema)
* for Post entity
*/

// Import mongoose
const mongoose = require('mongoose')

/*
* Post database schema.
*
* _id, author (user who created it), title,
* created_at, updated_at (last update date)
* and text (post main content)
*/

let PostSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        required: true,
        maxlength: 255
    },

    created_at: {
        type: Date,
        required: true,
    },

    updated_at: {
        type: Date,
        default: null,
    },

    text: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Post', PostSchema)