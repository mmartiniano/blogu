/*
* User service
*
* Implements User persistence
*/

// Import
const User = require('../model/user') // User model
const UserError = require('../error/user.error') // User Error
const NotFoundError = require('../error/not_found.error') // Not Found Error

module.exports = {

    /*
    * Save User
    *
    * Try to save a user, then callback given function
    * 
    * @param: user: user to persist
    * @param: callback: function to recieve user saved instance or error
    */
    save(user, callback) {
       user.save((error, document) => {
        if (error)
            return callback(new UserError(UserError.CREATE), null)
        else
            callback(null, document)
       })
    },

    /*
    * Get User by id
    *
    * Try to get a user by its id, then callback given function
    * 
    * @param: id: id to look for users
    * @param: callback: function to recieve user found or error
    */
    getById(id, callback) {
        User.findById(id, (error, document) => {
            if (error)
                callback(new UserError(UserError.GET), null)
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundError(), null)
        })
    },

    /*
    * Get User by username
    *
    * Try to get a user by its username, then callback given function
    * 
    * @param: unsername: username to look for users
    * @param: callback: function to recieve user found or error
    */
    getByUsername(username, callback) {
        User.findOne({username: username}, (error, document) => {
            if (error)
                callback(new UserError(UserError.GET), null)
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundError(), null)
        })
    },

    /*
    * Get all Users
    *
    * Try to list users, then callback given function
    * 
    * @param: callback: function to recieve user list or error
    */
    list(callback) {
        User.find({}, (error, documents) => {
            if (error)
                callback(new UserError(UserError.LIST), null)
            else 
                callback(null, documents)
        })
    },

    /*
    * Update User
    *
    * Try to update specific user by its id, then callback given function
    * 
    * @param: user: user to update
    * @param: callback: function to recieve user updated instance or error
    */
    update(user, callback) {
        User.findOneAndUpdate({_id: user._id}, user, {new: true}, (error, document) => {
            if (error) 
                callback(new UserError(UserError.UPDATE), null)
            else if (document)
                callback(null, document)
            else 
                callback(new NotFoundError(), null)
        })
    },

    /*
    * Delete User
    *
    * Try to delete specific user by its id, then callback given function
    * 
    * @param: id: user id to delete
    * @param: callback: function to recieve operation error if it has occurred
    */
    delete(id, callback) {
        User.deleteOne({_id: id}, (error) => {
            if (error)
                callback(new UserError(UserError.DELETE))
            else 
                callback(null)
        })
    }

}