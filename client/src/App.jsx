import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { myAuth } from "./states";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {
  const loading = useAuth();
  const isAuth = myAuth((state) => state.auth.isAuth);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!isAuth ? <Login /> : <Navigate to="/chat" />}
        />
        <Route path="/chat" element={isAuth ? <Chat /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
