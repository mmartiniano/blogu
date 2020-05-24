/*
* User controller
*
* Implements User business logics
*/

// Import
const jwt = require('jsonwebtoken')
const Auth = require('../auth') // Access token manager
const UserDTO = require('../model/user_dto') // User data transfer object
const User = require('../model/user') // User model
const UserService = require('../service/user_service') // User service
const PostService = require('../service/post_service') // Post service
const UserException = require('../exception/user_exception') // User Exception
const PostException = require('../exception/post_exception') // Post Exception
const AuthenticationException = require('../exception/authentication_exception') // Authentication Exception
const NotFoundException = require('../exception/not_found_exception') // Not Found Exception
const EntityMountException = require('../exception/entity_mount_exception') // Entity Mount Exception

// User authentication control

/*
* Sign up
*
* process POST requests at '/api/auth/signup'
*
* response: accenew registred user info
*/
async function signup(request, response) {

    let user = new User({
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
        member_since: Date.now(),
        avatar: request.body.avatar,
    })

    // Required fields violation response
    if (! properlyFilled(user)) {
        const exception = new EntityMountException()
        response.status(exception.code).json([exception.message])
        return
    }
        
    // Uniqueness integrity violation response
    if (! await keepUniquenessIntegrity(user)) {
        response.status(409).json(['Username already taken.'])
        return
    }
    
    // Try to create user
    UserService.save(user, (error, newUser) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else {
            data = new UserDTO(newUser)

            response.status(201).send({
                ...data,
                token: Auth.generateToken(newUser)
            })
        }
    });

}

/*
* Sign in
*
* process POST requests at '/api/auth/signin'
*
* response: new registred user info
*/
function signin(request, response) {

    // Check if username and password are set
    if (!request.body.username || !request.body.password) {
        const exception = new EntityMountException()
        return response.status(exception.code).json([exception.message])   
    }

    UserService.getByUsername(request.body.username, (error, user) => {
        if (user) {

            if (user.password == request.body.password) {
                data = new UserDTO(user)

                return response.status(200).send({
                    ...data,
                    token: Auth.generateToken(user)
                })
            }
        }

        const exception = new AuthenticationException()
        response.status(exception.code).json([exception.message])
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
        if (error) {
            const exception = serviceExceptionHandler(error)
            return response.status(exception.code).json([exception.message])
        }

        let users = documents.map( user => { return new UserDTO(user) })
        response.status(200).json(users)
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
        if (error) {
            const exception = serviceExceptionHandler(error)
            return response.status(exception.code).json([exception.message])
        }

        response.status(200).json(new UserDTO(document))
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

    // This function is hardly similar to create
    // Future versions may merge them.

    let user = new User({
        _id: request.params.id,
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
        avatar: request.body.avatar,
    })

    // Required fields violation response
    if (! properlyFilled(user)) {
        const exception = new EntityMountException()
        response.status(exception.code).json([exception.message])
        return
    }
        
    // Uniqueness integrity violation response
    if (! await keepUniquenessIntegrity(user)) {
        response.status(409).json(['Username already taken.'])
        return
    }
    
    // Try to update user
    UserService.update(user, (error, updatedUser) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            return response.status(exception.code).json([exception.message])
        }
        
        response.status(200).json(new UserDTO(updatedUser))
    });

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
        if (error) {
            const exception = serviceExceptionHandler(error)
            return response.status(exception.code).json([exception.message])
        }

        PostService.deleteByUserId(id, error => {
            if (error) {
                const exception = serviceExceptionHandler(error)
                response.status(exception.code).json([exception.message])
            }
        })

        response.status(200).send({
            token: null
        })
    });

}

// Util

// Check if user object has required properties setted
function properlyFilled(user) {
    return user.name && user.username && user.password
}

/* 
* Check if user satisfies User collection uniqueness integrity
*
* There are two cases:
*   1. New users. So it is needy to test if username hasn't already been taken.
*   2. Current users. So it is needy to check if username is available or if
*      who is using it is the user itself.
* 
* Since test result comes out as a Promise, functions that use this test
* should be async
*
* @param: user: model/user object
*/
function keepUniquenessIntegrity(user) {

    return new Promise(resolve => {

        UserService.getByUsername(user.username, (error, document) => {

            // If username is not free to use
            if (document) {
    
                // If user isn't a new user
                // NOTE: Potencional security failure, but it is just a learning project
                if (user._id) {
    
                    // If who is using username is the current user
                    if (user._id == document._id.toString())
                        resolve(true)
                }
            } else resolve(true)

            resolve(false)
        });
    })
}

// Define exception
function serviceExceptionHandler(exception) {

    if (! (exception instanceof UserException || exception instanceof PostException || exception instanceof NotFoundException)) {
        exception.code = 500
        exception.message = "Unhandled exception."
    }
        
    return exception

}

module.exports = { signup, signin, list, read, update, remove }