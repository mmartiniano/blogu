/*
* Authentication Error
*
* Fired when authentication fails.
*
* 'code' stands for HTTP response code. Setted as
* 401 (Unauthorized) by default.
*/

class AuthenticationError extends Error {  
    constructor (message = 'Authentication failed', code = 401) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

AuthenticationError.CODE = 401
AuthenticationError.MESSAGE = 'Authentication failed'
AuthenticationError.NO_TOKEN = 'No access token'

module.exports = AuthenticationError