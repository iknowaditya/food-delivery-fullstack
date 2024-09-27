import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import toast from 'react-hot-toast';

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      let newUrl = url;

      // Determine the appropriate endpoint
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else if (currState === "Sign up") {
        newUrl += "/api/user/register";
      }

      // Send request to the server
      const response = await axios.post(newUrl, data);
      
      console.log(response.data);  // Log the full response to verify the structure

      if ((response.status === 200 || response.status === 201) && response.data.token) {
        // Ensure token exists in the response
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close login popup
        toast.success(`${currState} successful! Welcome!`);
      } else {
        // Handle unsuccessful login/register
        toast.error(response.data.message || "Failed to authenticate.");
      }
      
    } catch (error) {
      // Catch and display any errors from the request
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Popup container */}
        <div className="bg-white rounded-lg shadow-2xl w-96 p-8 relative">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-green-600">
              {currState === "Login" ? "Login" : "Sign Up"}
            </h2>
            {/* Close button */}
            <img
              onClick={() => setShowLogin(false)}
              src="https://img.icons8.com/ios-filled/50/000000/close-window.png"
              alt="close"
              className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
            />
          </div>

          {/* Form section */}
          <form className="space-y-6" onSubmit={onLogin}>
            {currState === "Sign up" && (
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
                required
                name="name"
                value={data.name}
                onChange={onChangeHandler}
              />
            )}

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              required
              name="email"
              value={data.email}
              onChange={onChangeHandler}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              required
              name="password"
              value={data.password}
              onChange={onChangeHandler}
            />

            {/* Remember me section */}
            <div className="flex items-center justify-start space-x-2">
  <input
    type="checkbox"
    className="cursor-pointer h-4 w-4 mb-4 text-green-600  transition duration-300"
    required
  />
  <label className="text-sm text-gray-600">
    By continuing, you agree to the terms and conditions
  </label>
</div>


            {/* Submit button */}
            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
              type="submit"
            >
              {currState === "Sign up" ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-sm text-center text-gray-700">
            {currState === "Login" ? (
              <p>
                Don’t have an account?{" "}
                <span
                  onClick={() => setCurrState("Sign up")}
                  className="text-green-600 cursor-pointer hover:underline font-semibold"
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setCurrState("Login")}
                  className="text-green-600 cursor-pointer hover:underline font-semibold"
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopUp;
