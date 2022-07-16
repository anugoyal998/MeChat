import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {activeUsersState,currentChatState,authState} from "../../../atoms";
import avatar from "../../../img/avatar.png";
import {BiArrowBack} from 'react-icons/bi'

const MsgNavbar = ({flag,setFlag}) => {
  const currentChat = useRecoilValue(currentChatState);
  const activeUsers = useRecoilValue(activeUsersState);
  const {user}  = useRecoilValue(authState);
  const [status, setStatus] = useState("Offline");
  useEffect(() => {
	  const find = activeUsers?.find(e=> e?.user?._id === currentChat?._id)
	  if(find)setStatus('Online');
	  else setStatus('Offline');
  }, [activeUsers,currentChat,user]);
  return (
    <>
    <div
      className="px-5 hidden sm:flex items-center space-x-3 shadow-md fixed faded-bg h-20 rounded-lg z-10"
      style={{ width: "calc(100vw - 300px - 0.75rem)" }}
    >
      <img
        src={currentChat?.avatar ? currentChat.avatar : avatar}
        alt="avatar"
        className="w-14 h-14 rounded-full cursor-pointer"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold">{currentChat?.name}</p>
        <p>{status}</p>
      </div>
    </div>
    <div
      className="px-5 flex sm:hidden items-center space-x-3 shadow-md fixed faded-bg h-20 rounded-lg z-10"
      style={{ width: "calc(100vw - 2*0.75rem)" }}
    >
      <div onClick={()=> setFlag(false)} ><BiArrowBack className="text-2xl cursor-pointer"/></div>
      <img
        src={currentChat?.avatar ? currentChat.avatar : "https://cdn-icons-png.flaticon.com/512/147/147144.png"}
        alt="avatar"
        className="w-14 h-14 rounded-full cursor-pointer"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold">{currentChat?.name}</p>
        <p>{status}</p>
      </div>
    </div>
    </>
  );
};

export default MsgNavbar;
