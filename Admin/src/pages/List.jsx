import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const List = () => {
  const [list, setList] = useState([]);

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Fetch the food list
  const fetchList = async () => {
    try {
      const response = await axios.get('/api/food/list');
      if (response.status === 200) {
        setList(response.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/food/remove/${id}`);
      if (response.status === 200) {
        toast.success('Item deleted successfully');
        // Remove from the UI
        setList(list.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchList();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg mt-[100px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Food List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Food Image with Delete Icon */}
              <div className="relative">
                <img
                  src={`${baseURL}/images/${item.image}`}
                  alt={item.name}
                  className="w-full h-48 object-cover object-center"
                />
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>

              {/* Food Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold text-gray-800">Price: </span>${item.price}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {item.description.length > 50
                    ? `${item.description.slice(0, 50)}...`
                    : item.description}
                </p>
                <span className="inline-block bg-green-100 text-green-600 px-3 py-1 text-xs font-semibold rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500">
            No food items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
