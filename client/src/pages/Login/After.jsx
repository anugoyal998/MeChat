import React from "react";
import tw from "tailwind-styled-components";
import Input from "../../components/Input";

const After = (props) => {
  const { otp, setOtp } = props;
  return (
    <div className="flex-center-center flex-col">
      <WelcomeText>Welcome to ChatApp</WelcomeText>
      <LoginText>Verify to get started...</LoginText>
      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        type="text"
        placeholder="Enter Otp"
        margin="true"
        classes="mt-5"
      />
      <LoginButton>Login</LoginButton>
    </div>
  );
};

const LoginText = tw.p`
	text-center text-lg font-semibold text-myBlueDark
`;

const WelcomeText = tw.p`
	text-center text-4xl font-bold text-myBlueDark
`;

const LoginButton = tw.button`
	bg-myBlueDark text-white py-3 w-full rounded-3xl text-lg font-bold mt-4 hover:opacity-90 animation
`;

export default After;
