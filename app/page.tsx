import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import SixWalls from "../components/SixWalls";
import CaseStudies from "@/components/CaseStudies";
import MessyMiddle from "@/components/MessyMiddle";
import ClientDashboard from "@/components/ClientDashboard";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import WhyUs from "@/components/WhyUs"
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata = buildMetadata(pageSeo.home, "/");

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

        <CaseStudies/>
        <FAQSection/>
        <CTASection theme="dark" />
        <Footer/>
      </main>
    </>
  );
}
