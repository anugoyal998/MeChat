import React from "react";
import tw from "tailwind-styled-components";
import Input from "../../components/Input";
import { verifyOtp } from "../../http";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";

const After = (props) => {
  const { otp, setOtp, auth, setAuth, name } = props;
  const { phone, hash } = auth?.otp;
  const navigate = useNavigate();
  const handleLoginClick = async () => {
    if (!phone || !hash || !otp) {
      alert("Error");
      return;
    }
    await errorHandler(async () => {
      const { data } = await verifyOtp({ otp, phone, hash, name });
      setAuth((prev) => ({
        ...prev,
        user: {
          _id: data?.user?._id,
          name: data?.user?.name,
          phone: data?.user?.phone,
        },
      }));
      navigate("/chat");
    }, `client\src\pages\Login\After.jsx`);
  };
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
      <LoginButton onClick={handleLoginClick}>Login</LoginButton>
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
