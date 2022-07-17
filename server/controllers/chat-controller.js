const chatService = require("../services/chat-service");
const userService = require("../services/user-service");

class ChatController{
    async getAllUsers(req, res){
        let users = await userService.allUsers()
        if(!users){
            return res.status(400).json({ msg: "error" });  
        }
        return res.status(200).json({users, auth: true})
    }
    async sendMsg(req, res){
        const sender = req.user?._id
        const {reciever, msg, msgType} = req.body
        if(!sender || !reciever || !msg || !msgType){
            return res.status(400).json({ msg: "error" });  
        }
        const createdMsg = await chatService.createMsg({sender, reciever, msg, msgType})
        return res.status(200).json({ createdMsg })
    }
    async getMsgs(req, res){
        const {reciever} = req.body
        const sender = req.user?._id
        if(!sender || !reciever){
            return res.status(400).json({ msg: "error" });  
        }
        const msgs1 = await chatService.findMsg({sender, reciever})
        const msgs2 = await chatService.findMsg({sender: reciever,reciever: sender})
        const msgs = msgs1.concat(msgs2)
        return res.status(200).json({ msgs })
    }
}

module.exports = new ChatController();