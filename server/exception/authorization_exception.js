/*
* Authorization Exception
*
* Fired when authorization fails.
*
* 'code' stands for HTTP response code. Setted as
* 403 (Forbidden) by default.
*/

class AuthorizationException extends Error {  
    constructor (message = 'Authorization failed', code = 401) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

module.exports = AuthorizationException