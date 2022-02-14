import { getMsgs, sendMsg } from "../http";
import errorHandler from "../utils/errorHandler";

class MsgFunctions{
    async sendMsg(e,msg,reciever,msgType,setMsg){
        if (!msg) return;
        if ((e.type === "keypress" && e.key === "Enter") || e.type === "click") {
            await errorHandler(async () => {
                const {data} = await sendMsg({reciever, msg, msgType})
                setMsg('')
            },`client\src\components\chat-components\message-components\Editor.jsx`);
        }
    }
    async getMsgs(reciever,setMsgs){
        await errorHandler(async () => {
            const {data} = await getMsgs({reciever});
            setMsgs(data)
        },`client\src\components\chat-components\message-components\ShowMessages.jsx`)
    }
}

export default new MsgFunctions();