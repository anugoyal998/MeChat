import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRecoilState } from "recoil";
import authState from "../../../atoms/authState";
import { handleAvatarChange } from "../../../functions/updateUser";
import { PrimaryBtn, Searchbar } from "../../common";

const Profile = ({ settingFlag, search, setSearch }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const { user } = auth;
  const handleAvatarChangeClick = async (e) => {
    await handleAvatarChange(e, setAuth);
  };
  return (
    <div className="flex-center-center flex-col">
      <label htmlFor="avatar-upload">
        <div className="flex-center-center">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : "https://cdn-icons-png.flaticon.com/512/147/147144.png"
            }
            alt="avatar"
            className="w-32 rounded-full h-32 cursor-pointer border"
          />
        </div>
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
