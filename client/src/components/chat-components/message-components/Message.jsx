import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../../../atoms/authState";
import currentChatState from "../../../atoms/currentChatState";
import { getAllUsers } from "../../../http";
import errorHandler from "../../../utils/errorHandler";
import Editor from "./Editor";
import MsgNavbar from "./MsgNavbar";
import ShowMessages from "./ShowMessages";

const Message = ({ flag, setFlag, socket, newMsgFlag, setNewMsgFlag }) => {
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState);
  const [msgs, setMsgs] = useState([]);
  const { user } = useRecoilValue(authState);
  useEffect(() => {
    if (currentChat) return;
    async function fetch() {
      await errorHandler(async () => {
        const { data } = await getAllUsers();
        let users = data.users?.filter((e) => e._id !== user._id);
        setCurrentChat(users[0]);
      }, `client\src\components\chat-components\ShowPeople.jsx`);
    }
    fetch();
  }, []);
  const ele = document.getElementById("message");
  const parentHeight = ele?.offsetHeight;
  const scrollRef = useRef();
  return (
    <>
      <div
        style={{ width: "calc(100vw - 300px - 0.75rem)" }}
        className="h-screen py-3 hidden sm:inline-flex "
      >
        <div
          className="w-full h-full bg-myGray2 rounded-lg overflow-y-scroll scrollbar-hide"
          id="message"
          ref={scrollRef}
        >
          <MsgNavbar />
          <ShowMessages
            newMsgFlag={newMsgFlag}
            setNewMsgFlag={setNewMsgFlag}
            socket={socket}
            parentHeight={parentHeight}
            scrollRef={scrollRef}
            msgs={msgs}
            setMsgs={setMsgs}
          />
          <Editor
            newMsgFlag={newMsgFlag}
            setNewMsgFlag={setNewMsgFlag}
            socket={socket}
            msgs={msgs}
            setMsgs={setMsgs}
          />
        </div>
      </div>
      <div className="h-screen py-3 w-screen sm:hidden">
        <div
          className="w-full h-full bg-myGray2 rounded-lg overflow-y-scroll scrollbar-hide"
          id="message"
          ref={scrollRef}
        >
          <MsgNavbar flag={flag} setFlag={setFlag} />
          <ShowMessages
            newMsgFlag={newMsgFlag}
            setNewMsgFlag={setNewMsgFlag}
            socket={socket}
            parentHeight={parentHeight}
            scrollRef={scrollRef}
            msgs={msgs}
            setMsgs={setMsgs}
          />
          <Editor
            newMsgFlag={newMsgFlag}
            setNewMsgFlag={setNewMsgFlag}
            socket={socket}
            msgs={msgs}
            setMsgs={setMsgs}
          />
        </div>
      </div>
    </>
  );
};

export default Message;
