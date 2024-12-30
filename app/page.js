import AppointmentForm from "./components/AppointmentForm ";
import Hero from "./section/Hero";
import { PiPhoneCallFill } from "react-icons/pi";
import { GrDocumentTime } from "react-icons/gr";
import Image from "next/image";
import Form from "./components/Form";
import About from "./section/About";


export default function Home() {
  return (
    <div className="container mx-auto max-w-[1400px] pb-[1000px] bg-gray-100">
      {/* Hero Section */}
      {<Hero />}
      {/* About Section*/}
      <About/>
       {/* Other sections */}
       <AppointmentForm />
  
    </div>
  );
}
