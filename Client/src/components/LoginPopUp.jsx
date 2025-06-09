import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
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

      if (
        (response.status === 200 || response.status === 201) &&
        response.data.token
      ) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        setShowLogin(false);
        toast.success(
          `${currState} successful! Welcome, ${response.data.user.name}!`,
          {
            duration: 3000,
            zIndex: 9999,
          }
        );
      } else {
        toast.error(response.data.message || "Failed to authenticate.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);
    console.log("Google JWT Decoded:", decoded);

    try {
      const response = await axios.post(`${url}/api/auth/google-login`, {
        token: credential,
      });

      if (response.status === 200 && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        setShowLogin(false);
        toast.success(`Login successful! Welcome, ${response.data.user.name}!`);
      } else {
        toast.error("Google login failed.");
      }
    } catch (error) {
      toast.error("Something went wrong with Google login.");
      console.error("Google login error:", error);
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-[#1f4037]/70 flex items-center justify-center z-50">
        {/* Popup container */}
        <div className="bg-white rounded-2xl shadow-2xl w-96 p-8 relative border border-[#99f2c8]/30">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#1f4037]">
              {currState === "Login" ? "Login" : "Sign Up"}
            </h2>
            {/* Close button */}
            <img
              onClick={() => setShowLogin(false)}
              src="https://img.icons8.com/ios-filled/50/99f2c8/close-window.png"
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
                className="w-full p-3 border border-[#99f2c8]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] transition duration-300 text-[#1f4037] placeholder-[#1f4037]/30 bg-[#f6fefb]"
                required
                name="name"
                value={data.name}
                onChange={onChangeHandler}
              />
            )}

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-[#99f2c8]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] transition duration-300 text-[#1f4037] placeholder-[#1f4037]/30 bg-[#f6fefb]"
              required
              name="email"
              value={data.email}
              onChange={onChangeHandler}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-[#99f2c8]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99f2c8] transition duration-300 text-[#1f4037] placeholder-[#1f4037]/30 bg-[#f6fefb]"
              required
              name="password"
              value={data.password}
              onChange={onChangeHandler}
            />

            {/* Remember me section */}
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                className="cursor-pointer h-4 w-4 mb-4 accent-[#99f2c8] border border-[#99f2c8]/50 transition duration-300"
                required
              />
              <label className="text-sm text-[#1f4037]/70">
                By continuing, you agree to the terms and conditions
              </label>
            </div>

            {/* Submit button */}
            <button
              className="w-full bg-gradient-to-r from-[#99f2c8] to-[#1f4037] text-white py-2 rounded-lg hover:from-[#1f4037] hover:to-[#99f2c8] transition duration-300 font-semibold shadow"
              type="submit"
            >
              {currState === "Sign up" ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Google login button */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed")}
              theme="outline"
              size="medium"
              width="100%"
            />
          </div>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-sm text-center text-[#1f4037]/80">
            {currState === "Login" ? (
              <p>
                Don’t have an account?{" "}
                <span
                  onClick={() => setCurrState("Sign up")}
                  className="text-[#99f2c8] cursor-pointer hover:underline font-semibold"
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setCurrState("Login")}
                  className="text-[#99f2c8] cursor-pointer hover:underline font-semibold"
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
