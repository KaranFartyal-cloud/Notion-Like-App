"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import NavbarList from "./NavbarList";

export default function Navbar() {
  return (
    <nav className="w-full py-4 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side: Logo + Title + NavList */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" height={55} width={55} alt="logo" />
            <h1 className="text-2xl font-bold text-[#4B91DE]">Synapso</h1>
          </div>

          <NavbarList />
        </div>

        {/* Right Buttons */}
        <div className="flex gap-4 items-center">
          <Button className="px-5 py-2 bg-white text-[#4B91DE] border border-[#4B91DE] hover:bg-[#4B91DE] hover:text-white transition">
            Login
          </Button>

          <Button className="px-5 py-2 bg-[#4B91DE] text-white hover:bg-[#357CC7] transition">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
}
