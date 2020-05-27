/*
* User Error
*
* Used to express error during database
* communication process to access User collection.
*
* 'code' stands for HTTP response code. Setted as
* 500 (Internal Servere error) by default.
*/
class UserError extends Error {  
    constructor (message = 'Unhandled User Error', code = 500) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

UserError.CREATE = 'Failed to create user'
UserError.GET = 'Failed to get user'
UserError.LIST = 'Failed to list user'
UserError.UPDATE = 'Failed to update user'
UserError.DELETE = 'Failed to delete user'

module.exports = UserError