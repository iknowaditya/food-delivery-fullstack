import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  CheckCircle2,
  XCircle,
  Truck,
  Clock,
  ChevronDown,
  Search,
  RefreshCw,
} from "lucide-react";

const statusColors = {
  "Food is being prepared": "bg-amber-100 text-amber-800",
  "Out for Delivery": "bg-blue-100 text-blue-800",
  Delivered: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  "Food is being prepared": <Clock className="w-4 h-4" />,
  "Out for Delivery": <Truck className="w-4 h-4" />,
  Delivered: <CheckCircle2 className="w-4 h-4" />,
  Cancelled: <XCircle className="w-4 h-4" />,
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/order/listAllOrders");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`/api/order/updateOrderStatus`, {
        orderId: orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafb] to-white p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1f4037] flex items-center">
              <Package className="w-8 h-8 mr-3 text-[#99f2c8]" />
              Order Management
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all customer orders
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#1f4037]/50" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ rotate: 30 }}
              whileTap={{ scale: 0.9 }}
              onClick={fetchAllOrders}
              className="p-2 bg-white border border-[#99f2c8]/50 rounded-lg hover:bg-[#99f2c8]/10 transition-colors"
            >
              <RefreshCw
                className={`w-5 h-5 text-[#1f4037] ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 p-6 h-80 animate-pulse"
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
      {!loading && filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#99f2c8]/30 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-[#99f2c8]/20 rounded-full flex items-center justify-center mb-6">
            <Package className="w-10 h-10 text-[#1f4037]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1f4037] mb-3">
            {searchTerm ? "No matching orders found" : "No orders yet"}
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search query"
              : "When orders are placed, they'll appear here"}
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-[#1f4037] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={fetchAllOrders}
              className="px-6 py-3 bg-[#1f4037] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              Refresh Orders
            </button>
          )}
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#99f2c8]/30 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-[#1f4037]/5 to-[#99f2c8]/10 p-4 border-b border-[#99f2c8]/30">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-[#1f4037]">
                    <span className="hidden sm:inline">Order #{order._id}</span>
                    <span className="sm:hidden">
                      Order #{order._id.slice(-6)}
                    </span>
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.payment
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.payment ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-[#1f4037]/70">Total Amount</p>
                    <p className="font-bold text-[#1f4037]">${order.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#1f4037]/70">Date</p>
                    <p className="text-[#1f4037]">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#1f4037]/70">Items</p>
                    <p className="text-[#1f4037]">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#1f4037]/70">Status</p>
                    <div
                      className={`text-xs px-2 py-1 rounded-full flex items-center justify-center ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusIcons[order.status] || (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="mb-4">
                  <label className="block text-xs text-[#1f4037]/70 mb-1">
                    Update Status
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none border border-[#99f2c8]/50 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90 text-[#1f4037]"
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                    >
                      <option value="Food is being prepared">
                        Food is being prepared
                      </option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-[#1f4037]/50 pointer-events-none" />
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-[#99f2c8]/30 pt-4">
                  <h3 className="text-sm font-medium text-[#1f4037] mb-2">
                    Items
                  </h3>
                  <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#99f2c8]/30 mr-3 flex-shrink-0">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/images/${
                                item.image
                              }`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1f4037] truncate">
                              {item.name}
                            </p>
                            <div className="flex justify-between text-xs text-[#1f4037]/70">
                              <span>Qty: {item.quantity}</span>
                              <span>${item.price}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-[#99f2c8]/30 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-[#1f4037] text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Track Order
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;
