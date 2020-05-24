/*
* User Data Transfer Ovject
*/

class UserDTO {
    constructor(user) {
        this.id = user._id
        this.name = user.name
        this.username = user.username
        this.profile = user.profile
        this.posts = user.posts
    }
}

module.exports = UserDTO