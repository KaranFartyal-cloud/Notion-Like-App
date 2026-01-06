import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/helper/getCurrentUser";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full h-30[vh] overflow-y-auto bg-neutral-50 ">
      <SidebarTrigger className="bg-blue-600 fixed translate-y-3 z-25 text-white"></SidebarTrigger>
      {/* Image Box */}
      <div className="w-full h-[200px] overflow-hidden relative">
        <Image src="/welcome.jpg" alt="" fill objectFit="cover" />
      </div>

      {/* Welcome Text (OVERFLOWS freely) */}
      <h1 className="text-5xl  text-black font-bold relative -mt-7 ml-6">
        Welcome
      </h1>

      {/* Divider */}
      <div className="border-b border-neutral-200 mb-8 mt-3"></div>

      {/* Content */}
      <div className="w-full h-[40vh]  flex justify-center items-center">
        <h1>create</h1>
      </div>
    </div>
  );
}
