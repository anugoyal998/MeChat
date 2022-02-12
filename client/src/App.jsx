import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authState from "./atoms/authState";
import {useLoadingWithRefresh} from './hooks/useLoadingWithRefresh'
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";

const App = () => {
  const {loading} = useLoadingWithRefresh()
  const auth = useRecoilValue(authState)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={auth && auth?.user ? <Navigate to="/chat" /> : <Login />} />
          <Route path="/chat" element={auth && auth?.user ? <Chat/> : <Navigate to="/" />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
