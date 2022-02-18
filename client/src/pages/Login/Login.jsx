import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authState";
import loginVector from "../../img/login.png";
import Before from "./Before";
import After from "./After";

const Login = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  return (
    <Wrapper>
      <div className="flex-center-center">
        <img
          src={loginVector}
          alt="loginVector"
          className="hidden lg:block"
        />
      </div>
      {!flag && (
        <Before
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          setAuth={setAuth}
          setFlag={setFlag}
        />
      )}
      {flag && <After otp={otp} setOtp={setOtp} auth={auth} setAuth={setAuth} name={name} />}
    </Wrapper>
  );
};

const Wrapper = tw.div`
    w-screen h-screen flex-center-center lg:grid grid-cols-1 lg:grid-cols-2 px-[1rem] sm:px-[5rem] lg:px-[10rem]
`;

export default Login;
