import React, { useContext, useMemo, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import { motion, AnimatePresence } from "framer-motion";

const SkeletonCard = () => {
  return (
    <div className="bg-white/90 rounded-2xl overflow-hidden shadow-lg border border-[#1f4037]/20 hover:shadow-2xl transition-shadow duration-300">
      <div className="animate-pulse">
        <div className="bg-[#99f2c8]/40 h-60 w-full"></div>
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <div className="h-6 bg-[#99f2c8]/40 rounded w-3/4"></div>
            <div className="h-6 bg-[#99f2c8]/40 rounded w-6"></div>
          </div>
          <div className="h-4 bg-[#99f2c8]/40 rounded w-full mb-2"></div>
          <div className="h-4 bg-[#99f2c8]/40 rounded w-4/5 mb-6"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-[#99f2c8]/40 rounded w-1/4"></div>
            <div className="h-10 bg-[#99f2c8]/40 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FoodDisplay = ({ category }) => {
  const { menu_list2 } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredMenuList = useMemo(() => {
    if (category === "all") return menu_list2;
    return menu_list2.filter((item) => item.category === category);
  }, [category, menu_list2]);

  return (
    <section
      className="py-16 bg-gradient-to-b from-white to-[#99f2c8]/30"
      id="explore_menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f4037] mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#99f2c8] to-[#1f4037]">
              Top Dishes
            </span>{" "}
            Near You
          </h2>
          <p className="text-lg text-[#1f4037]/80 max-w-2xl mx-auto">
            Discover our chef's special selections crafted with premium
            ingredients
          </p>
        </motion.div>

        {/* Food grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              : filteredMenuList.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FoodItem
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      image={item.image}
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* View more button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 border-2 border-[#99f2c8] text-[#1f4037] hover:bg-[#99f2c8] hover:text-white rounded-full font-medium transition-colors duration-300 shadow-sm hover:shadow-md">
              View Full Menu
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FoodDisplay;
