import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeriesBHero from '@/components/SeriesBHero';
import SeriesBReality from '@/components/SeriesBReality';
import SeriesBHowWeHelp from '@/components/SeriesBHowWeHelp';
import SeriesBSocialProof from '@/components/SeriesBSocialProof';
import SeriesBWhyUs from '@/components/SeriesBWhyUs';
import SeriesBFAQ from '@/components/SeriesBFAQ';
import SeriesBCTA from '@/components/SeriesBCTA';

export const metadata = {
  title: 'Scaling SaaS Outbound · Series B and Beyond · Thyleads',
  description:
    'For SaaS teams scaling beyond Series B in India. A plug-in revenue engine that delivers consistent pipeline, CAC-optimised qualification, and enterprise deal momentum — without scaling headcount.',
};

export default function SeriesBPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
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
