import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FintechHero from '@/components/FintechHero';
import FintechReality from '@/components/FintechReality';
import FintechHowWeHelp from '@/components/FintechHowWeHelp';
import FintechSocialProof from '@/components/FintechSocialProof';
import FintechWhyUs from '@/components/FintechWhyUs';
import FintechFAQ from '@/components/FintechFAQ';
import FintechCTA from '@/components/FintechCTA';

export const metadata = {
  title: 'FinTech Outbound · Thyleads',
  description:
    'Specialized B2B outbound for FinTech SaaS in India. Earn replies from CFOs, Heads of Risk, and CIOs — and keep deals alive through legal, procurement, and security review.',
};

export default function FintechPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
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
