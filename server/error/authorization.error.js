/*
* Authorization Error
*
* Fired when authorization fails.
*
* 'code' stands for HTTP response code. Setted as
* 403 (Forbidden) by default.
*/

class AuthorizationError extends Error {  
    constructor (message = 'Authorization failed', code = 401) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

AuthorizationError.CODE = 401
AuthorizationError.MESSAGE = 'Authorization failed'

module.exports = AuthorizationError