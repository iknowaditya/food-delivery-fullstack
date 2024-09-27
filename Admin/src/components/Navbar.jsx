import React from 'react';
import logo from '../assets/logo.svg';
import avtar from '../assets/avtar.svg';

const Navbar = () => {
  return (
    <nav className="navbar bg-white shadow-lg w-full fixed top-0">
      <div className="w-full mx-auto px-12 ">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm md:text-base lg:text-lg font-semibold">
              Admin Dashboard
            </h1>
          </div>

          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <img src={avtar} alt="Avatar" className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-green-600 hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
