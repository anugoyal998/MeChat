import React from 'react'
import GoogleLogin from "react-google-login";
import { loginFailure, loginSuccess } from '../../functions/auth/auth';
import loginVector from '../../img/login-copy.png'
import logo from '../../img/logo-lg.png'
import {useRecoilState} from 'recoil'
import authState from '../../atoms/authState'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [auth,setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
    const handleLoginSuccess = async (res)=> {
        await loginSuccess(res,setAuth, navigate)
    }
  return (
    <div className="flex w-screen h-screen">
        <div
          className="flex justify-center items-center flex-col bg-white w-[50vw] h-screen"
        >
          <img src={logo} alt="" />
          <p className="text-gray-900 font-semibold text-4xl">Welcome back!!</p>
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GCID}`}
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={loginFailure}
            cookiePolicy={"single_host_origin"}
            className="w-[300px] my-2"
          />
        </div>
        <img
          src={loginVector}
          alt=""
          className="w-[50vw] h-screen"
        />
      </div>
  )
}

export default Login