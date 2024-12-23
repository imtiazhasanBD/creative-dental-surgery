import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-blue-50 lg:px-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between  items-center gap-12 px-6 py-8 lg:py-20">
        {/* Left Content */}
        <div>
          <span className="text-customBlue font-bold">
            👋 Hey! We Are Dentic
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-black uppercase mt-4">
            Your trusted
            <br /> partner for a<br /> healthier <br />
            <span className="text-customBlue">brighter smile.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-800">
            we are ready to help and take care of your dental health
          </p>
          <button className="mt-6 text-white bg-customBlue px-6 py-3 font-semibold rounded-lg">
            Book Appointment
          </button>
        </div>

        {/* Right Image */}
        <div className="relative z-0">
          {/* Hero Image */}
          <Image
            src="/hero-image2.png"
            width={450}
            height={400}
            alt="hero-image"
            className="mx-auto relative z-10" 
          />

          {/* Overlapping Rating */}
          <div className="absolute top-[20px] left-[-20px] bg-white shadow-lg rounded-lg p-4 z-0">
            <div className="flex items-center gap-4">
              {/* Overlapping Images */}
              <div className="flex -space-x-4">
                <img
                  src="/person1.webp"
                  alt="Customer 1"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-30"
                />
                <img
                  src="/person2.webp"
                  alt="Customer 2"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-20"
                />
                <img
                  src="/person3.webp"
                  alt="Customer 3"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md relative z-10"
                />
              </div>
              {/* Counter */}
              <p className="text-5xl font-bold text-gray-800">180+</p>
            </div>
            {/* Description */}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
