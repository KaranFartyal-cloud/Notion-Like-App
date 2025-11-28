import Image from "next/image";
import React from "react";

const SidebarListItem = ({
  item,
}: {
  item: {
    icon: string;
    text: string;
  };
}) => {
  return (
    <div className="w-full flex justify-start pl-4 pb-2">
      <Image />
      <span className="text-lg">{item.text}</span>
    </div>
  );
};

export default SidebarListItem;
