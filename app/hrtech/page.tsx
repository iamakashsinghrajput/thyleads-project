import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HrtechHero from '@/components/HrtechHero';
import HrtechReality from '@/components/HrtechReality';
import HrtechHowWeHelp from '@/components/HrtechHowWeHelp';
import HrtechSocialProof from '@/components/HrtechSocialProof';
import HrtechWhyUs from '@/components/HrtechWhyUs';
import HrtechFAQ from '@/components/HrtechFAQ';
import HrtechCTA from '@/components/HrtechCTA';

export const metadata = {
  title: 'HRTech Outbound · Thyleads',
  description:
    'Specialized B2B outbound for HRTech SaaS in India. Lands right in CHRO inboxes and keeps multi-stakeholder deals moving through the buying committee.',
};

export default function HrtechPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <HrtechHero />
        <HrtechReality />
        <HrtechHowWeHelp />
        <HrtechSocialProof />
        <HrtechWhyUs />
        <HrtechFAQ />
        <HrtechCTA />
      </main>
      <Footer />
    </>
  );
}
