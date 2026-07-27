import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeriesAHero from '@/components/SeriesAHero';
import SeriesAReality from '@/components/SeriesAReality';
import SeriesAHowWeHelp from '@/components/SeriesAHowWeHelp';
import SeriesASocialProof from '@/components/SeriesASocialProof';
import SeriesAWhyUs from '@/components/SeriesAWhyUs';
import SeriesAFAQ from '@/components/SeriesAFAQ';
import SeriesACTA from '@/components/SeriesACTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.seriesA, '/series-a');

export default function SeriesAPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f3eb]">
        <SeriesAHero />
        <SeriesAReality />
        <SeriesAHowWeHelp />
        <SeriesASocialProof />
        <SeriesAWhyUs />
        <SeriesAFAQ />
        <SeriesACTA />
      </main>
      <Footer />
    </>
  );
}
