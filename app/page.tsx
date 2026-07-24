import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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
        <SixWalls />

        {/* Divider between the two beige sections */}
        <div className="bg-[#f7f3eb] px-6 sm:px-12">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8ccb2]" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary-500" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8ccb2]" />
          </div>
        </div>

        <MessyMiddle/>

        <div className="bg-[#f7f3eb] px-6 sm:px-12">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8ccb2]" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary-500" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8ccb2]" />
          </div>
        </div>
        <ClientDashboard/>
        <Testimonial/>
        <WhyUs/>

        <div className="bg-[#f7f3eb] px-6 sm:px-12">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8ccb2]" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary-500" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8ccb2]" />
          </div>
        </div>

        <CaseStudies/>

        <div className="bg-[#f7f3eb] px-6 sm:px-12">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8ccb2]" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary-500" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-primary-300" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8ccb2]" />
          </div>
        </div>
        <FAQSection/>
        <CTASection theme="dark" />
        <Footer/>
      </main>
    </>
  );
}
