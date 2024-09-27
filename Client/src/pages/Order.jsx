import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Order = () => {
  const { getTotalCartAmount, token, menu_list2, cartItems, url } = useContext(StoreContext);

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
    
    // Ensure that menu_list2 is available before mapping
    menu_list2.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy of the item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // You may want to send orderItems to your backend here
    let orderData = {
      address: data, 
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url + "/api/order/placeOrder", orderData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);  
      console.log("Order placed successfully");
      alert("Order placed successfully");
    } else {
      console.log("Failed to place order");
      alert("Failed to place order");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <form className="max-w-7xl mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-28 lg:mt-28" id="order" onSubmit={placeOrder}>
        {/* Left Side: Delivery Information */}
        <div className="placeOrderLeftSide bg-white shadow-lg rounded-lg p-6 lg:p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">
            Delivery Information
          </h2>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email Address"
            required // Added required attribute
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Street */}
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            required // Added required attribute
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Zip Code & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="zipCode"
              onChange={onChangeHandler}
              value={data.zipCode}
              type="text"
              placeholder="Zip Code"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              required // Added required attribute
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            required // Added required attribute
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Right Side: Cart Summary */}
        <div className="placeOrderRightSide bg-white shadow-lg rounded-lg p-6 lg:p-8 border border-gray-200">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-green-300 relative overflow-hidden">
            {/* Decorative Green Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-green-700 tracking-wide text-center">
                Cart Summary
              </h2>

              <div className="flex flex-col space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-lg">Subtotal:</p>
                  <p className="font-semibold text-lg">
                    ${getTotalCartAmount()}
                  </p>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-lg">Delivery Fee:</p>
                  <p className="font-semibold text-lg">
                    ${getTotalCartAmount() === 0 ? 0 : 2}
                  </p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-green-700">
                  <p className="text-xl font-bold">Total:</p>
                  <p className="text-xl font-bold">
                    ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </p>
                </div>
              </div>

              {/* Divider Line */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* Proceed Button */}
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform text-lg font-semibold transform hover:scale-[1.01] duration-300 hover:duration-300 ease-in-out" type="submit">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Order;
