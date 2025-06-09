import React from "react";
import fb from "../assets/fb.svg";
import link from "../assets/linked.svg";
import youtube from "../assets/youtube.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="relative bg-gradient-to-tr from-[#1f4037] via-[#223b2f] to-[#1f4037]/90 text-white py-14 px-4 md:px-16 rounded-t-3xl shadow-2xl overflow-hidden border-t border-[#99f2c8]/20"
      id="footer"
    >
      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#99f2c8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#99f2c8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center"
              >
                <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#33695a] via-[#99f2c8] to-[#99f2c8] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(16,185,129,0.12)] group-hover:drop-shadow-lg">
                  DesiBite
                </span>
              </motion.div>
            </Link>
            <p className="my-4 text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4 mt-2">
              {/* Social Icons */}
              {[
                { src: fb, alt: "Facebook" },
                { src: youtube, alt: "YouTube" },
                { src: link, alt: "LinkedIn" },
              ].map(({ src, alt }) => (
                <a
                  key={alt}
                  href="#"
                  aria-label={alt}
                  className="relative group rounded-full p-1 transition-all duration-200 hover:bg-[#99f2c8]/20"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-8 h-8 z-10 opacity-80 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-xl font-extrabold mb-5 tracking-wide text-white">
              Company
            </h2>
            <ul className="space-y-3">
              {["Home", "About", "Delivery", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-[#99f2c8] font-medium transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-extrabold mb-5 tracking-wide text-white">
              Get In Touch
            </h2>
            <ul className="space-y-3 text-white/80 font-medium">
              <li>
                <span className="inline-block mr-2">📞</span>
                +1234 567 890
              </li>
              <li>
                <span className="inline-block mr-2">✉️</span>
                contact@tom.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-[#99f2c8]/20" />
        <p className="text-center text-sm text-white/60 tracking-wide">
          © 2025 <span className="font-semibold text-[#99f2c8]">DesiBite</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
