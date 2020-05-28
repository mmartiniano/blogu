/*
* Integrity Error
*
* Fired when integrity of server resouces is threatend.
*
* 'code' stands for HTTP response code. Setted as
* 409 (Conflict) by default.
*/

class IntegrityError extends Error {  
    constructor (message = 'Conflict', code = 409) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

IntegrityError.CODE = 409
IntegrityError.MESSAGE = 'Conflict'
IntegrityError.DUPLICATED_USERNAME = 'Username already taken'

module.exports = IntegrityError