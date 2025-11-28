import RightSidebar from "@/components/RightSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <RightSidebar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
