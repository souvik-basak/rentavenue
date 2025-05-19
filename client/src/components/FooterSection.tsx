"use client";

import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const footerLinks = ["About", "Privacy", "Terms", "Contact"];
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com" },
    { icon: <Instagram size={20} />, href: "https://instagram.com" },
    { icon: <Twitter size={20} />, href: "https://twitter.com" },
    { icon: <Youtube size={20} />, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-[#f9f7f5] text-neutral-900 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Navigation Links */}
        <div className="flex gap-8 flex-wrap justify-center md:justify-start">
          {footerLinks.map((link, index) => (
            <motion.a
              key={index}
              href="#"
              className="relative text-lg font-medium pb-2"
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              {link}

              {/* Brush Stroke Animation */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute left-0 bottom-0 w-full h-3"
              >
                <motion.path
                  d="M0 5 Q 25 10 50 5 T 100 5"
                  fill="none"
                  stroke="#d19300"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    rest: { pathLength: 0, opacity: 0 },
                    hover: { pathLength: 1, opacity: 1 },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-10 text-center text-sm text-neutral-600"
      >
        © {year} Rentavenue. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
