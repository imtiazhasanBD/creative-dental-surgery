"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlCallOut } from "react-icons/sl";
import { scrollToSection } from "../components/scrollToSection";

const About = () => {
  return (
    <section id="about" className="px-3 lg:px-10 mt-72 lg:mt-20">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-28 w-full">
        {/*Image*/}
        <div className="relative lg:w-full my-auto flex flex-col gap-6 ">
          <Image
            src="/about_two.jpg"
            alt="Dental Clinic Interior"
            width={600}
            height={450}
            className="rounded-2xl border-white border-4 w-full max-w-sm md:max-w-none"
          />

          <Image
            src="/2021-04-19.jpg"
            alt="Dental Clinic Interior"
            width={350}
            height={350}
            className="border-white border-4 rounded-2xl w-3/4 max-w-[200px] md:max-w-none absolute -bottom-10 right-0 md:-bottom-40 md:-right-10"
          />
        </div>

        {/* About Details */}
        <div className="text-left mt-8 lg:mt-44">
          <div className="text-left mb-4 lg:mb-12">
            <h2 className="text-xl uppercase font-bold text-customBlue mb-4 flex items-center gap-1">
              <Image src="/logo.webp" alt="logo" width={30} height={20} />
              About Us
            </h2>
            <p className="text-gray-800 text-3xl lg:text-6xl font-bold">
              Discover who we are and why your{" "}
              <span className="text-customBlue">smile matters to us.</span>
            </p>
          </div>
          <p className="text-gray-500 text-lg mb-6">
            The goal of our clinic is to provide friendly, caring dentistry and
            the highest level of general, cosmetic, and specialist dental
            treatments. With dental practices throughout the world.
          </p>
          <div className="lg:flex gap-8 lg:mb-4">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-customBlue mb-2">
                Our Vision
              </h4>
              <p className="text-gray-600 text-lg">
                To deliver exceptional dental care and inspire confident smiles.
              </p>
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-customBlue mb-2">
                Our Mission
              </h4>
              <p className="text-gray-600 text-lg">
                To provide compassionate, innovative dental services built on
                trust.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row items-center gap-10 float-left">
              <button
                onClick={() => scrollToSection("appointment")}
                href="#appointment"
                className="mb-2 inline-block bg-customBlue text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                Book Appointment
              </button>
              <Link href="tel:01757338336">
                <p className="flex gap-3 items-center text-xl font-medium text-center">
                  <SlCallOut size={"1.8rem"} className="text-customBlue" />
                  01757-338336
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
