import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import img1 from "../assets/FoodImg/food-14.jpg";
import img2 from "../assets/FoodImg/food-15.jpg";
import img3 from "../assets/FoodImg/food-16.jpg";
import img4 from "../assets/FoodImg/food-17.jpg";
import img5 from "../assets/FoodImg/food-18.jpg";

const foodImages = [img1, img2, img3, img4, img5];

const Hero = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    slides: { perView: 3, spacing: 32 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1.2, spacing: 8 } },
    },
    drag: false,
    created(s) {
      setInterval(() => s.next(), 2200);
    },
  });

  return (
    <section className="relative max-w-screen w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1f4037] via-[#99f2c8] to-[#99f2c8]">
      {/* Food Carousel Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div ref={sliderRef} className="keen-slider h-full ">
          {foodImages.map((img, i) => (
            <div
              key={i}
              className="keen-slider__slide h-full flex items-center justify-center"
            >
              <div className="relative h-[60vh] w-[30vw] min-w-[240px] max-w-[420px] rounded-3xl overflow-hidden shadow-2xl mx-auto">
                <img
                  src={img}
                  alt={`Food dish ${i + 1}`}
                  className="h-full w-full object-cover brightness-90 scale-110"
                  draggable={false}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1f4037]/70 to-[#1f4037]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1f4037]/40 via-transparent to-[#1f4037]/90" />
              </div>
            </div>
          ))}
        </div>
        {/* Overall overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f4037]/30 via-[#1f4037]/50 to-[#1f4037]/70" />
      </div>

      {/* Floating particles (mint color) */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: "#99f2c8",
            opacity: 0.14,
            width: Math.random() * 18 + 10,
            height: Math.random() * 18 + 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 80],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0.14, 0.23, 0.14],
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 text-center w-full">
        {/* Premium badge */}
        <motion.div
          initial={{ boxShadow: "0 0 0 0 #99f2c880" }}
          animate={{
            boxShadow: [
              "0 0 0 0 #99f2c880",
              "0 0 0 12px #99f2c833",
              "0 0 0 0 #99f2c880",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-flex items-center justify-center px-5 py-2 mb-7 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
        >
          <span
            className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[#99f2c8] via-white to-[#1f4037] bg-clip-text text-transparent"
            style={{ letterSpacing: "0.08em" }}
          >
            Authentic Flavours, Modern Vibes
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-7 leading-tight drop-shadow-[0_2px_24px_rgba(153,242,200,0.18)]">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#99f2c8] to-[#1f4037]">
            Order Desi. Eat Happy.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
          Discover the vibrant taste of India, delivered to your door with love
          and style. Explore our chef-curated menu and treat yourself to a truly
          Desi delight.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#1f4037] to-[#1f4037] hover:from-[#1f4037] hover:to-[#99f2c8] text-[#99f2c8] hover:text-[#1f3f36] hover:border-[#99f2c8] rounded-2xl shadow-xl hover:shadow-[#99f2c8]/30 transition-all duration-300 border-2 border-white/30"
            onClick={() =>
              document
                .getElementById("explore_menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>Browse Desi Menu</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110" />
          </Button>
          {/* 
          <Button
            variant="default"
            className="px-8 py-6 text-lg font-semibold inline-flex items-center justify-center mb-7 bg-white/10  rounded-full border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300 shadow"
          >
            <span>Why DesiBite?</span>
          </Button> */}
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1f4037]/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
