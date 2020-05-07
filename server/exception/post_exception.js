/*
* Post Exception
*
* Used to express error during database
* communication process to access Post collection.
*
* 'code' stands for HTTP response code. Setted as
* 500 (Internal Servere error) by default.
*/
class PostException extends Error {  
    constructor (message = 'Unhandled Post Exception', code = 500) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

module.exports = PostException