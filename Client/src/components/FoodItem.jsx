import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Star, Plus, Minus, ShoppingCart } from "lucide-react";

const FoodItem = React.memo(({ id, name, price, description, image }) => {
  const {
    cartItems = {},
    addToCart,
    removeFromCart,
    url,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleOrderNow = () => {
    cartItems && cartItems[id]
      ? navigate("/cart")
      : toast.error("Please select the quantity first");
  };

  const handleAddToCart = (itemId) => {
    if (!token) {
      toast.error("Please login to add items to cart");
    } else if (cartItems[itemId] && cartItems[itemId] >= 10) {
      toast.error("Maximum 10 items allowed per dish");
    } else {
      addToCart(itemId);
      toast.success(`${name} added to cart`);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    if (!token) {
      toast.error("Please login to modify cart");
    } else {
      removeFromCart(itemId);
      toast.success(`${name} removed from cart`);
    }
  };

  return (
    <motion.div className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-[#1f4037]/20 hover:shadow-2xl transition-all duration-300 group">
      {/* Image with floating action buttons */}
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-3xl">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-lg px-2.5 py-1.5 rounded-full flex items-center shadow-md border border-[#99f2c8]/40">
          <Star className="w-4 h-4 fill-[#99f2c8] text-[#99f2c8] mr-1" />
          <span className="text-sm font-semibold text-[#1f4037]">4.8</span>
        </div>

        {/* Cart actions */}
        <div className="absolute bottom-3 right-3">
          {!cartItems || !cartItems[id] ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => handleAddToCart(id)}
              className="p-2 bg-gradient-to-tr from-[#99f2c8] to-[#1f4037] text-white rounded-full shadow-lg hover:from-[#1f4037] hover:to-[#99f2c8] transition-all duration-200"
              aria-label="Add to cart"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center bg-white/90 backdrop-blur-lg border border-[#1f4037]/20 rounded-full shadow-lg px-2 py-1"
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleRemoveFromCart(id)}
                className="p-1 text-[#1f4037] hover:bg-[#99f2c8]/20 rounded-full transition-colors"
                aria-label="Remove from cart"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="mx-2 font-semibold text-[#1f4037] min-w-[20px] text-center">
                {cartItems[id]}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleAddToCart(id)}
                className="p-1 text-[#1f4037] hover:bg-[#99f2c8]/20 rounded-full transition-colors"
                aria-label="Add more"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#1f4037] truncate max-w-[70%]">
            {name}
          </h3>
          <span className="text-[#99f2c8] font-extrabold text-base sm:text-lg">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="text-[#1f4037]/80 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <button
          onClick={handleOrderNow}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] hover:sh text-white py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-2xl transition-all duration-300"
        >
          <ShoppingCart className="w-4 h-4" />
          Order Now
        </button>
      </div>
    </motion.div>
  );
});

export default FoodItem;
