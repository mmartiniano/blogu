/*
* User service
*
* Implements User persistence
*/

// Import
const User = require('../model/user') // User model
const UserException = require('../exception/user_exception') // User Exception
const NotFoundException = require('../exception/not_found_exception') // Not Found Exception
const illFormedId = require('../util/ill_formed_id') // Valid id verifier

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
            callback(new UserException('Failed to create user.'), null)
        else
            callback(null, document)
       });
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
            if (error) {
                if (illFormedId(id))
                    callback(new NotFoundException(), null)
                else
                    callback(new UserException('Failed to get user.'), null)
            }
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundException(), null)
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
                callback(new UserException('Failed to get user.'), null)
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundException(), null)
        });
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
                callback(new UserException('Failed to get users.'), null)
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
            if (error) {
                if (illFormedId(user._id))
                    callback(new NotFoundException(), null)
                else
                    callback(new UserException('Failed to update user.'), null)
            }
            else if (document)
                callback(null, document)
            else 
                callback(new NotFoundException(), null)
        });
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
            if (error) {
                if (illFormedId(id))
                    callback(new NotFoundException())
                else
                    callback(new UserException('Failed to delete user.'))
            }
            else 
                callback(null)
        });
    },

}