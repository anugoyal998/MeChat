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
            const {data} = await getMsgs({reciever})
            let msgs = data?.msgs
            msgs.sort((a,b) => {
                let x = a.createdAt
                let y = b.createdAt
                if(x<y)return -1;
                if(x>y)return 1;
                return 0;
            })
            setMsgs(msgs)
        },`client\src\components\chat-components\message-components\ShowMessages.jsx`)
    }
}

export default new MsgFunctions();