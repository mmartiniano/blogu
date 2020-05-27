const { generateToken, verifyToken } = require('./authentication')
const { isOwner, isAuthor } = require('./authorization')

module.exports = { verifyToken, isOwner, isAuthor }