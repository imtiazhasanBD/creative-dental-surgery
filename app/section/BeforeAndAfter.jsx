"use client";
import React from "react";
import SectionHeader from "../components/SectionHeader";
import Image from "next/image";
import { scrollToSection } from "../components/scrollToSection";
import ImageComparisonSlider from "react-image-comparison-slider";
import ImageSlider from "react-image-comparison-slider";
import { ReactCompareSlider } from "react-compare-slider";

const BeforeAndAfter = () => {
  return (
<div className="flex flex-col lg:flex-row items-center justify-between bg-blue-100">
  {/* Text Section */}
  <div className="lg:w-1/2 text-left m-auto py-16 px-4 lg:px-20 lg:py-0">
    <SectionHeader title="Treatments"/>
    <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
      Before and After
    </h2>
    <p className="text-base md:text-lg font-medium mt-4 text-gray-700">
      Discover the remarkable transformations achieved through our expert
      dental treatments, showcasing healthy and confident smiles.
    </p>
    <button
      onClick={() => scrollToSection("appointment")}
      className="mt-6 inline-block bg-customBlue text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-all"
    >
      Book Appointment
    </button>
  </div>

  {/* Image Comparison Slider */}
  <div className="lg:w-1/2 w-full">
    <ReactCompareSlider
      itemOne={
        <img
          src="/treatment/before-after-teeth-whitening1.jpeg"
          alt="Before"
          className="object-cover w-full h-full"
        />
      }
      itemTwo={
        <img
          src="/treatment/before-after-teeth-whitening2.jpeg"
          alt="After"
          className="object-cover w-full h-full"
        />
      }
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "4 / 3",
      }}
    />
  </div>
</div>

  );
};

export default BeforeAndAfter;
