import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight, Tag, ChevronRight } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    menu_list2,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isCartEmpty = Object.values(cartItems).every(
    (quantity) => quantity === 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f4037] via-[#eaf7f0] to-[#f6fefb] py-28 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl mx-auto">
        {/* Cart Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f4037] flex items-center">
            <ShoppingCart className="w-8 h-8 mr-3 text-[#99f2c8]" />
            Your Cart
          </h1>
          <button
            onClick={() => navigate("/#explore_menu")}
            className="text-[#99f2c8] hover:text-[#1f4037] flex items-center text-sm font-medium"
          >
            Continue Shopping <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </motion.div>

        {/* Main Cart Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#99f2c8]/30">
          {/* Cart Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gradient-to-r from-[#1f4037] to-[#99f2c8]/60 text-white p-4">
            <div className="col-span-5 font-medium">Item</div>
            <div className="col-span-2 font-medium text-center">Price</div>
            <div className="col-span-2 font-medium text-center">Quantity</div>
            <div className="col-span-2 font-medium text-center">Total</div>
            <div className="col-span-1 font-medium text-center">Action</div>
          </div>

          {/* Empty Cart State */}
          <AnimatePresence>
            {isCartEmpty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-12 text-center"
              >
                <div className="mx-auto w-24 h-24 bg-[#99f2c8]/20 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-10 h-10 text-[#1f4037]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1f4037] mb-2">
                  Your cart is empty
                </h2>
                <p className="text-[#1f4037]/70 max-w-md mx-auto mb-6">
                  Looks like you haven't added anything to your cart yet. Start
                  shopping to discover delicious meals!
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/#explore_menu")}
                  className="px-8 py-3 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] text-white rounded-xl font-medium shadow-md hover:from-[#1f4037] hover:to-[#99f2c8] transition-all"
                >
                  Browse Menu
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart Items */}
          <AnimatePresence>
            {!isCartEmpty && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {menu_list2.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className="grid grid-cols-4 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 border-b border-[#99f2c8]/20 hover:bg-[#99f2c8]/10 transition-colors"
                      >
                        {/* Item Image & Name (Mobile) */}
                        <div className="col-span-3 md:col-span-5 flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#99f2c8]/30">
                            <img
                              src={url + "/images/" + item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute md:hidden top-1 right-1 bg-[#99f2c8] text-[#1f4037] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {cartItems[item._id]}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-[#1f4037] line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="md:hidden text-sm text-[#99f2c8] font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Price (Desktop) */}
                        <div className="hidden md:flex md:col-span-2 justify-center">
                          <p className="text-[#1f4037]/80 font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        {/* Quantity */}
                        <div className="hidden md:flex md:col-span-2 justify-center">
                          <div className="flex items-center space-x-2 bg-[#f6fefb] rounded-full px-3 py-1 border border-[#99f2c8]/30">
                            {/* Decrease or Remove Button */}
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-[#1f4037] hover:text-[#99f2c8] w-6 h-6 flex items-center justify-center"
                            >
                              {(cartItems[item._id] || 0) > 1 ? (
                                "-"
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>

                            {/* Quantity Display */}
                            <span className="font-medium text-[#1f4037] min-w-[20px] text-center">
                              {cartItems[item._id] || 0}
                            </span>

                            {/* Increase Button */}
                            <button
                              onClick={() => {
                                if ((cartItems[item._id] || 0) < 10) {
                                  addToCart(item._id);
                                } else {
                                  alert("Maximum 10 items per dish allowed");
                                }
                              }}
                              className="text-[#1f4037] hover:text-[#99f2c8] w-6 h-6 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total (Desktop) */}
                        <div className="hidden md:flex md:col-span-2 justify-center">
                          <p className="font-medium text-[#1f4037]">
                            ${(cartItems[item._id] * item.price).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove (Desktop) */}
                        <div className="hidden md:flex md:col-span-1 justify-center">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-[#99f2c8] hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="col-span-1 md:hidden flex flex-col items-end justify-between h-full">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-[#99f2c8] hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <p className="font-medium text-[#1f4037]">
                            ${(cartItems[item._id] * item.price).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Cart Summary */}
          {!isCartEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-[#f6fefb] border-t border-[#99f2c8]/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Promo Code */}
                <div className="bg-white p-5 rounded-xl border border-[#99f2c8]/30 shadow-sm">
                  <h3 className="flex items-center text-lg font-semibold text-[#1f4037] mb-4">
                    <Tag className="w-5 h-5 text-[#99f2c8] mr-2" />
                    Apply Promo Code
                  </h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 border border-[#99f2c8]/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent text-[#1f4037] bg-[#f6fefb] placeholder-[#1f4037]/30"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] hover:transform hover:duration-300 hover:shadow-lg  text-white font-medium rounded-r-lg transition-colors shadow-sm">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-5 rounded-xl border border-[#99f2c8]/30 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#1f4037] mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#1f4037]/70">Subtotal:</span>
                      <span className="font-medium text-[#1f4037]">
                        ${getTotalCartAmount().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1f4037]/70">Delivery Fee:</span>
                      <span className="font-medium text-[#1f4037]">
                        ${getTotalCartAmount() === 0 ? 0 : 2.99}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-[#99f2c8]/20">
                      <span className="font-semibold text-[#1f4037]">
                        Total:
                      </span>
                      <span className="font-bold text-[#99f2c8]">
                        $
                        {(
                          getTotalCartAmount() +
                          (getTotalCartAmount() === 0 ? 0 : 2.99)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate("/order")}
                    className="w-full py-4 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
