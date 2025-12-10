import RightSidebar from "@/components/RightSidebar";
import { SubjectProvider } from "@/context/subjectProvider";
import React from "react";
import { fetchSubjects } from "../actions/subject/fetchSubjects";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetchSubjects();
  return (
    <SubjectProvider>
      <div className="w-full flex">
        <RightSidebar data={res.subjects!} />

       {children}
      </div>
    </SubjectProvider>
  );
};

export default layout;
