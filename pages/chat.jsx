import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authState, activeUsersState } from "../src/atoms";
import { useLoadingWithRefresh } from "../src/hooks/useLoadingWithRefresh";
import useSocket from "../src/hooks/useSocket";
import { useRouter } from "next/router";
import Message from "../src/components/chat/message/Message";
import Sidebar from "../src/components/chat/sidebar/Sidebar";

const Chat = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { loading } = useLoadingWithRefresh();
  const [activeUsers, setActiveUsers] = useRecoilState(activeUsersState);
  const [newMsgFlag, setNewMsgFlag, socket] = useSocket();
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!auth?.user) {
      router.push("/");
    }
  }, [auth]);
  useEffect(() => {
    if (!auth || !auth?.user) return;
    socket?.current?.emit("user-online", auth?.user);
  }, [auth, loading, socket]);
  useEffect(() => {
    socket?.current?.on("activeUsers", (data) => {
      setActiveUsers(data);
    });
  }, [socket, auth, loading]);
  return (
    <>
      <div className="px-3 hidden sm:flex">
        <Sidebar flag={flag} setFlag={setFlag} />
        <Message
          newMsgFlag={newMsgFlag}
          setNewMsgFlag={setNewMsgFlag}
          socket={socket}
        />
      </div>
      <div className="px-3 flex sm:hidden">
        {!flag && <Sidebar flag={flag} setFlag={setFlag} />}
        {flag && (
          <Message
            newMsgFlag={newMsgFlag}
            setNewMsgFlag={setNewMsgFlag}
            socket={socket}
            flag={flag}
            setFlag={setFlag}
          />
        )}
      </div>
    </>
  )
};

export default Chat;
