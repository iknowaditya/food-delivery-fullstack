import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
} from "lucide-react";

const Order = () => {
  const { getTotalCartAmount, token, menu_list2, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    menu_list2.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(
        url + "/api/order/placeOrder",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f4037] mb-4">
            Complete Your Order
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-[#1f4037] flex items-center justify-center text-white">
              1
            </div>
            <div className="h-1 w-16 bg-[#1f4037]"></div>
            <div className="w-8 h-8 rounded-full bg-[#1f4037] flex items-center justify-center text-white">
              2
            </div>
            <div className="h-1 w-16 bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              3
            </div>
          </div>
        </motion.div>

        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Delivery Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#99f2c8]/30"
          >
            <div className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] p-4 text-white">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Delivery Information</h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="lastName"
                    onChange={onChangeHandler}
                    value={data.lastName}
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                <input
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                />
              </div>

              {/* Street */}
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                <input
                  name="street"
                  onChange={onChangeHandler}
                  value={data.street}
                  type="text"
                  placeholder="Street Address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="city"
                    onChange={onChangeHandler}
                    value={data.city}
                    type="text"
                    placeholder="City"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="state"
                    onChange={onChangeHandler}
                    value={data.state}
                    type="text"
                    placeholder="State/Province"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
              </div>

              {/* Zip Code & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="zipCode"
                    onChange={onChangeHandler}
                    value={data.zipCode}
                    type="text"
                    placeholder="ZIP/Postal Code"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                  <input
                    name="country"
                    onChange={onChangeHandler}
                    value={data.country}
                    type="text"
                    placeholder="Country"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-[#1f4037]/50" />
                <input
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#99f2c8]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                />
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#99f2c8]/30"
          >
            <div className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] p-4 text-white">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
            </div>

            <div className="p-6">
              {/* Order Summary Card */}
              <div className="bg-[#f8fafb] rounded-xl p-6 border border-[#99f2c8]/30 mb-6">
                <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                  Your Order
                </h3>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-[#1f4037]">
                      ${getTotalCartAmount().toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Fee */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-medium text-[#1f4037]">
                      ${getTotalCartAmount() === 0 ? 0 : 2.0}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#99f2c8]/30">
                    <span className="font-bold text-lg text-[#1f4037]">
                      Total:
                    </span>
                    <span className="font-bold text-lg text-[#1f4037]">
                      $
                      {(
                        getTotalCartAmount() +
                        (getTotalCartAmount() === 0 ? 0 : 2)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#1f4037] to-[#99f2c8] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                Proceed to Payment <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>

              {/* Security Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Your payment information is processed securely.</p>
                <p>We don't store your credit card details.</p>
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Order;
