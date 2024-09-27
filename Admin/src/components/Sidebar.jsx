import React from 'react';
import add from "../assets/addItem.svg";
import list from "../assets/list.svg";
import order from "../assets/order.svg";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-white border h-screen p-6 fixed top-20 md:top-24 left-0 w-[80px] md:w-[200px] lg:w-[240px] flex flex-col items-center md:items-start gap-6 shadow-lg overflow-y-auto sidebar'>
      <NavLink 
        to='/' 
        className={({ isActive }) => 
          `flex items-center gap-4 p-2 w-full rounded-lg transition-colors duration-300 ${
            isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <img src={add} alt='Add' className='w-8 h-8' />
        <p className='hidden md:block font-semibold'>Add Items</p>
      </NavLink>

      <NavLink 
        to='/list' 
        className={({ isActive }) => 
          `flex items-center gap-4 p-2 w-full rounded-lg transition-colors duration-300 ${
            isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <img src={list} alt='List' className='w-8 h-8' />
        <p className='hidden md:block font-semibold'>List Items</p>
      </NavLink>

      <NavLink 
        to='/orders' 
        className={({ isActive }) => 
          `flex items-center gap-4 p-2 w-full rounded-lg transition-colors duration-300 ${
            isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <img src={order} alt='Orders' className='w-8 h-8' />
        <p className='hidden md:block font-semibold'>Orders</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
