import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaPencilAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import authState from "../../../atoms/authState";
import { handleLogout, handleNameChange } from "../../../functions/sidebar/updateUser";

const Settings = () => {
  const [auth,setAuth] = useRecoilState(authState);
  const handleLogoutClick = async ()=> {
    await handleLogout()
  }
  return (
    <div className="mt-5">
      <HelperComp state={auth?.user?.name} setAuth={setAuth} />
      <button className="mt-10 bg-myBlueDark text-white font-semibold w-full py-2 rounded-lg text-lg" onClick={handleLogoutClick} >Logout</button>
    </div>
  );
};

const HelperComp = ({ state, setAuth }) => {
  const [change, setChange] = useState(state);
  const [flag, setFlag] = useState(false);
  const handleTickClick = async ()=> {
    await handleNameChange(change,setAuth,setFlag)
  }
  return (
    <div>
      <p className="text-lg text-myBlueDark font-semibold">Your Name</p>
      <div className="flex justify-between items-center px-3">
        <input
          id="change-input"
          type="text"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className="no-outline bg-white"
          disabled={!flag}
        />
        {!flag ? (
          <div
            className="cursor-pointer animation hover:scale-125"
            onClick={()=> {
              setFlag(true);
              document.getElementById("change-input").focus();
            }}
          >
            <FaPencilAlt />
          </div>
        ) : (
          <div
            className="cursor-pointer animation hover:scale-125"
            onClick={handleTickClick}
          >
            <TiTick className="text-2xl" />
          </div>
        )}
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export const SettingBtn = ({ settingFlag, setSettingFlag }) => {
  return (
    <div className={`flex ${!settingFlag && "justify-end"} mt-2`}>
      {!settingFlag ? (
        <FiSettings
          className="text-xl text-myGray3 cursor-pointer"
          onClick={() => setSettingFlag(true)}
        />
      ) : (
        <BiArrowBack
          onClick={() => setSettingFlag(false)}
          className="text-xl text-myGray3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Settings;
