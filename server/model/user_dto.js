/*
* User Data Transfer Ovject
*/

class UserDTO {
    constructor(user) {
        this.id = user._id
        this.name = user.name
        this.username = user.username
        this.avatar = user.avatar
    }
}

module.exports = UserDTO