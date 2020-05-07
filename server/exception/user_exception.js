/*
* User Exception
*
* Used to express error during database
* communication process to access User collection.
*
* 'code' stands for HTTP response code. Setted as
* 500 (Internal Servere error) by default.
*/
class UserException extends Error {  
    constructor (message = 'Unhandled User Exception', code = 500) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

module.exports = UserException