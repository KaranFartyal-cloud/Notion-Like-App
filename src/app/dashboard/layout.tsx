import RightSidebar from "@/components/RightSidebar";
import { SubjectProvider } from "@/context/subjectProvider";
import React from "react";
import { fetchSubjects } from "../actions/subject/fetchSubjects";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "../actions/helper/getCurrentUser";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetchSubjects();
  const user = await getCurrentUser();
  return (
    <SubjectProvider>
      <SidebarProvider>
        <RightSidebar data={res.subjects!} user={user} />
        

        {children}
      </SidebarProvider>
    </SubjectProvider>
  );
};

export default layout;
