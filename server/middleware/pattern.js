/*
* Pattern normalizer
*
* Apply defined patterns to requests data
*/

// Import mongoose id parser
const IdParser = require('mongoose').Types.ObjectId
const Config = require('../config')
const PatternError = require('../error/pattern.error')

/* Process user info and check if username is valid */
const user = (request, response, next) => {

    request.body.name = request.body.name.trim() // Remove blank spaces ate start and end
    request.body.username = request.body.username.toLowerCase()

    // Test username pattern
    if (Config.illUsername.test(request.body.username))
        return response.status(PatternError.CODE).json([PatternError.USERNAME])

    next()

}


/* Check if id is valid */
const id = (request, response, next) => {
    
    try {

        const testId = request.params.id || request.body.id
        IdParser(testId)

    } catch (error) {

        return response.status(PatternError.CODE).json([PatternError.ID])

    }

    next()
}


module.exports = { user, id }