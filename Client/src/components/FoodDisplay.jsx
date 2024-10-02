import React, { useContext, useMemo, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import { SkeletonCard } from "./SkeletonCard"; // Import the SkeletonCard

const FoodDisplay = ({ category }) => {
  const { menu_list2 } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Simulating a delay in loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  const filteredMenuList = useMemo(() => {
    if (category === "all") return menu_list2;
    return menu_list2.filter((item) => item.category === category);
  }, [category, menu_list2]);

  return (
    <div className="min-h-screen py-16" id="explore_menu">
      <hr className="h-0.5 my- mx-8 rounded-2xl bg-gray-200 border-0" />
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 delius mt-20">
        Top Dishes Near You
      </h2>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            // Display skeleton cards while loading
            Array.from({ length: 16 }).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            // Display actual food items after loading is complete
            filteredMenuList.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
