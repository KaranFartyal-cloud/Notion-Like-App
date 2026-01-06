import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-[#151515] ">
      <div className="flex flex-col h-full w-full items-center gap-3 p-7">
        <Skeleton className="h-[60px] justify-between bg-[#191919] w-full rounded-xl" />
        <Skeleton className="flex-1  bg-[#191919] w-full" />
      </div>
    </div>
  );
};

export default loading;
