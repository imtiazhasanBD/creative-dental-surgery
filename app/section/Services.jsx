"use client";
import React from "react";
import { dentalServices } from "../data/data";
import SectionHeader from "../components/SectionHeader";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Services = () => {
  return (
    <section className="py-16 px-2 md:px-12 lg:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <SectionHeader title="Our Dental Services" style="justify-center"/>
        <p className="text-2xl md:text-5xl font-bold text-gray-700">
          Explore our range of expert dental services tailored to your needs.
        </p>
      </div>

      <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 hidden">
        {dentalServices.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 border rounded-md shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Main Image */}
            <img
              src={service.image}
              alt={`${service.name} image`}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />

            {/* Icon and Name */}
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-customBlue">
                {service.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {dentalServices.map((service, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/4">
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 border rounded-md shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Main Image */}
                <img
                  src={service.image}
                  alt={`${service.name} image`}
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />

                {/* Icon and Name */}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-customBlue">
                    {service.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600">{service.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Services;
