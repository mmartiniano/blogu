// Import mongoose id parser
const IdParser = require('mongoose').Types.ObjectId

/*
* Check if id is ill formed.
*
* @param: id: model id
*/
function illFormedId(id) {
    try {
        IdParser(id)
    } catch (exception) {
        return true
    }

    return false
}

module.exports = illFormedId