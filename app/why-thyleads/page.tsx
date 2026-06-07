import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhyThyleadsHero from '@/components/WhyThyleadsHero';
import TheShift from '@/components/TheShift';
import SaasGrowthCurveTrajectory from '@/components/SaasGrowthCurveTrajectory';
import TheNumbers from '@/components/TheNumbers';
import Testimonials from '@/components/Testimonials';
import WhyThyleadsCTA from '@/components/WhyThyleadsCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.whyThyleads, '/why-thyleads');

export default function WhyThyleadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <WhyThyleadsHero />
        <TheShift />
        <SaasGrowthCurveTrajectory />
        <TheNumbers />
        <Testimonials />
        <WhyThyleadsCTA />
      </main>
      <Footer />
    </>
  );
}
