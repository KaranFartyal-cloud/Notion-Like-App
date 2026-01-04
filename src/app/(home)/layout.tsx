import Navbar from "@/components/Navbar";
import React from "react";
import { getCurrentUser } from "../actions/helper/getCurrentUser";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default layout;
