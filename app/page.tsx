import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import CaseStudies from "@/components/CaseStudies";
import StrategicProcessRedesign from "@/components/StrategicProcess";
import MessyMiddle from "@/components/MessyMiddle";
import Testimonial from "@/components/Testimonial";
import ComparisonSection from "@/components/ComparisionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <TrustedBy />
        <MessyMiddle/>
        <Testimonial/>
        <ComparisonSection/>
        <StrategicProcessRedesign/>
        <CaseStudies/>
        <FAQSection/>
        <CTASection theme="dark" />
        <Footer/>
      </main>
    </>
  );
}
