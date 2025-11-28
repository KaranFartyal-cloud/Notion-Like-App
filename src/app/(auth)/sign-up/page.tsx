"use client";
import { createUser } from "@/app/actions/createUser";
import { motion } from "framer-motion";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-10 rounded-2xl shadow-xl w-[90%] max-w-md"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h1>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="bg-white px-5 rounded-lg py-2"
            onChange={changeHandler}
          />
          <input
            name="email"
            placeholder="Email"
            className="bg-white px-5 rounded-lg py-2"
            onChange={changeHandler}
          />
          <input
            className="bg-white px-5 rounded-lg py-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />

          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </div>
      </motion.form>
    </div>
  );
}
