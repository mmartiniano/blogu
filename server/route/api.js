/*
* This module defines the server responses for API REQUESTS.
*/

// Import
const express = require('express') // Express
const Auth = require('../auth') // Access manager
const UserController = require('../control/user_controller') // User controller
const PostController = require('../control/post_controller') // Post controller

// Express.Router object
const router = express.Router()

// Authenctication routes
router.post('/api/auth/signup', UserController.signup)
router.post('/api/auth/signin', UserController.signin)

// User routes
router.get('/api/user', UserController.list)
router.get('/api/user/:id', UserController.read)
router.put('/api/user/:id', Auth.verifyToken, Auth.isOwner, UserController.update)
router.delete('/api/user/:id', Auth.verifyToken, Auth.isOwner, UserController.remove)

// Post routes
router.get('/api/post', PostController.list)
router.get('/api/post/:id', PostController.read)
router.post('/api/post', Auth.verifyToken, PostController.create)
router.put('/api/post/:id', Auth.verifyToken, Auth.isAuthor, PostController.update)
router.delete('/api/post/:id', Auth.verifyToken, Auth.isAuthor, PostController.remove)

module.exports = router