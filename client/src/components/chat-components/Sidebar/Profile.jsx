import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRecoilState } from "recoil";
import authState from "../../../atoms/authState";
import { handleAvatarChange } from "../../../functions/sidebar/updateUser";
import PrimaryBtn from "../../PrimaryBtn";
import Searchbar from "../../Searchbar";
import avatar from "../../../img/avatar.png";

const Profile = ({ settingFlag, search, setSearch }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const { user } = auth;
  const handleAvatarChangeClick = async (e) => {
    await handleAvatarChange(e, setAuth);
  };
  return (
    <div className="flex-center-center flex-col">
      <label htmlFor="avatar-upload">
        <img
          src={user?.avatar ? user?.avatar : avatar}
          alt="avatar"
          className="w-32 rounded-full h-32 cursor-pointer"
        />
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        name="file"
        id="avatar-upload"
        onChange={handleAvatarChangeClick}
      />
      <p className="text-2xl mt-1 font-bold">{user?.name}</p>
      <PrimaryBtn>
        <span>available</span> <FaChevronDown className="text-sm mt-1" />
      </PrimaryBtn>
      <Searchbar
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        classes="w-full mt-4"
        hidden={settingFlag && "true"}
      />
    </div>
  );
};

export default Profile;
