"use client";
import { createUser } from "@/app/actions/createUser";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createUser(userData);

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className=" p-10 rounded-2xl shadow-xl w-[90%] max-w-md"
      >
        <div>
          <h1 className="text-3xl  text-black  mb-6">
            Create Account
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="input-box"
            onChange={changeHandler}
          />
          <input
            name="email"
            placeholder="Email"
            className="input-box"
            onChange={changeHandler}
          />
          <input
            className="input-box"
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
          >
            {loading? <Spinner /> : "Sign-up"}
          </Button>

          <p className="text-gray-400 text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link href={"/sign-in"}>
              <span className="text-blue-400 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
