import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-[50px]  flex flex-col justify-center items-center px-6 bg-white">
      <div className="mt-10">
        <h1 className="font-extrabold text-center text-6xl tracking-wider leading-15 text-gray-800">
          Easy to use.
        </h1>
        <h1 className="font-extrabold text-center text-6xl tracking-tight text-gray-800">
          AI workspace.
        </h1>
      </div>
      <p className="w-[250px] md:w-[600px] text-[1.25rem] text-center text-gray-700 mt-10">
        Synapso is where you can give steriods to your usual notes and also
        improve your productivity by using the power of AI.
      </p>

      <div className="md:w-[400px] w-[250px] mt-6 flex justify-center">
        <Button
          className="
  w-full
  bg-[#0A7FE8]
  hover:bg-[#2399ff]
  transition-all
  duration-200
  ease-in-out
  hover:scale-[1.02]
"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
