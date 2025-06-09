import React from "react";
import { menu_list } from "../assets/FoodImg";
import { motion } from "framer-motion";
import img1 from "../assets/FoodImg/food-14.jpg"; // Replace with your actual image path

// Add a default "All" category at the start
const allCategory = {
  menu_name: "all",
  menu_img: img1, // You can use any icon or image for "All"
};

const ExploreMenu = ({ category, setCategory }) => {
  // Combine "All" with your menu_list
  const categories = [allCategory, ...menu_list];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-[#99f2c8]/30"
      id="menu"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-[#1f4037] uppercase rounded-full bg-[#99f2c8]/50">
            Culinary Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f4037] mb-4">
            Explore Our <span className="text-[#99f2c8]">Menu</span>
          </h2>
          <p className="text-lg text-[#1f4037]/80 max-w-2xl mx-auto">
            Discover our chef-curated selection featuring the freshest seasonal
            ingredients
          </p>
        </motion.div>

        {/* Category selector */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {categories.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative cursor-pointer group rounded-full overflow-hidden w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 flex items-center justify-center transition-all duration-300 ${
                category === item.menu_name
                  ? "ring-4 ring-[#99f2c8] ring-offset-4"
                  : "hover:ring-2 hover:ring-[#1f4037]/50"
              }`}
              onClick={() => setCategory(item.menu_name)}
            >
              <img
                src={item.menu_img}
                alt={item.menu_name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#1f4037]/70 via-[#1f4037]/40 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                  category === item.menu_name
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <h3 className="text-white font-bold text-lg md:text-xl text-center w-full drop-shadow">
                  {item.menu_name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreMenu;
