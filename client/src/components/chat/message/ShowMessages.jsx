import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentChatState, authState } from "../../../atoms";
import msgFunctions from "../../../functions/msgFunctions";

const ShowMessages = ({
  parentHeight,
  scrollRef,
  msgs,
  setMsgs,
  socket,
  newMsgFlag,
  setNewMsgFlag,
}) => {
  const { user } = useRecoilValue(authState);
  const currentChat = useRecoilValue(currentChatState);
  const [flag, setFlag] = useState(false)
  const ref = useRef();
  useEffect(() => {
    async function fetch() {
      await msgFunctions.getMsgs(currentChat?._id, setMsgs, setFlag);
    }
    fetch();
  }, [currentChat, user, newMsgFlag,flag]);
  useEffect(() => {
    socket?.current?.on("rec-msg", (data) => {
      setFlag(true)
      setNewMsgFlag((prev) => !prev);
    });
  }, []);
  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <div
      id="show-messages"
      className={`mt-20 overflow-y-scroll scrollbar-hide`}
      style={{ height: "calc(100vh - 80px - 100px)" }}
      ref={ref}
    >
      <div
        className="px-2 sm:px-5 flex flex-col space-y-3 py-2 z-0"
        id="msg-div"
      >
        {msgs?.map((msg, index) => {
          return <Card key={index} data={msg} currentChat={currentChat} />;
        })}
      </div>
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
        className={`w-[95%] md:w-[60%] p-3 ${
          currentChat?._id === data?.reciever ? "bg-myGray3" : "bg-white"
        } rounded-xl shadow-sm cursor-pointer hover:opacity-80 animation`}
      >
        {data?.msgType === "Text" && <p className="break-words">{data?.msg}</p>}
        <div className="flex justify-end">
          {/* <Moment
            fromNow={true}
            className="text-xs font-[600] mt-[2px] text-gray-700"
          >
            {data?.createdAt}
          </Moment> */}
        </div>
      </div>
    </div>
  );
};

export default ShowMessages;
