import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhyThyleadsHero from '@/components/WhyThyleadsHero';
import TheShift from '@/components/TheShift';
import SaasGrowthCurveTrajectory from '@/components/SaasGrowthCurveTrajectory';
import TheNumbers from '@/components/TheNumbers';
import Testimonials from '@/components/Testimonials';
import WhyThyleadsCTA from '@/components/WhyThyleadsCTA';

export const metadata = {
  title: 'Why Thyleads · The Right Choice for Predictable Outbound',
  description:
    'See why SaaS teams pick Thyleads over in-house SDRs — qualified leads, consistent follow-ups, and real deal momentum.',
};

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
