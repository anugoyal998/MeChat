import React, { useState } from "react";
import ShowPeople from "./ShowPeople";
import SidebarUpper from "./SidebarUpper";

const Sidebar = ({flag,setFlag}) => {
  const [search,setSearch] = useState('')
  return (
    <div className="h-screen w-full sm:w-[300px] py-3 px-2 overflow-y-scroll scrollbar-hide">
      <SidebarUpper search={search} setSearch={setSearch}/>
      <ShowPeople search={search} setSearch={setSearch} flag={flag} setFlag={setFlag}/>
    </div>
  );
};

export default Sidebar;
