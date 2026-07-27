import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GtmFrameworkHero from '@/components/GtmFrameworkHero';
import GtmPipelineBreaks from '@/components/GtmPipelineBreaks';
import GtmFiveStageSystem from '@/components/GtmFiveStageSystem';
import GtmImpact from '@/components/GtmImpact';
import GtmCTA from '@/components/GtmCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.gtmFramework, '/gtm-framework');

export default function GtmFrameworkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f3eb]">
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
