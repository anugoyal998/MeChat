import Cookies from "js-cookie";
import { saveUser, saveUserEmailAndPassword } from "../http";

export const login = async (user, setAuth, navigate, toast) => {
  try {
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
    toast.success('Login Success')
    navigate("/chat");
    window.location.reload();
  } catch (error) {
    toast.error('Error occurred')
    console.log(error);
  }
};

export const loginWithEmailAndPassword = async (user,setAuth, navigate, toast) => {
  try {
    const { data } = await saveUserEmailAndPassword(user);
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
    toast.success('Login Success')
    navigate("/chat");
    window.location.reload();
  } catch (error) {
    toast.error('Incorrect Email or Password')
    console.log(error); 
  }
}
