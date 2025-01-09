"use client";
import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { scrollToSection } from "./scrollToSection";

const NavbarForMobile = ({ isOpen, toggleSidebar }) => {
  // Lock and unlock scroll based on selectedImage state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed h-full z-50 top-0 right-0 lg:hidden">
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="w-full h-screen inset-0 z-[1000] bg-black opacity-70 fixed"
        ></div>
      )}
      <div
        className={`h-full w-3/4 sm:w-2/5 lg:w-2/6 xl:w-1/4 flex flex-col justify-center p-7 text-gray-900 font-medium dark:text-white space-y-6 fixed bg-white dark:bg-background z-[1006]  transform transition-transform duration-500 ease-in-out ${
          !isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <li
          onClick={() => {
            toggleSidebar();
            scrollToSection("about");
          }}
          className="text-xl pb-2 active:text-customBlue mx-auto list-none"
        >
          About
        </li>
        <li
          onClick={() => {
            toggleSidebar();
            scrollToSection("services");
          }}
          className="text-xl pb-2 active:text-customBlue mx-auto list-none"
        >
          Services
        </li>
        <li
          onClick={() => {
            toggleSidebar();
            scrollToSection("contact");
          }}
          className="text-xl pb-2 active:text-customBlue mx-auto list-none"
        >
          Contact
        </li>
        <button
          onClick={() => {
            toggleSidebar();
            scrollToSection("appointment")}}
          className="text-xl font-semibold py-3 px-8 bg-customGradient text-customBlue rounded-md hover:text-black m-auto border border-custext-customBlue"
        >
          BOOK APPOINTMENT
        </button>
        {/* Close button */}
        <CgClose
          onClick={toggleSidebar}
          className="absolute top-3 right-6  sm:w-8 sm:h-8 w-6 h-6 text-customGreen"
        />
      </div>
    </div>
  );
};

export default NavbarForMobile;
