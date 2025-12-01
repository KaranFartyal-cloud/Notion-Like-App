import TextEditor from "@/components/TextEditor";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const data = await params;
  console.log(data);
  return (
    <div className="p-10 w-full">
      <TextEditor />
    </div>
  );
};

export default page;
