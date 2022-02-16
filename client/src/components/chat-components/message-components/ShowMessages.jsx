import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import currentChatState from "../../../atoms/currentChatState";
import msgFunctions from "../../../functions/msgFunctions";
import Moment from "react-moment";
import authState from "../../../atoms/authState";

const ShowMessages = ({ parentHeight, scrollRef, msgs, setMsgs, socket, newMsgFlag, setNewMsgFlag}) => {
  const { user } = useRecoilValue(authState);
  const currentChat = useRecoilValue(currentChatState);
  const ref = useRef()
  useEffect(() => {
    async function fetch() {
      await msgFunctions.getMsgs(currentChat?._id, setMsgs);
    }
    fetch();
  }, [currentChat, user,newMsgFlag]);
  useEffect(() => {
    socket?.current?.on("rec-msg", (data) => {
      // console.log(data)
      setNewMsgFlag(prev=> !prev)
    });
  }, []);
  useEffect(()=> {
    if(ref){
      ref.current.addEventListener("DOMNodeInserted",event=> {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      })
    }
  },[])
  return (
    <div
      id="show-messages"
      className={`mt-20 px-5 flex flex-col space-y-3 py-2 z-0 overflow-y-scroll scrollbar-hide`}
      style={{height: 'calc(100vh - 80px - 100px)'}}
      ref={ref}
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
        className={`w-[90%] md:w-[60%] p-3 ${
          currentChat?._id === data?.reciever ? "bg-myGray3" : "bg-white"
        } rounded-xl shadow-sm cursor-pointer hover:opacity-80 animation`}
      >
        {data?.msgType === "Text" && <p className="break-words">{data?.msg}</p>}
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