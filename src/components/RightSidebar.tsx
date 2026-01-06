"use client";

import { useEffect, useRef, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { BrainCircuit, FileText, House, Mail, Plus, Search } from "lucide-react";
import { createSubject } from "@/app/actions/subject/createSubject";
import { Input } from "@/components/ui/input";
import { useSubjects } from "@/context/subjectProvider";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { User } from "./Navbar";
import { useRouter } from "next/navigation";

type Props = {
  data: {
    id: string;
    userId: string;
    title: string;
    icon: string | null;
    banner: string | null;
  }[];
  user: User;
};

const RightSidebar: React.FC<Props> = ({ data, user }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const { subjects, setInitialSubjects, addSubject } = useSubjects();
  const navigate = useRouter();

  if (!user) {
    return null;
  }

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
    <div className="z-50">
      <Sidebar>
        <SidebarContent className="bg-[#151515] text-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg text-white mb-3">
              Application
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {primary.map((item, index) => (
                  <SidebarListItem key={index} item={item} />
                ))}
                <div className="flex gap-4 justify-between">
                  <SidebarGroupLabel className="text-lg text-white mb-3">
                    Workspaces
                  </SidebarGroupLabel>
                  <Plus
                    className="translate-y-[6px] -translate-x-10"
                    width={18}
                    onClick={() => setIsAdding(true)}
                  />
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
                {subjects?.map((item) => (
                  <Link
                    href={`/dashboard/${item.id}`}
                    key={item.id}
                    className="w-full"
                  >
                    <SidebarMenuItem className="w-full flex justify-start hover:bg-[#23232350] my-auto rounded-lg items-center gap-2 pl-4 pb-2 ">
                      {item.icon ? item.icon : <FileText width={18} />}

                      <span>{item.title}</span>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
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
