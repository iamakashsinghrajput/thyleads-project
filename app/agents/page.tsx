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

export const metadata = {
  title: 'Agents · Thyleads',
  description:
    'Your pipeline runs on 15 agents built on Claude. A multi-agent system on Anthropic’s Claude that researches accounts, writes content, monitors deliverability, and learns — improving every campaign with everything it has seen before.',
};

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
