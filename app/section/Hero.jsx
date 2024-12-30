"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { GrDocumentTime } from "react-icons/gr";
import Link from "next/link";
import { scrollToSection } from "../components/scrollToSection";

const Hero = () => {
  return (
    <>
      <section className="relative py-16 lg:py-24 pb-48 px-6 md:px-12 lg:px-24 bg-blue-100">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-customBlue font-bold">
              👋 Hey! We Are Dentic
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 uppercase mt-4">
              Your trusted
              <br /> partner for a<br /> healthier <br />
              <span className="text-customBlue">brighter smile.</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-800">
              We are ready to help and take care of your dental health.
            </p>

            <button onClick={() => scrollToSection("appointment")} className="mt-6 text-white bg-customBlue px-6 py-3 font-semibold rounded-lg">
              Book Appointment
            </button>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-tr from-customBlue to-blue-300 rounded-3xl shadow-lg">
            {/* Overlapping Rating */}
            <div className="absolute top-4 -left-20 bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center gap-4">
                {/* Overlapping Images */}
                <div className="flex -space-x-4">
                  <img
                    src="/person1.webp"
                    alt="Customer 1"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                  <img
                    src="/person2.webp"
                    alt="Customer 2"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                  <img
                    src="/person3.webp"
                    alt="Customer 3"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  />
                </div>
                {/* Counter */}
                <p className="text-5xl font-bold text-gray-800">180+</p>
              </div>
              <p className="text-base text-gray-600 mt-2 font-bold">
                Satisfied Customers
              </p>
              {/* Star Ratings */}
              <div className="flex space-x-2 mt-2 items-center">
                <span className="text-yellow-500 flex items-center gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="text-gray-600 text-sm">(4.9/5 Review)</span>
              </div>
            </div>

            <Image
              src="/hero-image2.png"
              width={450}
              height={400}
              alt="hero-image"
              className="mx-auto relative"
            />
          </div>
        </div>

        {/* Bottom Section Overlapping */}
        <div className="absolute inset-x-0 -bottom-48 lg:-bottom-20 bg-white px-6 py-10 rounded-lg shadow-md mx-4 lg:mx-6">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
            <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4 lg:w-3/5">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <PiPhoneCallFill
                  size={"4rem"}
                  className="p-4 bg-customBlue text-white rounded-xl"
                />
                <div className="flex flex-col">
                  <p className="text-black text-lg lg:text-xl font-semibold">
                    Need Dental Services?
                  </p>
                  <p className="text-gray-700 text-base lg:text-lg">
                    01757-338336
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <GrDocumentTime
                  size={"4rem"}
                  className="p-4 bg-customBlue text-white rounded-xl"
                />
                <div className="flex flex-col">
                  <p className="text-black text-lg lg:text-xl font-semibold">
                    Opening Hours
                  </p>
                  <p className="text-gray-700 text-base lg:text-lg">
                    Mon-Sat: 9:00AM - 9:00PM
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("appointment")}
              href="#appointment"
              className="bg-customBlue text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-400"
            >
              Make an Appointment +
            </button>
          </div>
        </div>
      </section>
    </>

    // <section className="bg-blue-50 lg:px-10">
    //   <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between  items-center gap-12 px-6 py-8 lg:py-20">
    //     {/* Left Content */}
    //     <div>
    //       <span className="text-customBlue font-bold">
    //         👋 Hey! We Are Dentic
    //       </span>
    //       <h1 className="text-4xl md:text-6xl font-bold text-gray-800 uppercase mt-4">
    //         Your trusted
    //         <br /> partner for a<br /> healthier <br />
    //         <span className="text-customBlue">brighter smile.</span>
    //       </h1>
    //       <p className="mt-4 text-lg md:text-xl text-gray-800">
    //         we are ready to help and take care of your dental health
    //       </p>
    //       <button className="mt-6 text-white bg-customBlue px-6 py-3 font-semibold rounded-lg">
    //         Book Appointment
    //       </button>
    //     </div>

    //     {/* Right Image */}
    //     <div className="relative z-0">
    //       {/* Hero Image */}
    //       <Image
    //         src="/hero-image2.png"
    //         width={450}
    //         height={400}
    //         alt="hero-image"
    //         className="mx-auto relative z-10"
    //       />

    //       {/* Overlapping Rating */}
    //       <div className="absolute top-[20px] left-[-20px] bg-white shadow-lg rounded-lg p-4 z-0">
    //         <div className="flex items-center gap-4">
    //           {/* Overlapping Images */}
    //           <div className="flex -space-x-4">
    //             <img
    //               src="/person1.webp"
    //               alt="Customer 1"
    //               className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-30"
    //             />
    //             <img
    //               src="/person2.webp"
    //               alt="Customer 2"
    //               className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-20"
    //             />
    //             <img
    //               src="/person3.webp"
    //               alt="Customer 3"
    //               className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-10"
    //             />
    //           </div>
    //           {/* Counter */}
    //           <p className="text-5xl font-bold text-gray-800">180+</p>
    //         </div>
    //         {/* Description */}
    //         <p className="text-base text-gray-600 mt-2 font-bold">
    //           Satisfied Customers
    //         </p>
    //         {/* Star Ratings */}
    //         <div className="flex space-x-2 mt-2 items-center">
    //           <span className="text-yellow-500 flex items-center gap-1">
    //             <FaStar />
    //             <FaStar />
    //             <FaStar />
    //             <FaStar />
    //             <FaStar />
    //           </span>
    //           <span className="text-gray-600 text-sm">(4.9/5 Review)</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Hero;
