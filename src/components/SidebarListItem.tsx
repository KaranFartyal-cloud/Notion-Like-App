'use client'

import { Search } from "lucide-react";
import { JSX } from "react";
import { SidebarMenuItem } from "./ui/sidebar";

const SidebarListItem = ({
  item,
}: {
  item: {
    icon: JSX.Element;
    text: string;
  };
}) => {
  return (
    <SidebarMenuItem className="w-full flex justify-start items-center gap-2 pl-4 pb-2">
      {item.icon}
      <span >{item.text}</span>
    </SidebarMenuItem>
  );
};

export default SidebarListItem;
