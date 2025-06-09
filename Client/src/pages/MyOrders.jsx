import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  CheckCircle2,
  XCircle,
  CookingPot,
  CreditCard,
  Calendar,
  Package,
  Clock,
} from "lucide-react";

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-800",
  "Out for Delivery": "bg-blue-100 text-blue-800",
  Processing: "bg-amber-100 text-amber-800",
  Cancelled: "bg-red-100 text-red-800",
  Preparing: "bg-purple-100 text-purple-800",
};

const statusIcons = {
  Delivered: <CheckCircle2 className="w-4 h-4" />,
  "Out for Delivery": <Truck className="w-4 h-4" />,
  Processing: <Clock className="w-4 h-4" />,
  Cancelled: <XCircle className="w-4 h-4" />,
  Preparing: <CookingPot className="w-4 h-4" />,
};

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f4037] via-[#eaf7f0] to-[#f6fefb] py-28 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f4037] mb-4 flex items-center justify-center">
            <Package className="w-8 h-8 mr-3 text-[#99f2c8]" />
            Order History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your past orders and track current deliveries
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-96 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        <AnimatePresence>
          {!loading && data.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-sm border border-[#99f2c8]/30 p-12 text-center max-w-2xl mx-auto"
            >
              <div className="mx-auto w-24 h-24 bg-[#99f2c8]/20 rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-[#1f4037]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1f4037] mb-3">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start exploring our menu to
                discover delicious meals!
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/#explore_menu")}
                className="px-6 py-3 bg-gradient-to-r from-[#1f4037] to-[#99f2c8] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Browse Menu
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {data.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <div
                      className={`text-xs px-2 py-1 rounded-full flex items-center ${
                        order.payment ? "bg-white/20" : "bg-red-500/90"
                      }`}
                    >
                      {order.payment ? (
                        <>
                          <CreditCard className="w-3 h-3 mr-1" /> Paid
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" /> Unpaid
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-5">
                  {/* Items List */}
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <CookingPot className="w-4 h-4 mr-2 text-[#1f4037]" />
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "Item" : "Items"}
                    </h4>
                    <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      <ul className="space-y-3">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 mr-3 flex-shrink-0">
                              <img
                                src={`${url}/images/${item.image}`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </p>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Qty: {item.quantity}</span>
                                <span>${item.price}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#1f4037]/70" />
                        Date
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium">
                        ${order.amount - 2}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Delivery</span>
                      <span className="text-sm font-medium">$2.00</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-[#1f4037]">
                        ${order.amount}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      <div
                        className={`text-xs px-3 py-1 rounded-full flex items-center ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusIcons[order.status] || (
                          <Clock className="w-4 h-4 mr-1" />
                        )}
                        {order.status}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-xs px-4 py-2 bg-[#1f4037] text-white rounded-lg font-medium flex items-center"
                      >
                        <Truck className="w-3 h-3 mr-1" />
                        Track
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #99f2c8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1f4037;
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
