import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const List = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Fetch the food list
  const fetchList = async () => {
    try {
      const response = await axios.get("/api/food/list");
      if (response.status === 200) {
        setList(response.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/food/remove/${id}`);
      if (response.status === 200) {
        toast.success("Item deleted successfully");
        setList(list.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchList();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1f4037]">Food Dashboard</h1>
          <p className="text-[#1f4037]/80">
            Manage all food items in your database
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#99f2c8]/30">
            <h3 className="text-sm font-medium text-[#1f4037]/70">
              Total Items
            </h3>
            <p className="text-3xl font-bold text-[#1f4037] mt-2">
              {list.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#99f2c8]/30">
            <h3 className="text-sm font-medium text-[#1f4037]/70">
              Categories
            </h3>
            <p className="text-3xl font-bold text-[#1f4037] mt-2">
              {new Set(list.map((item) => item.category)).size}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#99f2c8]/30">
            <h3 className="text-sm font-medium text-[#1f4037]/70">
              Avg. Price
            </h3>
            <p className="text-3xl font-bold text-[#1f4037] mt-2">
              {list.length > 0
                ? `$${(
                    list.reduce((sum, item) => sum + item.price, 0) /
                    list.length
                  ).toFixed(2)}`
                : "$0.00"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#99f2c8]/30">
          <div className="p-6 border-b border-[#99f2c8]/30">
            <h2 className="text-xl font-semibold text-[#1f4037]">
              All Food Items
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99f2c8]"></div>
            </div>
          ) : list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#99f2c8]/30 group"
                >
                  {/* Food Image with Delete Icon */}
                  <div className="relative">
                    <img
                      src={`${baseURL}/images/${item.image}`}
                      alt={item.name}
                      className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300 shadow-md"
                      aria-label="Delete item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Food Details */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-[#1f4037]">
                        {item.name}
                      </h3>
                      <span className="inline-block bg-[#99f2c8] text-[#1f4037] px-3 py-1 text-xs font-semibold rounded-full">
                        ${item.price}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-[#1f4037]/10 text-[#1f4037] px-3 py-1 text-xs font-medium rounded-full">
                        {item.category}
                      </span>
                      <button className="text-xs font-medium text-[#1f4037] hover:text-[#99f2c8] transition-colors duration-300">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#1f4037"
                className="w-12 h-12 mx-auto mb-4 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015H9.375V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <p className="text-[#1f4037]/70">
                No food items found. Add some items to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
