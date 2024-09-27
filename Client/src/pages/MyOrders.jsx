import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa"; // Icons for status
import { PiCookingPotDuotone } from "react-icons/pi";
import { MdPayment } from "react-icons/md"; // Payment icon

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-28 max-w-[1200px] w-full mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-green-600 mb-10">
        My Orders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {data.length === 0 ? (
            <div className="flex items-center justify-center col-span-full h-[300px] bg-green-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 text-center">
              <p className="text-gray-500">
                You have no orders yet.
              </p>
            </div>
          </div>
        ) : (
          data.map((order, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Order Info Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex flex-col">
                    Order ID:{" "}
                    <span className="text-gray-700 text-sm font-medium">
                      {order._id}
                    </span>
                  </h3>
                  <p
                    className={`text-sm font-semibold ${
                      order.payment ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.payment ? (
                      <>
                        <MdPayment className="inline-block mr-1" /> Paid
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="inline-block mr-1" /> Unpaid
                      </>
                    )}
                  </p>
                </div>

                {/* Scrollable Items */}
                <div className="max-h-48 overflow-y-auto custom-scrollbar mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Items Ordered:
                  </h4>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-4">
                        <img
                          src={`${url}/images/${item.image}`}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover shadow-sm"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600 ">
                            Price: ${item.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">
                      Total Amount:
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      <span className="text-green-600 delius text-xl">$</span>
                      {order.amount}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">Status:</p>
                    <p
                      className={`flex items-center justify-center text-sm font-bold ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : order.status === "Out for Delivery"
                          ? "text-blue-500"
                          : order.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-500" // Default for any other status
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">
                      Order Date:
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center hover:bg-green-700 transition">
                    <FaTruck className="mr-2" /> Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
