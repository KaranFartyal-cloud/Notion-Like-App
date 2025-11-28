import Image from "next/image";
import React from "react";
import SidebarListItem from "./SidebarListItem";

const primary = [
  {
    icon: "",
    text: "search",
  },
  {
    icon: "",
    text: "home",
  },
  {
    icon: "",
    text: "synapso AI",
  },
  {
    icon: "",
    text: "Inbox",
  },
];

const RightSidebar = () => {
  return (
    <div className="w-1/7 h-screen bg-[#202020] flex flex-col pl-4  text-white">
      <h1 className=" capitalize text-lg pb-2 font-bold py-3">karan fartyal</h1>

      {primary.map((item, index) => (
        <SidebarListItem key={index} item={item} />
      ))}
    </div>
  );
};

export default RightSidebar;
