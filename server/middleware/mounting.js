/*
* Check Entity mount
*/

const EntityMountError = require('../error/entity_mount.error')


/* 
* Check if required fileds to sign up are set
*/
const requiredToRegisterUser = (request, response, next) => {
    if (!request.body.name && !request.body.username && !request.body.password )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to sign in are set
*/
const requiredToSignin = (request, response, next) => {
    if (!request.body.username && !request.body.password )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to publish post are set
*/
const requiredToPublishPost = (request, response, next) => {
    if (!request.body.auhtor && !request.body.title && !request.body.text )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to edit post are set
*/
const requiredToEditPost = (request, response, next) => {
    if (!request.body.title && !request.body.text )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

module.exports = { requiredToRegisterUser, requiredToSignin, requiredToPublishPost, requiredToEditPost }