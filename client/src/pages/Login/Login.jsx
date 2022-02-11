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
  const [phone, setPhone] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  return (
    <Wrapper>
      <div className="flex-center-center col-span-2">
        <img
          src={loginVector}
          alt="loginVector"
          className="transform scale-125"
        />
      </div>
      {!flag && (
        <Before
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          setAuth={setAuth}
          setFlag={setFlag}
        />
      )}
      {flag && <After otp={otp} setOtp={setOtp} />}
    </Wrapper>
  );
};

const Wrapper = tw.div`
    w-screen h-screen grid grid-cols-3 px-[10rem]
`;

export default Login;
