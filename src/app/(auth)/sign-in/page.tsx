"use client";
import { loginUser } from "@/app/actions/loginUser";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(userData);
      if (res.success) {
        console.log(res.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      console.log("couldn't sign-in user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        onSubmit={submitHandler}
        className=" p-10 rounded-xl shadow-xl w-[90%] max-w-md"
      >
        <div className="flex">
          <h1 className="text-3xl  text-black  mb-6">Sign in to synapso</h1>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-box "
            onChange={changeHandler}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-box"
            onChange={changeHandler}
          />

          <Button disabled={loading} type="submit" className="mt-4 p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all">
            {loading ? <Spinner /> : "Login"}
          </Button>
        </div>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don’t have an account?
          <Link href={"/sign-up"}>
            <span className="text-blue-400 cursor-pointer">{"  "}Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
