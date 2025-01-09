import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Creative Dental Surgery: Smile Transformation",
  description: "Transform your smile with advanced dental care, cosmetic surgery, and personalized treatment plans. Book consultations and access expert dental services easily.",
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className=" scroll-smooth">
      <body className={`${openSans.className}`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
