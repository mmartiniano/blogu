/* 
* JWT-based authentication
*/

const jwt = require('jsonwebtoken')
const AuthenticationException = require('../exception/authentication_exception')

const generateToken = (user) => {
    return jwt.sign( {id: user._id}, process.env.SECRET, { expiresIn: '1d'})
}

// Validade access token
const verifyToken = (request, response, next) => {

    let token

    try {

        token = request.headers['authorization'].split(' ')[1]

    }
    catch (error) {

        const exception = new AuthenticationException('No access token provided')
        return response.status(exception.code).json([exception.message])

    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            const exception = new AuthenticationException()
            return response.status(exception.code).json([exception.message])
        }

        request.userId = decoded.id

        next()
    })
    
}

module.exports = { generateToken, verifyToken }