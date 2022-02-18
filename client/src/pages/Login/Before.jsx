import React from "react";
import tw from "tailwind-styled-components";
import { sendOtp } from "../../http";
import Input from "../../components/Input";
import errorHandler from "../../utils/errorHandler";

const Before = (props) => {
  const { name, setName, email, setEmail, setAuth, setFlag } = props;
  const handleLoginClick = async () => {
    if (!name || !email) {
      alert("All fields are required");
      return;
    }
    await errorHandler(async ()=> {
      const { data } = await sendOtp({ email });
      console.log(data)
      setAuth((prev) => ({ ...prev, otp: data }));
      setFlag(true);
    },`client\src\pages\Login\Before.jsx`)
  };
  return (
    <div className="flex-center-center flex-col">
      <WelcomeText>Welcome to ChatApp</WelcomeText>
      <LoginText>Login to get started...</LoginText>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        margin="true"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        margin="true"
        classes="mt-5"
      />
      {/* <div className="flex justify-end w-full">
        <FPText>Forgot Password?</FPText>
      </div> */}
      <LoginButton onClick={handleLoginClick}>Login</LoginButton>
    </div>
  );
};

const FPText = tw.p`
	font-semibold text-myBlueDark cursor-pointer
`;

const LoginText = tw.p`
	text-center text-lg font-semibold text-myBlueDark
`;

const WelcomeText = tw.p`
	text-center text-4xl font-bold text-myBlueDark
`;

const LoginButton = tw.button`
	bg-myBlueDark text-white py-3 w-full rounded-3xl text-lg font-bold mt-4 hover:opacity-90 animation
`;

export default Before;
