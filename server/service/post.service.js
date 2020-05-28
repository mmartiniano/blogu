/*
* Post service
*
* Implements Post persistence
*/

// Import
const Post = require('../model/post') // Post model
const PostError = require('../error/post.error') // Post Error
const NotFoundError = require('../error/not_found.error') // Not Found Error

module.exports = {

    /*
    * Save Post
    *
    * Try to save a post, then callback given function
    * 
    * @param: post: post to persist
    * @param: callback: function to recieve post saved instance or error
    */
    save(post, callback) {
        post.save((error, document) => {
            if (error)
                callback(new PostError(PostError.CREATE), null)
            else
                callback(null, document)
        })
    },

    /*
    * Get Post by id
    *
    * Try to get a post by its id, then callback given function
    * 
    * @param: id: id to look for posts
    * @param: callback: function to recieve post found or error
    */
    getById(id, callback) {
        Post.findById(id).populate('author', 'name username').exec( (error, document) => {
            if (error)
                callback(new PostError(PostError.GET), null)
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundError(), null)
        })
    },

    /*
    * Get Post by user
    *
    * Try to get posts by their author (user)
    * 
    * @param: user id: id of the author
    * @param: callback: function to recieve posts found or error
    */
    getByUserId(userId, callback) {
        Post.find({author: userId}, (error, documents) => {
            if (error)
                callback(new PostError(PostError.GET_FROM_USER), null)
            else 
                callback(null, documents)
        })
    },

    /*
    * Get all Posts
    *
    * Try to list posts
    * 
    * @param: callback: function to recieve post list or error
    */
    list(callback) {
        Post.find({}).populate('author', 'name username').exec( (error, documents) => {
            if (error)
                callback(new PostError(PostError.LIST), null)
            else 
                callback(null, documents)
        })
    },

    /*
    * Update post
    *
    * Try to update specific post by its id
    * 
    * @param: post: post to update
    * @param: callback: function to recieve post updated instance or error
    */
    update(post, callback) {
        Post.findOneAndUpdate({_id: post._id}, post, {new: true}, (error, document) => {
            if (error)
                callback(new PostError(PostError.UPDATE), null)
            else if (document)
                callback(null, document)
            else
                callback(new NotFoundError(), null)       
        })
    },

    /*
    * Delete Post
    *
    * Try to delete specific post by its id
    * 
    * @param: id: post id to delete
    * @param: callback: function to recieve operation error if it has occurred
    */
    delete(id, callback) {
        Post.deleteOne({_id: id}, (error) => {
            if (error)
                callback(new PostError(PostError.DELETE))    
            else 
                callback(null)
        })
    },

    deleteByUserId(userId, callback) {
        Post.deleteMany({author: userId}, (error) => {
            if (error)
                callback(new PostError(PostError.DELETE_FROM_USER))     
            else 
                callback(null)
        })
    }
}