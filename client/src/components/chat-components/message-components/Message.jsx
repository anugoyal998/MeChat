import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "../../../atoms/authState";
import currentChatState from "../../../atoms/currentChatState";
import activeUsersState from '../../../atoms/activeUsersState'
import { getAllUsers } from "../../../http";
import errorHandler from "../../../utils/errorHandler";
import Editor from "./Editor";
import MsgNavbar from "./MsgNavbar";
import ShowMessages from "./ShowMessages";
import useSocket from "../../../hooks/useSocket";

const Message = () => {
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState);
  const [activeUsers, setActiveUsers] = useRecoilState(activeUsersState);
  const { user } = useRecoilValue(authState);
  const socket = useSocket()
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
  useEffect(() => {
	  socket.current.emit('addUser',user)
	  socket.current.on('getUsers',users=> {
		  setActiveUsers(users)
	  })
  },[user])
  const ele = document.getElementById("message");
  const parentHeight = ele?.offsetHeight;
  const scrollRef = useRef()
  return (
    <div
      style={{ width: "calc(100vw - 300px - 0.75rem)" }}
      className="h-screen py-3"
    >
      <div
        className="w-full h-full bg-myGray2 rounded-lg overflow-y-scroll scrollbar-hide"
        id="message"
        ref={scrollRef}
      >
        <MsgNavbar />
        <ShowMessages parentHeight={parentHeight} scrollRef={scrollRef} />
        <Editor />
      </div>
    </div>
  );
};

export default Message;
