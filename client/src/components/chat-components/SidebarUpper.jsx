import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import PrimaryBtn from "../PrimaryBtn";
import Searchbar from "../Searchbar";
import logo from "../../img/logo-lg.png";
import avatar from "../../img/avatar.png";
import { FiSettings } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import authState from "../../atoms/authState";
import errorHandler from "../../utils/errorHandler";
import cloudinary from "../../functions/cloudinary";
import { updateAvatar } from "../../http";

const SidebarUpper = () => {
  const { user } = useRecoilValue(authState);
  const handleAvatarChange = async (e) => {
    await errorHandler(async () => {
		const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "mechat");
		const data = await cloudinary.uploadImageToCloudinary(formData)
		await updateAvatar({avatar: data})
	},`client\src\components\chat-components\SidebarUpper.jsx`);
  };
  return (
    <div>
      <img src={logo} alt="logo" className="w-44 cursor-pointer" />
      <hr />
      <div className="flex justify-end mt-2">
        <FiSettings className="text-xl text-myGray3 cursor-pointer" />
      </div>
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
          onChange={handleAvatarChange}
        />
        <p className="text-2xl mt-1 font-bold">{user?.name}</p>
        <PrimaryBtn>
          <span>available</span> <FaChevronDown className="text-sm mt-1" />
        </PrimaryBtn>
        <Searchbar type="search" placeholder="Search" classes="w-full mt-4" />
      </div>
      <div className="flex justify-end items-center space-x-1 mt-3">
        <PrimaryBtn>
          <div className="h-8 w-2 flex-center-center">
            <div>
              <BsPlusLg />
            </div>
          </div>
        </PrimaryBtn>
        <button>
          <HiDotsVertical className="text-xl text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default SidebarUpper;
