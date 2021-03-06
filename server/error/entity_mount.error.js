/*
* Entity Mount Error
*
* It should be used when entity (usualy models)
* mounting fails.
*
* 'code' stands for HTTP response code. Setted as
* 403 (Forbiden) by default.
*
* 403: server properly understood request but refuses
* to do what's asked.
*/

class EntityMountError extends Error {  
    constructor (message = 'Required fields are not set properly', code = 403) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

EntityMountError.CODE = 403
EntityMountError.MESSAGE = 'Required fields are not set properly'

module.exports = EntityMountError