import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/helper/getCurrentUser";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-full h-30[vh] overflow-y-auto bg-neutral-50 ">
      {/* Image Box */}
      <div className="w-full h-[200px] overflow-hidden relative">
        <img
          src="/welcome.jpg"
          alt=""
          className=" object-cover w-full h-full"
        />
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
