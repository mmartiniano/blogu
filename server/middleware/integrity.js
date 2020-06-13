/*
* Keep Blogu integrity
*
* Verify if request threat server integrity
*/

const UserService = require('../service/user.service')
const IntegrityError = require('../error/integrity.error')
const Config = require('../config')


/* Check if username is a reserved word */
const reservedWords = (request, response, next) => {
    if (Config.reservedWords.includes(request.body.username))
        return response.status(IntegrityError.CODE).json([IntegrityError.DUPLICATED_USERNAME])

    next()
}

/* Check if user satisfies User collection uniqueness integrity*/
const userUniqueness = async (request, response, next) => {

    const currentUserId = request.userId || undefined
    const username = request.body.username

    if (! await usernameUniqueness(username, currentUserId))
        return response.status(IntegrityError.CODE).json([IntegrityError.DUPLICATED_USERNAME])

    next()
}

module.exports = { reservedWords, userUniqueness }

/*
*  Check username duplicates
*
* There are two cases:
*   1. New users. So it is needy to test if username hasn't already been taken.
*   2. Current users. So it is needy to check if username is available or if
*      who is using it is the user itself.
* 
* Since test result comes out as a Promise, functions that use this test
* should be async
*/
const usernameUniqueness = (username, currentUserId) => {
    return new Promise( resolve => {
        UserService.getByUsername(username, (error, user) => {

            // If username is not free to use
            if (user) {
                // If user is an already registred user
                if (currentUserId) {
                    // If who is using username is not the current user
                    if (currentUserId != user._id.toString())
                        resolve(false)
                }
                else 
                    resolve(false)
            }

            resolve(true)
        })
    })
}