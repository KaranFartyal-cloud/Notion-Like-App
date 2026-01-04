"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import NavbarList from "./NavbarList";
import { useMediaQuery } from "react-responsive";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/app/actions/logoutUser";

export type User =
  | {
      id: string;
      email: string;
      name: string;
    }
  | null
  | undefined;

export default function Navbar({ user }: { user: User }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        console.log("user is logged out");
      } else {
        console.log("something happende");
      }
    } catch (error) {
      console.log("something happende");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                src={"/logo.png"}
                width={50}
                height={50}
                alt="logo image"
              />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavbarList user={user} />
              </div>
            </div>
          </div>

          <div className="relative hidden  md:flex gap-3">
            {!user && (
              <>
                <Link href="/sign-in">
                  <Button
                    className="h-8 text-sm transition delay-150 duration-300 ease-in-out"
                    variant={"ghost"}
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="px-10 h-8 text-sm bg-[#0A7FE8]  hover:bg-[#2399ff] transition delay-150 duration-300 ease-in-out">
                    Sign-up
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <Button
                variant={"ghost"}
                className="text-red-400 hover:text-red-500"
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            )}
          </div>
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger className="-translate-x-5 px-5 py-2 rounded-lg ">
                <Menu width={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-2">
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Sign-up</DropdownMenuItem>
                <DropdownMenuItem>Usage</DropdownMenuItem>
                <DropdownMenuItem>Screenshots</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
