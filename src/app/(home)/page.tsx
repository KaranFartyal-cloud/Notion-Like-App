"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-[50px] flex flex-col justify-center items-center px-6 bg-white">
      {/* Hero Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl text-center"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-7xl font-bold leading-tight text-[#4B91DE]"
        >
          Your all-in-one solution
          <br />
          <span className="text-black">for productivity</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Synapso helps you organize notes, boost productivity, and stay focused
          — with smart AI built right in.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex justify-center gap-6"
        >
          <Button className="px-8 py-5 rounded-lg bg-[#4B91DE] text-white text-lg font-semibold hover:bg-[#357CC7] transition-all shadow-md">
            <Link href={"/dashboard"}> Get Started</Link>
          </Button>

          <Button className="px-8 py-5 rounded-lg border border-[#4B91DE] text-[#4B91DE] text-lg font-semibold bg-white hover:bg-[#4B91DE] hover:text-white transition-all">
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
