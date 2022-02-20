import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import activeUsersState from "./atoms/activeUsersState";
import authState from "./atoms/authState";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import useSocket from "./hooks/useSocket";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";

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
  console.log(auth?.user)
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default App;
