import React from "react";
import fb from "../assets/fb.svg";
import link from "../assets/linked.svg";
import youtube from "../assets/youtube.svg";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer
      className="bg-green-800 text-white py-10 mt-12 max-w-[1300px] mx-auto px-16"
      id="footer"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col">
            <img src={logo} alt="Company Logo" className="mb-4 w-32" />
            <p className="mb-4 text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4 mt-2 cursor-pointer">
              {/* Social Icons */}
              {[
                { src: fb, alt: "Facebook", bg: "bg-blue-400" },
                { src: youtube, alt: "YouTube", bg: "bg-red-600" },
                { src: link, alt: "LinkedIn", bg: "bg-yellow-500" },
              ].map(({ src, alt, bg }) => (
                <div key={alt} className="relative group">
                  <img
                    src={src}
                    alt={alt}
                    className="w-8 h-8 cursor-pointer transition-transform duration-200"
                  />
                  <div
                    className={`absolute inset-0 ${bg} opacity-0 group-hover:opacity-50 rounded-full transition-opacity duration-200`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              {["Home", "About", "Delivery", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Get In Touch</h2>
            <ul className="space-y-2">
              <li>+1234 567 890</li>
              <li>contact@tom.com</li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />
        <p className="text-center text-sm text-gray-300">
          © 2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
