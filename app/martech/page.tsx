import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MartechHero from '@/components/MartechHero';
import MartechReality from '@/components/MartechReality';
import MartechHowWeHelp from '@/components/MartechHowWeHelp';
import MartechSocialProof from '@/components/MartechSocialProof';
import MartechWhyUs from '@/components/MartechWhyUs';
import MartechFAQ from '@/components/MartechFAQ';
import MartechCTA from '@/components/MartechCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.martech, '/martech');

export default function MartechPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f3eb]">
        <MartechHero />
        <MartechReality />
        <MartechHowWeHelp />
        <MartechSocialProof />
        <MartechWhyUs />
        <MartechFAQ />
        <MartechCTA />
      </main>
      <Footer />
    </>
  );
}
