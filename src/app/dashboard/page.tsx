"use client";

import React, { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");

  return (
    <div className="w-full h-screen overflow-y-auto bg-neutral-50 ">
      {/* Image Box */}
      <div className="w-full h-[200px] overflow-hidden relative">
        <img src="/welcome.jpg" alt="" className=" object-cover w-full h-full" />
      </div>

      {/* Welcome Text (OVERFLOWS freely) */}
      <h1 className="text-5xl  text-black font-bold relative -mt-7 ml-6">
        Welcome
      </h1>

      {/* Divider */}
      <div className="border-b border-neutral-200 mb-8 mt-3"></div>

      {/* Content */}
      <textarea
        className="w-full min-h-[70vh] bg-transparent resize-none outline-none 
        text-[1.15rem] leading-8 text-neutral-700 placeholder:text-neutral-400"
        placeholder="Type something…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
