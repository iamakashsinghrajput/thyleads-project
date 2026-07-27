import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FintechHero from '@/components/FintechHero';
import FintechReality from '@/components/FintechReality';
import FintechHowWeHelp from '@/components/FintechHowWeHelp';
import FintechSocialProof from '@/components/FintechSocialProof';
import FintechWhyUs from '@/components/FintechWhyUs';
import FintechFAQ from '@/components/FintechFAQ';
import FintechCTA from '@/components/FintechCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.fintech, '/fintech');

export default function FintechPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f3eb]">
        <FintechHero />
        <FintechReality />
        <FintechHowWeHelp />
        <FintechSocialProof />
        <FintechWhyUs />
        <FintechFAQ />
        <FintechCTA />
      </main>
      <Footer />
    </>
  );
}
