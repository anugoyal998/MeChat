import { logout, updateAvatar, updateName } from "../http";
import errorHandler from "../utils/errorHandler";
import cloudinary from "./cloudinary";
import Cookies from 'js-cookie'

export const handleAvatarChange = async (e,setAuth) => {
  await errorHandler(async () => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "mechat");
    const data = await cloudinary.uploadImageToCloudinary(formData);
    await updateAvatar({ avatar: data });
    setAuth((prev) => ({ ...prev, user: { ...prev.user, avatar: data } }));
  }, `client\src\components\chat-components\SidebarUpper.jsx`);
};


export const handleNameChange = async (change, setAuth, setFlag) => {
  if (!change || change?.length < 3) {
    alert("Name should be at least 3 characters!!");
    return;
  }
  await errorHandler(async () => {
    await updateName({ name: change });
    setAuth((prev) => ({ ...prev, user: { ...prev?.user, name: change } }));
    setFlag(false)
  }, `client\src\components\chat-components\Sidebar\Settings.jsx`);
};

export const handleLogout = async () => {
  await errorHandler(async () => {
    await logout()
    Cookies.remove('at')
    Cookies.remove('rt')
    window.location.reload()
  },`client\src\components\chat-components\Sidebar\Settings.jsx`)
}