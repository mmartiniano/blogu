/*
* This module defines the server responses for API REQUESTS.
*/

// Import
const express = require('express') // Express
const Auth = require('../middleware/auth') // Access manager
const Mounting = require('../middleware/mounting') // Entity mount validator
const Pattern = require('../middleware/pattern') // Pattern validator
const Integrity = require('../middleware/integrity') // Integrity keeper
const UserController = require('../control/user.controller') // User controller
const PostController = require('../control/post.controller') // Post controller

// Express.Router object
const router = express.Router()

// Authenctication routes
router.post('/api/auth/signup', Mounting.requiredToRegisterUser, Pattern.user, Integrity.reservedWords, Integrity.userUniqueness, UserController.signup)
router.post('/api/auth/signin', Mounting.requiredToSignin, UserController.signin)

// User routes
router.get('/api/user', UserController.list)
router.get('/api/user/:id', Pattern.id, UserController.read)
router.get('/api/user/:id/posts', Pattern.id, UserController.posts)
router.put('/api/user/:id', Pattern.id, Auth.verifyToken, Auth.isOwner, Pattern.user, Integrity.reservedWords, Integrity.userUniqueness, UserController.update)
router.delete('/api/user/:id', Pattern.id, Auth.verifyToken, Auth.isOwner, UserController.remove)

// Post routes
router.get('/api/post', PostController.list)
router.get('/api/post/:id', Pattern.id, PostController.read)
router.post('/api/post', Auth.verifyToken, Mounting.requiredToPublishPost, PostController.create)
router.put('/api/post/:id', Pattern.id, Auth.verifyToken, Auth.isAuthor, Mounting.requiredToEditPost, PostController.update)
router.delete('/api/post/:id', Pattern.id, Auth.verifyToken, Auth.isAuthor, PostController.remove)

module.exports = router