import TextEditor from "@/components/TextEditor";
import React from "react";
import "@/styles/styles.scss";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const data = await params;
  console.log(data);
  return (
    <div className="p-10 bg-red-400 w-full h-screen overflow-scroll overflow-x-hidden">
      <TextEditor />
    </div>
  );
};

export default page;
