import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, menu_list2, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isCartEmpty = Object.values(cartItems).every(
    (quantity) => quantity === 0
  );

  return (
    <>
      {/* Cart Section */}
      <div className="bg-white p-4 md:p-6 lg:p-8 border rounded-lg shadow-xl max-w-5xl mx-auto my-28 md:my-32 lg:my-40">
        {/* Cart Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 bg-green-600 text-white py-4 px-4 rounded-lg text-center">
          <p className="font-semibold">Items</p>
          <p className="font-semibold">Title</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold">Quantity</p>
          <p className="font-semibold">Total</p>
          <p className="font-semibold">Remove</p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* If the cart is empty */}
        {isCartEmpty ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty!
            </h2>
            <p className="mt-4 text-gray-600">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <p className="mt-2 text-green-600 font-semibold">
              Start shopping now and fill it with some amazing items!
            </p>
            <button
              onClick={() => navigate("/#explore_menu")}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              Go to Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            {menu_list2.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 items-center text-center mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={url+"/images/"+item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <p className="text-gray-800 font-semibold">
                      {cartItems[item._id]}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      ${(cartItems[item._id] * item.price).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 font-bold text-xl"
                    >
                      X
                    </button>
                  </div>
                );
              }
            })}
          </>
        )}

        {/* Cart Total Section */}
        {!isCartEmpty && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-md border border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-800 tracking-wide">
              Cart Summary
            </h2>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Subtotal:</p>
                <p className="font-semibold text-lg">${getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Delivery Fee:</p>
                <p className="font-semibold text-lg">
                  ${getTotalCartAmount() === 0 ? 0 : 2}
                </p>
              </div>
              <div className="flex justify-between items-center text-green-700">
                <p className="font-bold text-xl">Total:</p>
                <p className="font-bold text-xl">
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </p>
              </div>
            </div>
            <button
              className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg hover:bg-green-700 transition-all text-lg font-semibold shadow-lg"
              onClick={() => navigate("/order")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {/* Promo Code Section */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-md border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800 tracking-wide">
            Promo Code
          </h2>
          <p className="text-gray-600 mb-4">
            If you have a promo code, enter it here to get a discount!
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Enter Code"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all font-semibold shadow-md">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
