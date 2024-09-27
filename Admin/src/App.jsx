import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
     <Toaster />
      {/* Navbar should be at the top, above everything */}
      <Navbar />

      {/* Main content with sidebar and page content */}
      <div className='flex h-screen'>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Page content, adjusted for sidebar width */}
        <div className='flex-1 ml-[80px] md:ml-[200px] lg:ml-[240px] p-4 overflow-y-auto'>
          <div className="mt-24"> {/* Add margin to create space below navbar */}
            <Routes>
              <Route path="/" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
