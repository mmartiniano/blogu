/*
* Post Exception
*
* Used to express error during database
* communication process to access Post collection.
*
* 'code' stands for HTTP response code. Setted as
* 500 (Internal Servere error) by default.
*/
class PostException extends Error {  
    constructor (message = 'Unhandled Post Exception', code = 500) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

PostException.CREATE = 'Failed to create post'
PostException.GET = 'Failed to get post'
PostException.GET_FROM_USER = 'Failed to get posts from user'
PostException.LIST = 'Failed to list post'
PostException.UPDATE = 'Failed to update post'
PostException.DELETE = 'Failed to delete post'
PostException.DELETE_FROM_USER = 'Failed to delete posts from user'

module.exports = PostException