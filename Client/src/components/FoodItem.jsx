import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast from react-hot-toast
import star from "../assets/starIcon.svg";
import add from "../assets/add.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

const FoodItem = React.memo(({ id, name, price, description, image }) => {
  const { cartItems = {}, addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Function to handle the Order Now button click
  const handleOrderNow = () => {
    cartItems && cartItems[id]
      ? navigate("/cart")
      : toast.error("Please select the quantity.");
  };

  // Function to check if user is logged in (i.e., token exists)
  const handleAddToCart = (itemId) => {
    if (!token) {
      toast.error("Please log in to add items to the cart!");
    } else {
      // Check if the cart item count is less than 10 before adding
      if (cartItems[itemId] && cartItems[itemId] >= 10) {
        toast.error("You cannot add more than 10 items.");
      } else {
        addToCart(itemId);
      }
    }
  };


  const handleRemoveFromCart = (itemId) => {
    if (!token) {
      toast.error("Please log in to modify cart items!");
    } else {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-lg">
      <img
        src={url + "/images/" + image}
        alt={name}
        className="w-full h-48 bg-gray-600 object-cover rounded-b-lg object-center "
      />
      <div className="p-6">
        <div className="flex justify-between items-center   h-16 p-1 ">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <img
            src={star}
            alt="Rating"
            className="w-10 h-10 object-cover object-center"
          />
          {/* Add/Minus/Plus Button */}
          {(!cartItems || !cartItems[id]) ? (
            <img
              src={add}
              alt="Add"
              className="w-10 h-10 object-cover object-center cursor-pointer absolute top-36 right-4 bg-white rounded-full p-1 flex items-center justify-center transition-transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleAddToCart(id)}
            />
          ) : (
            <div className="absolute top-36 right-4 flex items-center justify-center bg-white rounded-full p-1 shadow-lg">
              {/* Minus button */}
              <img
                onClick={() => handleRemoveFromCart(id)}
                src={minus}
                alt="Minus"
                className="cursor-pointer mr-2 w-8 h-8 hover:bg-gray-200 p-1 rounded-full transition-colors duration-300"
              />
              {/* Item count */}
              <p className="text-gray-700 text-lg font-semibold">
                {cartItems[id]}
              </p>
              {/* Plus button */}
              <img
                onClick={() => handleAddToCart(id)}
                src={plus}
                alt="Plus"
                className="cursor-pointer ml-2 w-8 h-8 hover:bg-gray-200 p-1 rounded-full transition-colors duration-300"
              />
            </div>
          )}
        </div>
        <hr />

        <p className="text-gray-700 text-sm mb-[10px] mt-2 line-clamp-2 leading-relaxed overflow-hidden h-12 p-1 ">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <span className="text-xl sm:text-2xl md:text-3xl leading-relaxed font-bold text-green-600">
            ${price}
          </span>
          <button
            className="w-full sm:w-auto bg-green-600 text-white px-3 xl:px-6 py-3 text-sm sm:text-base rounded-md hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
});

export default FoodItem;
