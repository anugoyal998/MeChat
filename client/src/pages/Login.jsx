import React from "react";
import vector from "../img/login-copy.png";
import logo from "../img/logo-lg.png";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth as googleAuth } from "../firebase";
import { login } from "../http";
import Cookies from "js-cookie";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const handleClick = () => {
    signInWithPopup(googleAuth, googleProvider).then(async (response) => {
      const user = {
        name: response?.user?.displayName,
        email: response?.user?.email,
        avatar: response?.user?.photoURL,
      };
      try {
        const { data } = await login(user);
        Cookies.set("accessToken", data?.tokens?.at);
        Cookies.set("refreshToken", data?.tokens?.rt);
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Error");
      }
    });
  };
  return (
    <div className="flex w-screen h-screen">
      <div className="flex justify-center items-center flex-col bg-white w-[100vw] md:w-[50vw] h-screen">
        <img src={logo} alt="" />
        <p className="text-gray-900 font-semibold text-4xl">Welcome back!!</p>
        <GoogleButton onClick={handleClick} />
      </div>
      <img src={vector} alt="" className="w-[50vw] h-screen hidden md:block " />
    </div>
  );
};

export default Login;
