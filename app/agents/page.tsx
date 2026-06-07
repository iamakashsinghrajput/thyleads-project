import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentsHero from '@/components/AgentsHero';
import AgentsArchitecture from '@/components/AgentsArchitecture';
import AgentsMemory from '@/components/AgentsMemory';
import AgentsLearning from '@/components/AgentsLearning';
import AgentsSpecifications from '@/components/AgentsSpecifications';
import AgentsToolLayer from '@/components/AgentsToolLayer';
import AgentsHumanLayer from '@/components/AgentsHumanLayer';
import AgentsCTA from '@/components/AgentsCTA';
import { buildMetadata, pageSeo } from '@/lib/seo';

export const metadata = buildMetadata(pageSeo.aiSystem, '/agents');

export default function AgentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <AgentsHero />
        <AgentsArchitecture />
        <AgentsMemory />
        <AgentsLearning />
        <AgentsSpecifications />
        <AgentsToolLayer />
        <AgentsHumanLayer />
        <AgentsCTA />
      </main>
      <Footer />
    </>
  );
}
