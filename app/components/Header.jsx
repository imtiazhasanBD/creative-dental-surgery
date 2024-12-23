"use client";
import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";
import { CiMap } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md max-w-[1400px] mx-auto">
      {/* Top Header */}
      <div className="lg:flex items-center justify-between space-x-4 px-10 py-4 border-b border-gray-200 hidden">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <FiPhoneCall className="text-customBlue" />
            <p className="text-gray-500 font-semibold text-xs">+01757-338336</p>
          </span>
          <span className="flex items-center gap-2">
            <CiMap className="text-customBlue" />
            <p className="text-gray-500 font-semibold text-xs">
              Station road ( Opposite to Kishoreganj Model Thana), Kishoreganj
            </p>
          </span>
        </div>
        <span className="flex items-center gap-2">
          <RxCalendar className="text-customBlue" />
          <p className="text-gray-500 font-semibold text-xs">
            Opening Hours: Satur - Fri 4:00 - 10:00 pm
          </p>
        </span>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between lg:px-8 p-4 lg:py-6 sticky top-0 bg-white z-50 shadow-md">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image src="/logo.webp" alt="logo" width={50} height={50} />
          <h1 className="text-xl lg:text-2xl text-customBlue font-medium">
            Creative Dental Surgery
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="lg:flex items-center space-x-6 hidden">
          <ul className="flex space-x-6 text-gray-700 font-semibold">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
          <button className="bg-customBlue p-4 text-white rounded-lg text-base font-semibold">
            BOOK APPOINTMENT
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <FaBars
          className="text-3xl text-customBlue lg:hidden"
          onClick={toggleMobileMenu}
        />

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-40">
            <div className="bg-white w-64 h-full shadow-lg p-4">
              {/* Close Icon */}
              <FaTimes
                className="text-3xl text-customBlue mb-4"
                onClick={toggleMobileMenu}
              />

              {/* Navigation Links */}
              <ul className="space-y-4 text-gray-700 font-semibold">
                <li onClick={toggleMobileMenu}>Home</li>
                <li onClick={toggleMobileMenu}>About</li>
                <li onClick={toggleMobileMenu}>Services</li>
                <li onClick={toggleMobileMenu}>Contact</li>
              </ul>
              <button
                className="bg-customBlue mt-6 w-full p-4 text-white rounded-lg text-base font-semibold"
                onClick={toggleMobileMenu}
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
