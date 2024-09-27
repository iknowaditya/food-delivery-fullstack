import React from "react";
import logo from "../assets/logo.svg";
import google from "../assets/google.svg";
import apple from "../assets/iphone.svg";

const AppDownload = () => {
  return (
    <div className="text-center p-6 " id="app_download">
      <p className="text-3xl text-gray-800 font-bold ">
        For a Better Experience, Download <br />
        <img src={logo} alt="App Logo" className="w-24 mx-auto mt-6" />
      </p>
      <div className="flex justify-center space-x-5">
        <img
          src={google}
          alt="Google Play"
          className="w-48 transition-transform transform hover:scale-105"
        />
        <img
          src={apple}
          alt="App Store"
          className="w-48 transition-transform transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AppDownload;
