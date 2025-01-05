"use client";

import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import Image from "next/image";
import { faqData } from "../data/data";



export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col  lg:flex-row-reverse items-center lg:items-start lg:gap-10 px-6 py-16 bg-gray-50 ">
      {/* Left Image Section */}
      <div className="lg:w-1/2 w-full  mb-8 lg:mb-0">
        <Image
          src="/treatment/Consutation.jpg"
          alt="FAQ Illustration"
          width={700}
          height={700}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right FAQ Section */}
      <div className="lg:w-1/2 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-100"
              >
                <span className="text-lg font-medium text-gray-800">
                  {item.question}
                </span>
                <span className="text-gray-500">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
