const Footer = () => {
    return (
      <footer className="bg-customBlue text-white py-10">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between gap-10">
          {/* Logo and About Section */}
          <div className="lg:w-[30%]">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.webp" alt="Dentaire Logo" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Creative Dental Surgery</h2>
            </div>
            <p className="text-sm leading-6">
              The goal of our clinic is to provide friendly, caring dentistry and
              the highest level of general, cosmetic, and specialist dental
              treatments.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#appointment" className="hover:underline">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>info@domain.com</li>
              <li>+(123) 698-5245</li>
              <li>Mon to Sat 9:00AM to 9:00PM</li>
            </ul>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-10 border-t border-gray-400 pt-6 px-6 lg:px-20 text-left text-sm">
          Copyright © 2024 All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  