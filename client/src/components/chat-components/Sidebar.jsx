import React from "react";
import logo from "../../img/logo-lg.png";
import avatar from "../../img/avatar.png";
import { FiSettings } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import authState from "../../atoms/authState";
import PrimaryBtn from "../PrimaryBtn";
import Searchbar from "../Searchbar";
import { FaChevronDown } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import {HiDotsVertical} from "react-icons/hi"
import ShowPeople from "./ShowPeople";

const Sidebar = () => {
  const { user } = useRecoilValue(authState);
  return (
    <div className="h-screen w-[300px] py-3 px-2 overflow-y-scroll scrollbar-hide">
      <div>
      <img src={logo} alt="logo" className="w-44 cursor-pointer" />
      <hr />
      <div className="flex justify-end mt-2">
        <FiSettings className="text-xl text-myGray3 cursor-pointer" />
      </div>
      <div className="flex-center-center flex-col">
        <img src={avatar} alt="avatar" className="w-32 rounded-full h-32 cursor-pointer" />
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
        <button><HiDotsVertical className="text-xl text-gray-500"/></button>
      </div>
      </div>
      <ShowPeople/>
    </div>
  );
};

export default Sidebar;
