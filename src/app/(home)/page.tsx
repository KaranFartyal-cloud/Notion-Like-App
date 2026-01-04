import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-[50px]  flex flex-col justify-center items-center  bg-white">
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
        <Link className="w-full" href={"/dashboard"}>
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
        </Link>
      </div>

      {/* testimonials */}

      <section className="py-10 w-full flex flex-col h-[490px]  bg-[#F6F5F4] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mb-16">
            <h2 className="text-5xl font-bol font-neus capitalize text-gray-900 mb-4">
              See what our users say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Synapso has transformed how our team collaborates. It's
                incredibly flexible and powerful."
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-gray-600 text-sm">
                Product Manager at TechCorp
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The best tool for organizing our entire company knowledge base.
                Game changer!"
              </p>
              <div className="font-semibold text-gray-900">Mike Chen</div>
              <div className="text-gray-600 text-sm">CTO at StartupXYZ</div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Synapso's all-in-one approach has simplified our workflow
                dramatically."
              </p>
              <div className="font-semibold text-gray-900">Emily Davis</div>
              <div className="text-gray-600 text-sm">
                Operations Lead at DesignCo
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
