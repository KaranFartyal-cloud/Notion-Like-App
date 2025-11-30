"use client";

import { useEffect, useRef, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { BrainCircuit, House, Mail, Plus, Search } from "lucide-react";
import { createSubject } from "@/app/actions/subject/createSubject";
import { Input } from "@/components/ui/input";
import { useSubjects } from "@/context/subjectProvider";

type Props = {
  data: {
    id: string;
    userId: string;
    title: string;
    icon: string | null;
    banner: string | null;
  }[];
};

const RightSidebar: React.FC<Props> = ({ data }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const { subjects, setInitialSubjects, addSubject } = useSubjects();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInitialSubjects(data);
  }, []);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const addToSubject = async () => {
    try {
      const res = await createSubject(title);
      console.log(res);
      if (res.success) {
        addSubject(res.subject!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        if (title.trim().length > 0) {
          try {
            const res = await createSubject(title);
            if (res.success) {
              addSubject(res.subject!);
            }
          } catch (error) {
            console.log(error);
          }
        }
        setTitle("");
        setIsAdding(false);
      }
    }

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding, title]);

  return (
    <div className="w-1/7 h-screen  bg-[#202020] flex flex-col pl-4  text-white">
      <h1 className=" capitalize text-lg pb-2 font-bold py-3">karan fartyal</h1>

      {primary.map((item, index) => (
        <SidebarListItem key={index} item={item} />
      ))}
      <div className="flex gap-4 items-center">
        <h1 className="capitalize text-lg pb-2 font-bold py-3">Workspaces</h1>
        <Plus width={18} className="mt-1" onClick={() => setIsAdding(true)} />
      </div>

      {isAdding && (
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (title.trim().length > 0) {
                addToSubject();
              }
              setTitle("");
              setIsAdding(false);
            }
            if (e.key === "Escape") {
              setTitle("");
              setIsAdding(false);
            }
          }}
          className="p-2 border rounded w-3/4 mb-2 bg-gray-800 text-white"
          placeholder="Enter subject name…"
        />
      )}
      {subjects.map((item) => (
        <div
          key={item.id}
          className="w-full flex justify-start items-center gap-2 pl-4 pb-2"
        >
          {item.icon}
          <span className="text-lg">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default RightSidebar;

const primary = [
  {
    icon: <Search width={18} />,
    text: "search",
  },
  {
    icon: <House width={18} />,
    text: "home",
  },
  {
    icon: <BrainCircuit width={18} />,
    text: "synapso AI",
  },
  {
    icon: <Mail width={18} />,
    text: "Inbox",
  },
];
