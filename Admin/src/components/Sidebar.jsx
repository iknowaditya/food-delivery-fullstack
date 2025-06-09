import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  List,
  ShoppingBag,
  Settings,
  Users,
  BarChart2,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      icon: <PlusCircle className="w-6 h-6" />,
      text: "Add Items",
      path: "/",
      color: "text-[#1f4037]",
    },
    {
      icon: <List className="w-6 h-6" />,
      text: "List Items",
      path: "/list",
      color: "text-[#1f4037]",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      text: "Orders",
      path: "/orders",
      color: "text-[#1f4037]",
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Users",
      path: "/users",
      color: "text-[#1f4037]",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      text: "Analytics",
      path: "/analytics",
      color: "text-[#1f4037]",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      text: "Settings",
      path: "/settings",
      color: "text-[#1f4037]",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      text: "Help",
      path: "/help",
      color: "text-[#1f4037]",
    },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed top-0 left-0 h-screen bg-white border-r border-[#99f2c8]/30 w-[80px] md:w-[240px] shadow-lg z-40 pt-20 overflow-y-auto"
    >
      <div className="flex flex-col p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#1f4037] to-[#99f2c8] text-white shadow-md"
                  : "text-[#1f4037] hover:bg-[#99f2c8]/10 hover:shadow-sm"
              }`
            }
          >
            <motion.div whileHover={{ scale: 1.1 }} className={`${item.color}`}>
              {item.icon}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hidden md:block font-medium text-sm"
            >
              {item.text}
            </motion.span>
          </NavLink>
        ))}
      </div>

      {/* Branding */}
      <div className="absolute bottom-4 left-0 right-0 px-4 hidden md:block">
        <div className="p-3 bg-[#f8fafb] rounded-lg border border-[#99f2c8]/30 text-center">
          <p className="text-xs text-[#1f4037]/70">Admin Dashboard v2.0</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
