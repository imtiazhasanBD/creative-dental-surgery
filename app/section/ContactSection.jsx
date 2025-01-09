"use client"
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import { scrollToSection } from '../components/scrollToSection';

const ContactSection = () => {
  return (
    <section id='contact' className="py-16 px-4 lg:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Left: Google Map */}
        <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24163.62071750215!2d-74.01238521361403!3d40.71077947495326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316b8bce73%3A0xbfc61a0b2fc9c561!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1672876549027!5m2!1sen!2sbd"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        {/* Right: Contact Information */}
        <div className="w-full lg:w-1/2 space-y-8">
          <SectionHeader title="Contact Now" />
          <h3 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Get <span className="text-customBlue">Free</span> Professional Consultation
          </h3>

          {/* Address */}
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-customBlue text-2xl" />
            <p className="text-gray-700">24/11 Robert Road, New York, USA</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-customBlue text-2xl" />
            <p className="text-gray-700">+(123) 698-5245</p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-customBlue text-2xl" />
            <p className="text-gray-700">info@domain.com</p>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-4">
            <FaClock className="text-customBlue text-2xl" />
            <p className="text-gray-700">Mon to Sat 9:00AM to 9:00PM</p>
          </div>

          {/* Appointment Button */}
          <button
            onClick={() => scrollToSection("appointment")}
            className="mt-6 bg-customBlue hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg flex items-center gap-2"
          >
            Make An Appointment <span className="text-xl">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;