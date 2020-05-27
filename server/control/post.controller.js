/*
* Post controller
*
* Implements Post business logics
*/

// Import 
const Post = require('../model/post') // Post model
const PostService = require('../service/post.service') // Post service
const PostError = require('../error/post.error') // Post Error
const NotFoundError = require('../error/not_found.error') // Not Found Error
const EntityMountError = require('../error/entity_mount.error') // Entity Mount Error

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
        if (error) 
           return response.status(error.code).json([error.message])
        
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
        if (error)
            return response.status(error.code).json([error.message])
        
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
    
    // Try to create post
    PostService.save(post, (error, newPost) => {
        if (error)
            return response.status(error.code).json([error.message])

        response.status(201).json(newPost)
    })

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
    
    // Try to update post
    PostService.update(post, (error, updatedPost) => {
        if (error)
            return response.status(error.code).json([error.message])
        
        response.status(200).json(updatedPost)
    })

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
        if (error)
            return response.status(error.code).json([error.message])
        
        response.status(200).send()
    })

}

module.exports = { list, read, create, update, remove }