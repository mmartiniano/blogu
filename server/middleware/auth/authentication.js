/* 
* JWT-based authentication
*/

const jwt = require('jsonwebtoken')
const AuthenticationError = require('../../error/authentication.error')


// Validade access token
const verifyToken = (request, response, next) => {

    let token

    try {

        token = request.headers['authorization'].split(' ')[1]

    }
    catch (error) {

        return response.status(AuthenticationError.CODE).json([AuthenticationError.NO_TOKEN])

    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error)
            return response.status(AuthenticationError.CODE).json([AuthenticationError.MESSAGE])

        request.userId = decoded.id

        next()
    })
    
}

module.exports = { verifyToken }