import RightSidebar from "@/components/RightSidebar";
import { SubjectProvider } from "@/context/subjectProvider";
import React from "react";
import { fetchSubjects } from "../actions/subject/fetchSubject";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetchSubjects();
  return (
    <SubjectProvider>
      <div className="w-full">
        <RightSidebar data={res.subjects!} />
        <div>{children}</div>
      </div>
    </SubjectProvider>
  );
};

export default layout;
