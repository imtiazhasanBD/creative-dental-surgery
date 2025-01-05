"use client";
import React from "react";
import SectionHeader from "../components/SectionHeader";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { reviews } from "../data/data";



const ReviewSection = () => {
  return (
<section className="py-16 px-4 lg:px-10 bg-gray-50">
  <div className="text-center mb-12">
    <SectionHeader title="testimonial" style="justify-center" />
    <p className="text-2xl md:text-5xl font-bold text-gray-700 mb-4">
      What Our Clients Say
    </p>
    <p className="text-lg text-gray-600 mb-6">
      We pride ourselves on delivering exceptional care and creating confident smiles.
    </p>
  </div>
  <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">
    {/* Left Side: Image and Ratings */}
    <div className="relative md:w-2/5 flex-shrink-0">
      <Image
        src="/treatment/Dental.png"
        alt="Dental Clinic Interior"
        width={500}
        height={500}
        className="rounded-2xl border-white border-4 w-full max-w-sm md:max-w-sm lg:max-w-none"
      />
      <div className="bg-customBlue h-[150px] lg:h-[180px] border-white border-4 rounded-2xl w-11/12 max-w-[400px] absolute p-6 -bottom-10 right-2 md:-bottom-10 md:-right-10">
        <div className="text-white flex gap-6 pb-4 lg:pb-8 border-b border-gray-300">
          <p className="text-2xl lg:text-5xl font-bold">4.7/5</p>
          <p className="text-sm lg:text-base">
            Rated by our clients for exceptional services.
          </p>
        </div>
        <div className="text-white flex gap-6 mt-2 lg:mt-4">
          <p className="text-sm lg:text-2xl text-yellow-500">{"★".repeat(4)}☆</p>
          <p className="text-sm lg:text-base">for excellence services</p>
        </div>
      </div>
    </div>

    {/* Right Side: Reviews Carousel */}
    <div className="md:w-3/5 w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="p-4 lg:p-6 w-full"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.name}>
              <div className="space-y-8 md:space-y-10 text-left">
                <Image
                  src="/icon/icon-testimonial-quote.svg"
                  width={50}
                  height={50}
                  alt="icon-testimonital"
                />
                <p className="text-gray-700 text-lg md:text-xl font-medium italic">
                  "{review.feedback}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-blue-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <div className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>
</section>

  );
};

export default ReviewSection;
