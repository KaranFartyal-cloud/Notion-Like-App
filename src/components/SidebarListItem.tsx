"use client";

import { Search } from "lucide-react";
import { JSX } from "react";
import { SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";

const SidebarListItem = ({
  item,
}: {
  item: {
    icon: JSX.Element;
    text: string;
  };
}) => {
  return (
    <>
      {item.text === "home" ? (
        <Link href={"/"}>
          <SidebarMenuItem className="w-full flex justify-start items-center gap-2 pl-4 pb-2">
            {item.icon}
            <span>{item.text}</span>
          </SidebarMenuItem>
        </Link>
      ) : (
        <SidebarMenuItem className="w-full flex justify-start items-center gap-2 pl-4 pb-2">
          {item.icon}
          <span>{item.text}</span>
        </SidebarMenuItem>
      )}
    </>
  );
};

export default SidebarListItem;
