import React from "react";
import { Button } from "./ui/button";
import img from "../assets/bg-img2.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const Navigate = useNavigate();
  return (
    <div className="relative flex items-center justify-center bg-neutral-100 py-16" id="home">
      {/* Hero container */}
      <div className="absolute inset-0">
        <img 
          src={img}
          alt="Hero"
          className="w-full h-full object-cover rounded-b-3xl" // Full width image
        />
        <div className="absolute inset-0 bg-green-100 opacity-50 rounded-b-3xl"></div> {/* Green overlay */}
      </div>

      <div className="relative mt-44  z-10 mx-4 md:mx-8 lg:mx-16 p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center w-full max-w-5xl">
        {/* Hero heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 delius animate-fade-in animate-delay-500 animate-duration-1000">
          Crave. <span className="text-green-600">Click.</span> Enjoy.
        </h1>

        {/* Hero description */}
        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed animate-fade-in animate-delay-750 animate-duration-1000 max-w-xl mx-auto">
          Satisfy your <span className="text-green-600">cravings</span> with just a few clicks. Our quick and reliable
          delivery brings a world of culinary delights straight to you.
        </p>

        {/* Hero button */}
        <div className="animate-fade-in animate-delay-1000 animate-duration-1000">
          <Button
            variant="outline"
            className="mt-8 border-white hover:bg-white hover:text-neutral-900 transition-transform duration-300 hover:scale-105"
            onClick={() => {
              document
                      .getElementById("explore_menu")
                      .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
