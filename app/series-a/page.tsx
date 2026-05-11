import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeriesAHero from '@/components/SeriesAHero';
import SeriesAReality from '@/components/SeriesAReality';
import SeriesAHowWeHelp from '@/components/SeriesAHowWeHelp';
import SeriesASocialProof from '@/components/SeriesASocialProof';
import SeriesAWhyUs from '@/components/SeriesAWhyUs';
import SeriesAFAQ from '@/components/SeriesAFAQ';
import SeriesACTA from '@/components/SeriesACTA';

export const metadata = {
  title: 'Seed & Series A SaaS Outbound · Thyleads',
  description:
    'You don’t need an SDR team to grow. We plug in as your extended revenue team for Seed and Series A SaaS — first 50 customers, repeatable outbound, in 4 weeks to velocity.',
};

export default function SeriesAPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
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
