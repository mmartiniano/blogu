/*
* Not Found Exception
*
* Should be used when requested ressource
* was not found.
*
* 'code' stands for HTTP response code. And it's always 404
*/
class NotFoundException extends Error {  
    constructor (message = 'Not Found') {
        super(message)

        this.code = 404
        this.name = this.constructor.name
    }
}

module.exports = NotFoundException