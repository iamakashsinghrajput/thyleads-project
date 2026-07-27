import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeriesBHero from '@/components/SeriesBHero';
import SeriesBReality from '@/components/SeriesBReality';
import SeriesBHowWeHelp from '@/components/SeriesBHowWeHelp';
import SeriesBSocialProof from '@/components/SeriesBSocialProof';
import SeriesBWhyUs from '@/components/SeriesBWhyUs';
import SeriesBFAQ from '@/components/SeriesBFAQ';
import SeriesBCTA from '@/components/SeriesBCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.seriesB, '/series-b');

export default function SeriesBPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f3eb]">
        <SeriesBHero />
        <SeriesBReality />
        <SeriesBHowWeHelp />
        <SeriesBSocialProof />
        <SeriesBWhyUs />
        <SeriesBFAQ />
        <SeriesBCTA />
      </main>
      <Footer />
    </>
  );
}
