/*
* Post Error
*
* Used to express error during database
* communication process to access Post collection.
*
* 'code' stands for HTTP response code. Setted as
* 500 (Internal Servere error) by default.
*/
class PostError extends Error {  
    constructor (message = 'Unhandled Post Error', code = 500) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

PostError.CREATE = 'Failed to create post'
PostError.GET = 'Failed to get post'
PostError.GET_FROM_USER = 'Failed to get posts from user'
PostError.LIST = 'Failed to list post'
PostError.UPDATE = 'Failed to update post'
PostError.DELETE = 'Failed to delete post'
PostError.DELETE_FROM_USER = 'Failed to delete posts from user'

module.exports = PostError