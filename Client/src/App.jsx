import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPopUp from "./components/LoginPopUp";
import { Toaster } from 'react-hot-toast';
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <Toaster 
         position="bottom-right"
         reverseOrder={true}
      />
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
