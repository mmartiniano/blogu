const { verifyToken } = require('./authentication')
const { isOwner, isAuthor } = require('./authorization')

/*
* Should be used if and only if Auth
* is ok and there's no next in router stack
*/
const OK = (request, response) => {
    return response.status(200).send()
}

module.exports = { verifyToken, OK, isOwner, isAuthor }