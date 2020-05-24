/*
* Authentication Exception
*
* Fired when authentication fails.
*
* 'code' stands for HTTP response code. Setted as
* 401 (Unauthorized) by default.
*/

class AuthenticationException extends Error {  
    constructor (message = 'Authentication failed', code = 401) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

module.exports = AuthenticationException