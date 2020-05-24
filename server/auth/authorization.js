/*
* Permissions control
*/

const AuthorizationException = require('../exception/authorization_exception')
const PostService = require('../service/post_service')

// Account access manager
const isOwner = (request, response, next) => {
    userId = request.params.id || request.body.id

    if (request.userId != userId) {
        const exception = new AuthorizationException()
        return response.status(exception.code).json([exception.message])
    }

    next()
}

// Post access manager
const isAuthor = (request, response, next) => {
    postId = request.params.id || request.body.id

    PostService.getByUserId(request.userId, (error, posts) => {
        if (posts) {
            if (posts.filter( post => {
                return post._id.toString == postId
            })) {
                next()
                return
            }
        }

        const exception = new AuthorizationException()
        return response.status(exception.code).json([exception.message])
    })
}

module.exports = { isOwner, isAuthor }

