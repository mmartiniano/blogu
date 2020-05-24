/*
* Post controller
*
* Implements Post business logics
*/

// Import 
const Post = require('../model/post') // Post model
const PostService = require('../service/post_service') // Post service
const PostException = require('../exception/post_exception') // Post Exception
const NotFoundException = require('../exception/not_found_exception') // Not Found Exception
const EntityMountException = require('../exception/entity_mount_exception') // Entity Mount Exception

// Post API

/*
* List all posts.
*
* process GET requests at '/api/post'
*
* @return: json list of posts
*/
function list(request, response) {
    PostService.list((error, documents) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else
            response.status(200).json(documents)
    })
}

/*
* Read specific post.
*
* process GET requests at '/api/post/:id'
*
* @return: post info as json
*/
function read(request, response) {
    id = request.params.id

    PostService.getById(id, (error, document) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else
            response.status(200).json(document)
    })
}

/*
* Create post
*
* process POST requests at '/api/post'
*
* @return: new registred post info as json
*/
function create(request, response) {

    let post = new Post({
        author: request.userId,
        title: request.body.title,
        created_at: Date.now(),
        text: request.body.text
    })

    // Required fields violation response
    if (! properlyFilled(post)) {
        const exception = new EntityMountException()
        response.status(exception.code).json([exception.message])
        return
    }
        
    
    // Try to create post
    PostService.save(post, (error, newPost) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else
            response.status(201).json(newPost)
    });

}

/*
* Update post
*
* process PUT requests at '/api/post/:id'
*
* @return: post info updated as json
*/
function update(request, response) {

    let post = new Post({
        _id: request.params.id,
        author: request.userId,
        title: request.body.title,
        updated_at: Date.now(),
        text: request.body.text
    })

    // Required fields violation response
    if (! properlyFilled(post)) {
        const exception = new EntityMountException()
        response.status(exception.code).json([exception.message])
        return
    }
        
    
    // Try to update post
    PostService.update(post, (error, updatedPost) => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else
            response.status(200).json(updatedPost)
    });

}

/*
* Remove post
*
* process DELETE requests at '/api/post/:id'
*
* @return: only http status OK
*/
function remove(request, response) {

    id = request.params.id
    
    // Try to delete post
    PostService.delete(id, error => {
        if (error) {
            const exception = serviceExceptionHandler(error)
            response.status(exception.code).json([exception.message])
        } else
            response.status(200).send()
    });

}

module.exports = { list, read, create, update, remove }

// Util

// Check if post object has required properties setted
function properlyFilled(post) {
    return post.author && post.title && post.text
}

// Define exception
function serviceExceptionHandler(exception) {

    if (! (exception instanceof PostException || exception instanceof NotFoundException)) {
        exception.code = 500
        exception.message = "Unhandled exception."
    }
        
    return exception

}