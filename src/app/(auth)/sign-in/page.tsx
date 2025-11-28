"use client";
import { loginUser } from "@/app/actions/loginUser";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(userData);
      if (res.success) {
        console.log(res.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      console.log("couldn't sign-in user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-10 rounded-xl shadow-xl w-[90%] max-w-md"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
          />

          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </div>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href={"/sign-up"}>
            <span className="text-blue-400 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
