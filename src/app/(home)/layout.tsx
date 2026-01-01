import Navbar from "@/components/Navbar";
import React from "react";
import { getCurrentUser } from "../actions/helper/getCurrentUser";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <div className="flex justify-center">
      <Navbar user={user} />
      <div className="container">
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default layout;
