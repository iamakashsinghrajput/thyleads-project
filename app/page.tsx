import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import SixWalls from "../components/SixWalls";
import CaseStudies from "@/components/CaseStudies";
import StrategicProcessRedesign from "@/components/StrategicProcess";
import MessyMiddle from "@/components/MessyMiddle";
import ClientDashboard from "@/components/ClientDashboard";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import WhyUs from "@/components/WhyUs"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <TrustedBy theme="light" />
        <SixWalls />
        <MessyMiddle/>
        <ClientDashboard/>
        <Testimonial/>
        <WhyUs/>
        {/* <StrategicProcessRedesign/> */}
        <CaseStudies/>
        <FAQSection/>
        <CTASection theme="dark" />
        <Footer/>
      </main>
    </>
  );
}
