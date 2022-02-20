import errorHandler from "../../utils/errorHandler";
import Cookies from "js-cookie";
import { saveUser } from "../../http";

export const loginSuccess = async (res, setAuth, navigate) => {
  const profile = res.profileObj;
  const user = {
    name: profile?.name,
    avatar: profile?.imageUrl,
    email: profile?.email,
  };
  await errorHandler(async () => {
    const { data } = await saveUser(user);
    setAuth((prev) => ({
      ...prev,
      user: {
        _id: data?.user?._id,
        name: data?.user?.name,
        email: data?.user?.email,
        avatar: data?.user?.avatar,
      },
    }));
    Cookies.set("at", data?.tokens?.at, { expires: 1 });
    Cookies.set("rt", data?.tokens?.rt, { expires: 7 });
    navigate("/chat");
    window.location.reload();
  }, `client\src\pages\Login\Login.jsx`);
};

export const loginFailure = (res) => {
  console.log(res);
};
