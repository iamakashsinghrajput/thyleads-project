import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MartechHero from '@/components/MartechHero';
import MartechReality from '@/components/MartechReality';
import MartechHowWeHelp from '@/components/MartechHowWeHelp';
import MartechSocialProof from '@/components/MartechSocialProof';
import MartechWhyUs from '@/components/MartechWhyUs';
import MartechFAQ from '@/components/MartechFAQ';
import MartechCTA from '@/components/MartechCTA';

export const metadata = {
  title: 'MarTech Outbound · Thyleads',
  description:
    'Specialized B2B outbound for MarTech SaaS in India. Vertical-trained pods, signal-driven targeting, and messaging that earns replies from CMOs and growth founders.',
};

export default function MartechPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
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
