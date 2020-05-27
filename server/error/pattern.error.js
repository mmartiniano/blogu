/*
* Pattern Error
*
* Fired when request data does not follow blogu pattern
*
* 'code' stands for HTTP response code. Setted as
* 403 (Forbiden) by default.
*/

class PatternError extends Error {  
    constructor (message = 'Pattern not followed', code = 403) {
        super(message)

        this.code = code
        this.name = this.constructor.name
    }
}

PatternError.CODE = 403
PatternError.MESSAGE = 'Pattern not followed'
PatternError.USERNAME = 'Username should only contain alphanumerics or underscores'
PatternError.ID = 'Ill formed id'

module.exports = PatternError