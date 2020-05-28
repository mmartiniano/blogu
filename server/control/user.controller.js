/*
* User controller
*
* Implements User business logics
*/

// Import
const jwt = require('jsonwebtoken')
const UserDTO = require('../model/user_dto') // User data transfer object
const User = require('../model/user') // User model
const UserService = require('../service/user.service') // User service
const PostService = require('../service/post.service') // Post service
const UserError = require('../error/user.error') // User Error
const PostError = require('../error/post.error') // Post Error
const AuthenticationError = require('../error/authentication.error') // Authentication Error
const NotFoundError = require('../error/not_found.error') // Not Found Error
const EntityMountError = require('../error/entity_mount.error') // Entity Mount Error

// User authentication control

/*
* Sign up
*
* process POST requests at '/api/auth/signup'
*
* response: access token and new registred user info
*/
function signup(request, response) {

    let user = new User({
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
        member_since: Date.now(),
        avatar: request.body.avatar,
    })
    
    // Try to create user
    UserService.save(user, (error, newUser) => {
        if (error)
            return response.status(error.code).json([error.message])
       
        data = new UserDTO(newUser)

        return response.status(201).send({
            ...data,
            token: generateToken(newUser)
        })
    })
}

/*
* Sign in
*
* process POST requests at '/api/auth/signin'
*
* response: new registred user info
*/
function signin(request, response) {

    UserService.getByUsername(request.body.username, (error, user) => {
        if (user) {

            if (user.password == request.body.password) {
                data = new UserDTO(user)

                return response.status(200).send({
                    ...data,
                    token: generateToken(user)
                })
            }
        }

        return response.status(AuthenticationError.CODE).json([AuthenticationError.MESSAGE])
    })
}


// User API

/*
* List all users.
*
* process GET requests at '/api/user'
*
* @return: json list of users
*/
function list(request, response) {
    UserService.list((error, documents) => {
        if (error)
            return response.status(error.code).json([error.message])

        let users = documents.map( user => { return new UserDTO(user) })
        response.status(200).json(documents)
    })
}

/*
* Read specific user.
*
* process GET requests at '/api/user/:id'
*
* @return: user info as json
*/
function read(request, response) {
    id = request.params.id

    UserService.getById(id, (error, document) => {
        if (error)
            return response.status(error.code).json([error.message])

        response.status(200).json(new UserDTO(document))
    })
}

/*
* Read specific user posts.
*
* process GET requests at '/api/user/:id/posts'
*
* @return: user posts
*/
function posts(request, response) {
    id = request.params.id

    PostService.getByUserId(id, (error, posts) => {
        if (error)
            return response.status(error.code).json([error.message])

        response.status(200).json(posts)
    })
}

/*
* Update user
*
* process PUT requests at '/api/user/:id'
*
* @return: user info updated as json
*/
async function update(request, response) {

    let user = new User({
        _id: request.params.id,
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
        avatar: request.body.avatar,
    })
    
    // Try to update user
    UserService.update(user, (error, updatedUser) => {
        if (error)
            return response.status(error.code).json([error.message])
        
        response.status(200).json(new UserDTO(updatedUser))
    })

}

/*
* Remove user
*
* process DELETE requests at '/api/user/:id'
*
* @return: only http status OK
*/
function remove(request, response) {

    id = request.params.id
    
    // Try to delete user
    UserService.delete(id, error => {
        if (error)
            return response.status(error.code).json([error.message])

        PostService.deleteByUserId(id, error => {
            if (error)
                response.status(error.code).json([error.message])
        })

        response.status(200).send({
            token: null
        })
    })

}

// Access token
function generateToken(user) {
    return jwt.sign( {id: user._id}, process.env.SECRET, { expiresIn: '1d'})
}

module.exports = { signup, signin, list, read, posts, update, remove }