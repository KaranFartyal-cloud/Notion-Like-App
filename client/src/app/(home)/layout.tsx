import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="container">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
