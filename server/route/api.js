/*
* This module defines the server responses for API REQUESTS.
*/

// Import
const express = require('express') // Express
const UserController = require('../control/user_controller') // User controller
const PostController = require('../control/post_controller') // Post controller

// Express.Router object
const router = express.Router()

// User routes
router.get('/api/user', UserController.list)
router.get('/api/user/:id', UserController.read)
router.post('/api/user', UserController.create)
router.put('/api/user/:id', UserController.update)
router.delete('/api/user/:id', UserController.remove)


// Post routes
router.get('/api/post', PostController.list)
router.get('/api/post/:id', PostController.read)
router.post('/api/post', PostController.create)
router.put('/api/post/:id', PostController.update)
router.delete('/api/post/:id', PostController.remove)

module.exports = router