import AppointmentForm from "./components/AppointmentForm ";
import Hero from "./section/Hero";
import { PiPhoneCallFill } from "react-icons/pi";
import { GrDocumentTime } from "react-icons/gr";
import Image from "next/image";
import Form from "./components/Form";
import About from "./section/About";
import Services from "./section/Services";
import { FeaturedImageGallery } from "./section/Gallary";
import BeforeAndAfter from "./section/BeforeAndAfter";
import FAQSection from "./section/FAQ";
import ReviewSection from "./section/ReviewSection";
import ContactSection from "./section/ContactSection";
import Footer from "./section/Footer";


export default function Home() {
  return (
    <div className="container mx-auto max-w-[1400px] bg-white">
      {/* Hero Section */}
      {<Hero />}
      {/* About Section*/}
      <About/>
       {/* Other sections */}
       <AppointmentForm />
       <Services/>
       <BeforeAndAfter/>
       <ReviewSection/>
      <FAQSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
