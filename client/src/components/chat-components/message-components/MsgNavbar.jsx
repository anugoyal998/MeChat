import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import activeUsersState from "../../../atoms/activeUsersState";
import currentChatState from "../../../atoms/currentChatState";
import avatar from "../../../img/avatar.png";

const MsgNavbar = () => {
  const currentChat = useRecoilValue(currentChatState);
  const activeUsers = useRecoilValue(activeUsersState);
  const [status, setStatus] = useState("Offline");
  useEffect(() => {
    setStatus(
      activeUsers?.find(
        (activeUser) => activeUser?.user?._id === currentChat?._id
      )
        ? "Online"
        : "Offline"
    );
  }, [activeUsers,currentChat]);
  return (
    <div
      className="px-5 flex items-center space-x-3 shadow-md fixed faded-bg h-20 rounded-lg z-10"
      style={{ width: "calc(100vw - 300px - 2*0.75rem + 1px)" }}
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
  );
};

export default MsgNavbar;
