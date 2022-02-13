const userService = require("../services/user-service");

class ChatController{
    async getAllUsers(req, res){
        let users = await userService.allUsers()
        if(!users){
            return res.status(400).json({ msg: "error" });  
        }
        return res.status(200).json({users, auth: true})
    }
}

module.exports = new ChatController();