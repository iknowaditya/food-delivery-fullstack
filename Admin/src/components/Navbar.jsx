import React from "react";
import { motion } from "framer-motion";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#99f2c8]/30 shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-[#1f4037] hover:bg-[#99f2c8]/20 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </motion.button>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#1f4037] to-[#99f2c8] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <h1 className="hidden md:block text-xl font-bold text-[#1f4037]">
                Admin Dashboard
              </h1>
            </motion.div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#1f4037]/50" />
              </div>
              <input
                type="text"
                placeholder="Search analytics, reports..."
                className="block w-full pl-10 pr-3 py-2 border border-[#99f2c8]/50 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent text-[#1f4037] placeholder-[#1f4037]/50"
              />
            </div>
          </div>

          {/* Right Section - User Controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full relative text-[#1f4037] hover:bg-[#99f2c8]/20"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f4037] to-[#99f2c8] flex items-center justify-center shadow-md">
                  <span className="text-white font-medium">AD</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-medium text-[#1f4037]">Admin User</p>
                <p className="text-xs text-[#1f4037]/70">Super Admin</p>
              </div>

              <ChevronDown className="hidden md:block w-4 h-4 text-[#1f4037]/50" />
            </motion.div>
          </div>
        </div>

        {/* Mobile Search (hidden on desktop) */}
        <div className="mt-3 lg:hidden">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-[#1f4037]/50" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-[#99f2c8]/50 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent text-[#1f4037] placeholder-[#1f4037]/50"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
