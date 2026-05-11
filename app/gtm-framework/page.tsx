import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GtmFrameworkHero from '@/components/GtmFrameworkHero';
import GtmPipelineBreaks from '@/components/GtmPipelineBreaks';
import GtmFiveStageSystem from '@/components/GtmFiveStageSystem';
import GtmImpact from '@/components/GtmImpact';
import GtmCTA from '@/components/GtmCTA';

export const metadata = {
  title: 'GTM Framework · Thyleads',
  description:
    'How Thyleads runs your GTM — a 5-step operating system for building a predictable pipeline. Built for SaaS teams targeting India-first growth.',
};

export default function GtmFrameworkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <GtmFrameworkHero />
        <GtmPipelineBreaks />
        <GtmFiveStageSystem />
        <GtmImpact />
        <GtmCTA />
      </main>
      <Footer />
    </>
  );
}
