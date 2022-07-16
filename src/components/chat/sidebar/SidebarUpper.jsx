import React from "react";
import Image from 'next/image'
import logo from "../../../img/logo-lg.png";
import { useRecoilState } from "recoil";
import authState from "../../../atoms/authState";
import { SettingBtn } from "./Settings";
import AddPeople from "./AddPeople";
import Profile from "./Profile";

const SidebarUpper = ({ search, setSearch, settingFlag, setSettingFlag }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const { user } = auth;
  return (
    <div>
      <Image src={logo} alt="logo" className="w-44 cursor-pointer" />
      <hr />
      <SettingBtn settingFlag={settingFlag} setSettingFlag={setSettingFlag} />
      <Profile settingFlag={settingFlag} search={search} setSearch={setSearch} />
      <AddPeople hidden={settingFlag && "true"} search={search} setSearch={setSearch} />
    </div>
  );
};

export default SidebarUpper;
