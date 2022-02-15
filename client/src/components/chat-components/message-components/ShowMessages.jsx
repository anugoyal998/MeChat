import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import currentChatState from "../../../atoms/currentChatState";
import msgFunctions from "../../../functions/msgFunctions";
import Moment from "react-moment";
import useSocket from "../../../hooks/useSocket";
import authState from "../../../atoms/authState";
import newMsgState from "../../../atoms/newMsgState";

const ShowMessages = ({ parentHeight, scrollRef }) => {
  const [msgs, setMsgs] = useState([]);
  const {user} = useRecoilValue(authState);
  const currentChat = useRecoilValue(currentChatState);
  const [incomingMessage,setIncomingMessage] = useState(null);
  const newMsg = useRecoilValue(newMsgState)
  const socket = useSocket()
  useEffect(() => {
    async function fetch() {
      await msgFunctions.getMsgs(currentChat?._id, setMsgs);
    }
    fetch();
  }, [currentChat,user,newMsg]);
  useEffect(() => {
	  socket?.current.on('getMessage',data=> {
		  setIncomingMessage({
			  createdAt: Date.now(),
			  msg: data?.msg,
			  msgType: data?.msgType,
			  sender: data?.sender,
			  reciever: currentChat?._id
		  })
	  })
  },[socket])
  useEffect(() => {
	  incomingMessage && setMsgs(prev=> [...prev, incomingMessage])
  },[incomingMessage, currentChat]);
  return (
    <div
      id="show-messages"
      className={`mt-20 px-5 flex flex-col space-y-3 py-2 z-0`}
    >
      {msgs?.map((msg, index) => {
        return <Card key={index} data={msg} currentChat={currentChat} />;
      })}
      <div className="h-[70px] w-full"></div>
    </div>
  );
};

const Card = ({ data, currentChat }) => {
  return (
    <div
      className={`flex ${
        currentChat?._id === data?.reciever ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-[60%] p-3 ${
          currentChat?._id === data?.reciever ? "bg-myGray3" : "bg-white"
        } rounded-xl shadow-sm cursor-pointer hover:opacity-80 animation`}
      >
        {data?.msgType === "Text" && <p>{data?.msg}</p>}
        <div className="flex justify-end">
          <Moment
            fromNow={true}
            className="text-xs font-[600] mt-[2px] text-gray-700"
          >
            {data?.createdAt}
          </Moment>
        </div>
      </div>
    </div>
  );
};

export default ShowMessages;