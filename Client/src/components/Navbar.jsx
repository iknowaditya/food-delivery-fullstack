import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import avtar from "../assets/avtar.svg";
import order from "../assets/order.svg";
import logoutimg from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import cartIcon from "../assets/cart.svg"

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, logout } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to detect outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle link clicks and update the state
  const handleClick = (newMenu) => {
    setMenu(newMenu);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-20 mx-auto w-full max-w-screen-md border border-gray-100 bg-[#e1e1e1] px-4 py-4 shadow-lg backdrop-blur-lg md:top-6 md:rounded-full lg:max-w-screen-lg">
      <div className="px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link aria-current="page" className="flex items-center" to="/">
            <img
              src={logo}
              className="h-8 w-auto"
              alt="Yamm Logo"
            />
          </Link>

          {/* Navigation Links (hidden on small screens) */}
          <nav className="hidden md:flex md:items-center md:gap-5">
            <ul className="flex space-x-5">
              <li>
                <Link
                  to="#home"
                  className={`${menu === "home"
                    ? "pb-2 border-b-2 border-green-600 text-green-600 transition-all delay-100 ease-in  duration-200 "
                    : "pb-2 border-b-2 border-transparent"
                    } inline-block px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200`}
                  onClick={() => {
                    handleClick("home");
                    document
                      .getElementById("home")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#explore_menu"
                  className={`${menu === "menu"
                    ? "pb-2 border-b-2 border-green-600 text-green-600 transition-all delay-100 ease-in  duration-200 "
                    : "pb-2 border-b-2 border-transparent"
                    } inline-block px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200`}
                  onClick={() => {
                    handleClick("menu");
                    document
                      .getElementById("explore_menu")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="#app_download"
                  className={`${menu === "mobile-app"
                    ? "pb-2 border-b-2 border-green-600 text-green-600 transition-all delay-100 ease-in  duration-200 "
                    : "pb-2 border-b-2 border-transparent"
                    } inline-block px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200`}
                  onClick={() => {
                    handleClick("mobile-app");
                    document
                      .getElementById("app_download")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Mobile App
                </Link>
              </li>
              <li>
                <Link
                  to="#footer"
                  className={`${menu === "footer"
                    ? "pb-2 border-b-2 border-green-600 text-green-600 transition-all delay-100 ease-in  duration-200 "
                    : "pb-2 border-b-2 border-transparent"
                    } inline-block px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200`}
                  onClick={() => {
                    handleClick("footer");
                    document
                      .getElementById("footer")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <div className="flex items-center gap-6">
            <div className="relative inline-flex items-center">
              <Link to={"/cart"}>
                {" "}
                <img
                  src={cartIcon}
                  alt="Cart"
                  className="h-5 w-5 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              </Link>
              <span
                className={`${getTotalCartAmount() === 0
                  ? ""
                  : "absolute bg-red-500 h-2 w-2 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                  }`}
              ></span>
            </div>
            <div className="bg-gray-900 h-6 w-[2px] rounded-full"></div>
            <div className="relative" ref={dropdownRef}>
              {!token ? (
                <Button
                  onClick={() => setShowLogin(true)}
                  className="text-white bg-green-600 hover:bg-green-700 hover:border-green-600 hover:text-white border border-green-600 transition duration-300 rounded-full px-4 py-2"
                >
                  Sign In
                </Button>
              ) : (
                <div className="flex items-center relative">
                  <img
                    src={avtar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-600 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="relative">
                      <ul className="absolute top-10 right-0 w-48 p-4 bg-white rounded-lg shadow-lg z-10 transition-all ease-out duration-300 border border-green-200 flex flex-col">
                        <li
                          className="flex items-center space-x-2 p-3 hover:bg-green-100 transition-colors duration-200 rounded-lg cursor-pointer"
                          onClick={() => {
                            navigate("/myorders");
                            setIsDropdownOpen(false); // Close the dropdown after click
                          }}
                        >
                          <img src={order} alt="order" className="w-6 h-6" />
                          <p className="text-gray-800 font-medium">Orders</p>
                        </li>
                        <li
                          className="flex items-center space-x-2 p-3 hover:bg-green-100 transition-colors duration-200 rounded-lg cursor-pointer"
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false); // Close the dropdown after logout
                          }}
                        >
                          <img
                            src={logoutimg}
                            alt="log out"
                            className="w-6 h-6"
                          />
                          <p className="text-gray-800 font-medium">Log Out</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
