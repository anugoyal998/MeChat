import React from "react";
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
      <img src={logo} alt="logo" className="w-44 cursor-pointer" />
      <hr />
      <SettingBtn settingFlag={settingFlag} setSettingFlag={setSettingFlag} />
      <Profile settingFlag={settingFlag} />
      <AddPeople hidden={settingFlag && "true"} search={search} setSearch={setSearch} />
    </div>
  );
};

export default SidebarUpper;
