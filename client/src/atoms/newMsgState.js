import { atom } from "recoil";

const newMsgState = atom({
    key: "newMsgState",
    default: false
})

export default newMsgState