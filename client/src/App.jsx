import React, { useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { activeUsersState, authState } from "./atoms";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import useSocket from "./hooks/useSocket";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

const App = () => {
  const { loading } = useLoadingWithRefresh();
  const auth = useRecoilValue(authState);
  const [activeUsers, setActiveUsers] = useRecoilState(activeUsersState);
  const [newMsgFlag, setNewMsgFlag, socket] = useSocket();
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={auth && auth?.user ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/chat"
          element={
            auth && auth?.user ? (
              <Chat
                newMsgFlag={newMsgFlag}
                setNewMsgFlag={setNewMsgFlag}
                socket={socket}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
