import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, LogOut, ListOrdered } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartItems, token, logout } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      !event.target.closest(".mobile-menu-button")
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (newMenu) => {
    setMenu(newMenu);
    setIsMobileMenuOpen(false);
  };

  // Custom NavItem for consistent coloring
  const NavItem = ({ to, id, children, menuKey }) => (
    <Link
      to={to}
      className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 group ${
        menu === menuKey ? "text-[#99f2c8]" : "text-white hover:text-[#99f2c8]"
      }`}
      onClick={() => {
        handleNavClick(menuKey);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#99f2c8] transition-all duration-300 ${
          menu === menuKey
            ? "opacity-100"
            : "opacity-0 group-hover:w-6 group-hover:opacity-70"
        }`}
      ></span>
    </Link>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1f4037]/95 backdrop-blur-md border-b border-[#99f2c8]/20 py-2 shadow-lg"
            : "bg- py-4"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center"
              >
                <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#264e43] via-[#99f2c8] to-[#99f2c8] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(16,185,129,0.12)] group-hover:drop-shadow-lg">
                  DesiBite
                </span>
              </motion.div>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavItem to="#home" id="home" menuKey="home">
                Home
              </NavItem>
              <NavItem to="#explore_menu" id="explore_menu" menuKey="menu">
                Menu
              </NavItem>
              <NavItem
                to="#app_download"
                id="app_download"
                menuKey="mobile-app"
              >
                Blog
              </NavItem>
              <NavItem to="#footer" id="footer" menuKey="footer">
                Contact
              </NavItem>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <div className="relative">
                <Link
                  to="/cart"
                  className="p-2 rounded-lg hover:bg-[#99f2c8]/10 transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingBag className="h-5 w-5 text-white" />
                  {getTotalCartItems() > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-[#99f2c8] text-xs text-[#1f4037] rounded-full shadow-md font-bold">
                      {getTotalCartItems()}
                    </span>
                  )}
                </Link>
              </div>
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-[#99f2c8]/10 transition-colors duration-200 mobile-menu-button"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>

              {/* Auth section */}
              <div className="relative" ref={dropdownRef}>
                {!token ? (
                  <Button
                    onClick={() => setShowLogin(true)}
                    className="hidden md:flex items-center gap-2 bg-[#99f2c8] text-[#1f4037] px-5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:bg-[#88e0b0] font-semibold"
                  >
                    Sign In
                  </Button>
                ) : (
                  <div className="flex items-center">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#99f2c8]/20 border border-[#99f2c8]/40 hover:bg-[#99f2c8]/40 transition-colors duration-200"
                    >
                      <User className="h-5 w-5 text-white" />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-12 w-56 bg-[#1f4037]/95 backdrop-blur-md rounded-lg shadow-xl border border-[#99f2c8]/30 overflow-hidden z-50"
                        >
                          <div className="p-1">
                            <button
                              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-[#99f2c8]/10 transition-colors duration-200 text-white/90 hover:text-white"
                              onClick={() => {
                                navigate("/myorders");
                                setIsDropdownOpen(false);
                              }}
                            >
                              <ListOrdered className="h-5 w-5" />
                              <span className="text-sm font-medium">
                                My Orders
                              </span>
                            </button>
                            <button
                              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-[#99f2c8]/10 transition-colors duration-200 text-white/90 hover:text-white"
                              onClick={() => {
                                logout();
                                setIsDropdownOpen(false);
                              }}
                            >
                              <LogOut className="h-5 w-5" />
                              <span className="text-sm font-medium">
                                Log Out
                              </span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed inset-0 z-40 mt-16 bg-[#1f4037]/95 backdrop-blur-lg md:hidden"
          >
            <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
              <div className="flex flex-col space-y-6">
                <NavItem to="#home" id="home" menuKey="home">
                  Home
                </NavItem>
                <NavItem to="#explore_menu" id="explore_menu" menuKey="menu">
                  Menu
                </NavItem>
                <NavItem
                  to="#app_download"
                  id="app_download"
                  menuKey="mobile-app"
                >
                  Blog
                </NavItem>
                <NavItem to="#footer" id="footer" menuKey="footer">
                  Contact Us
                </NavItem>

                {!token && (
                  <div className="pt-6">
                    <Button
                      onClick={() => {
                        setShowLogin(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#99f2c8] text-[#1f4037] py-4 rounded-lg font-semibold hover:bg-white"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
