import React from "react";
import ShowPeople from "./ShowPeople";
import SidebarUpper from "./SidebarUpper";

const Sidebar = () => {
  return (
    <div className="h-screen w-[300px] py-3 px-2 overflow-y-scroll scrollbar-hide">
      <SidebarUpper />
      <ShowPeople />
    </div>
  );
};

export default Sidebar;
