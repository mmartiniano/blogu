const { generateToken, verifyToken } = require('./authentication')
const { isOwner, isAuthor } = require('./authorization')

module.exports = { generateToken, verifyToken, isOwner, isAuthor }