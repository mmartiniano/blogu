/*
* Check Entity mount
*/

const EntityMountError = require('../error/entity_mount.error')


/* 
* Check if required fileds to sign up are set
*/
const requiredToSignup = (request, response, next) => {
    if (!request.body.name || !request.body.username || !request.body.password )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to update personal data are set
*/
const requiredToUpdatePersonalData = (request, response, next) => {
    if (!request.body.name || !request.body.username)
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to update password are set
*/
const requiredToUpdatePassword = (request, response, next) => {
    if (!request.body.oldPassword || !request.body.newPassword)
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to sign in are set
*/
const requiredToSignin = (request, response, next) => {
    if (!request.body.username || !request.body.password )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}

/* 
* Check if required fileds to publish (create / edit) post are set
*/
const requiredToPublish = (request, response, next) => {
    if (!request.userId || !request.body.title || !request.body.text )
        return response.status(EntityMountError.CODE).json([EntityMountError.MESSAGE])

    next()
}


module.exports = { requiredToSignup, requiredToUpdatePersonalData, requiredToUpdatePassword, requiredToSignin, requiredToPublish }