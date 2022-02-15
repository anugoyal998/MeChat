import React, { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../../../atoms/authState";
import currentChatState from "../../../atoms/currentChatState";
import newMsgState from "../../../atoms/newMsgState";
import msgFunctions from "../../../functions/msgFunctions";
import useSocket from "../../../hooks/useSocket";

const Editor = () => {
  const [msg, setMsg] = useState("");
  const currentChat = useRecoilValue(currentChatState);
  const {user} = useRecoilValue(authState);
  const socket = useSocket()
  const [newMsg,setNewMsg] = useRecoilState(newMsgState)
  const sendMsg = async (e) => {
    await msgFunctions.sendMsg(e, msg,user?._id, currentChat?._id, "Text", setMsg,socket,setNewMsg);
  };
  return (
    <div
      className="absolute bottom-[11px] pb-2 rounded-lg bg-myGray2"
      style={{ width: "calc(100vw - 300px - 1.5rem)" }}
    >
      <div className="mx-5 bg-white h-16 rounded-xl py-3 px-5 flex justify-between space-x-3 items-center shadow-lg ">
        <input
          type="text"
          placeholder="Write your message..."
          className="w-full text-lg no-outline"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={sendMsg}
        />
        <div className="flex items-center space-x-2">
          <div>
            <FiPaperclip className="text-2xl cursor-pointer animation hover:scale-125 opacity-60" />
          </div>
          <button
            className="h-10 w-12 bg-myBlueDark flex-center-center rounded-lg"
            onClick={sendMsg}
          >
            <div>
              <IoIosSend className="text-2xl text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
