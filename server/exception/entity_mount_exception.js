/*
* Entity Mount Exception
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

class EntityMountException extends Error {  
    constructor (message = 'Required fields are not set properly', code = 403) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

module.exports = EntityMountException