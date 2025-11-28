import { Search } from "lucide-react";
import { JSX } from "react";

const SidebarListItem = ({
  item,
}: {
  item: {
    icon: JSX.Element;
    text: string;
  };
}) => {
  return (
    <div className="w-full flex justify-start items-center gap-2 pl-4 pb-2">
      {item.icon}
      <span className="text-lg">{item.text}</span>
    </div>
  );
};

export default SidebarListItem;
