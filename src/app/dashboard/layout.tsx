import RightSidebar from "@/components/RightSidebar";
import { SubjectProvider } from "@/context/subjectProvider";
import React from "react";
import { fetchSubjects } from "../actions/subject/fetchSubjects";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetchSubjects();
  return (
    <SubjectProvider>
      <SidebarProvider>
        <RightSidebar data={res.subjects!} />

        {children}
      </SidebarProvider>
    </SubjectProvider>
  );
};

export default layout;
