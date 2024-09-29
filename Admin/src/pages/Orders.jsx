import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Get the base URL from axios defaults
  const baseURL = import.meta.env.VITE_BASE_URL;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("/api/order/listAllOrders");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(`/api/order/updateOrderStatus`, {
      orderId: orderId,
      status: e.target.value,
    })

    if (response.data.success) {
      toast.success(response.data.message);
      fetchAllOrders();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        All Users' Orders
      </h1>

      {/* Main Order Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 border "
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 flex flex-col">
                Order Id:
                <span className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1">
                  {/* Show full ID on larger screens, last 6 characters on mobile */}
                  <span className="hidden sm:inline">#{order._id}</span>
                  <span className="sm:hidden">#{order._id.slice(-6)}</span>
                </span>
              </h2>

              <span
                className={`px-3 py-1 text-sm rounded ${order.payment
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {order.payment ? "Paid" : "Unpaid"}
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-2">
              Total:{" "}
              <span className="font-bold text-gray-800">${order.amount}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Status:
              <select
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700 p-[2px]"
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value={"Food is being prepared"}>
                  Food is being prepared
                </option>
                <option value={"Out for Delivery"}>Out for Delivery</option>
                <option value={"Delivered"}>Delivered</option>
                <option value={"Cancelled"}>Cancelled</option>
              </select>
            </p>
            <p className="text-gray-600 text-sm">
              Items: <span className="font-bold">{order.items.length}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Date: {new Date(order.date).toLocaleDateString()}
            </p>

            {/* Scrollable Order Items */}
            <div className="mt-4 ">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Items:
              </h3>
              <ul className="custom-scrollbar overflow-y-auto h-32 mt-2 px-2">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={`${baseURL}/images/${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end mt-4">
              <button className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
