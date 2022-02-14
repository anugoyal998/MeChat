import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../../../atoms/authState";
import currentChatState from "../../../atoms/currentChatState";
import { getAllUsers } from "../../../http";
import errorHandler from "../../../utils/errorHandler";
import Editor from "./Editor";
import MsgNavbar from "./MsgNavbar";
import ShowMessages from "./ShowMessages";

const Message = () => {
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState);
  const { user } = useRecoilValue(authState);
  useEffect(() => {
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
  return (
    <div
      style={{ width: "calc(100vw - 300px - 0.75rem)" }}
      className="h-screen py-3"
    >
      <div
        className="w-full h-full bg-myGray2 rounded-lg overflow-y-scroll scrollbar-hide"
        id="message"
      >
        <MsgNavbar />
        <ShowMessages parentHeight={parentHeight} />
        <Editor />
      </div>
    </div>
  );
};

export default Message;
