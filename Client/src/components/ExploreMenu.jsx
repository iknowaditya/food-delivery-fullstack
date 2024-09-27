import React from "react";
import { menu_list } from "../assets/FoodImg";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-800  mb-4 delius">
          Explore Our Menu
        </h1>
        <p className="text-gray-700 text-base leading-relaxed text-center mb-6">
          Choose from a delivery Menu featuring the freshest ingredients
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {menu_list.map((item, index) => (
            <div
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center transition-transform duration-300 transform hover:scale-105 ${category === item.menu_name
                  ? "border-[6px] border-green-600"
                  : ""
                }`}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "all" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_img}
                alt={item.menu_name}
                className={`w-full h-full rounded-full object-cover object-center transition-transform duration-300 transform hover:scale-105`}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50 ${category === item.menu_name
                    ? "opacity-100"
                    : "opacity-0 hover:opacity-100"
                  } transition-opacity duration-300`}
              >
                {item.menu_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExploreMenu;
