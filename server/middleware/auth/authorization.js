/*
* Permissions control
*/

const AuthorizationError = require('../../error/authorization.error')
const PostService = require('../../service/post.service')

// Account access manager
const isOwner = (request, response, next) => {
    userId = request.params.id || request.body.id

    if (request.userId != userId)
        return response.status(AuthorizationError.CODE).json([AuthorizationError.MESSAGE])

    next()
}

// Post access manager
const isAuthor = (request, response, next) => {
    postId = request.params.id || request.body.id

    PostService.getByUserId(request.userId, (error, posts) => {
        if (posts) {

            if (posts.find( post =>  post._id.toString() == postId)) 
               return next()
        }

        return response.status(AuthorizationError.CODE).json([AuthorizationError.MESSAGE])
    })
}

module.exports = { isOwner, isAuthor }

