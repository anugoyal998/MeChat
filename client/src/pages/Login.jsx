import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import logo from "../img/logo-lg.png";
import { useRecoilState } from "recoil";
import { authState } from "../atoms";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { login, loginWithEmailAndPassword } from "../functions/auth";

const Login = () => {
  const arr = useRecoilState(authState);
  const setMyAuth = arr[1];
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (response) => {
        await login(
          {
            name: response.user.displayName,
            avatar: response.user.photoURL,
            email: response.user.email,
          },
          setMyAuth,
          navigate,
          toast
        );
      })
      .catch((err) => {
        toast.error('Error occurred')
        console.log(err);
      });
  };
  const handleEmailLogin = async () => {
    if (!state.name || !state.email || !state.password) {
      toast.error("All fields are required");
      return;
    }
    // adding avatar
    setState((prev) => ({
      ...prev,
      avatar: `https://avatars.dicebear.com/api/open-peeps/${
        state.name || "avatar"
      }.svg`,
    }));
    try {
      await loginWithEmailAndPassword(state,setMyAuth,navigate,toast)
    } catch (error) {
      toast.error('Error occurred')
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen bg-myGray2 flex items-center justify-center">
      <Toaster />
      <div className="min-w-[700px] min-h-[500px] bg-white rounded-lg shadow-2xl boxShadow flex justify-center items-center flex-col px-40">
        <img alt="logo" src={logo} />
        <p className="text-xl font-semibold pb-6">Welcome back!!</p>
        <button
          className="w-full px-4 py-[0.4rem] border-2 border-black rounded-3xl flex justify-center items-center space-x-2"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-xl" />
          <span>Login with Google</span>
        </button>
        <span className="my-4 w-8 h-8 rounded-full border-2 border-black flex justify-center items-center">
          Or
        </span>
        <div className="w-full flex justify-center items-center flex-col space-y-3">
          <input
            type="name"
            placeholder="Name"
            className="w-full px-4 py-[0.4rem] border-2 border-black rounded-3xl"
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-[0.4rem] border-2 border-black rounded-3xl "
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-[0.4rem] border-2 border-black rounded-3xl "
            onChange={(e) =>
              setState((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-center items-center space-x-2">
              <input type="radio" />
              <p className="text-sm font-semibold">Remember Me</p>
            </div>
            <button className="text-sm text-myBlueDark font-semibold">
              Forgot Password
            </button>
          </div>
          <button
            className="w-full px-4 py-[0.4rem] border-2 text-white rounded-3xl bg-myBlueDark"
            onClick={handleEmailLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
