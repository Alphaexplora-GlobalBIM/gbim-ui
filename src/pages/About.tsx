import AboutHero from '../features/About/AboutHero';
import StatsBar from '../features/About/StatsBar';
import WhoWeAre from '../features/About/WhoWeAre';
import CoreValues from '../features/About/CoreValues';
import Timeline from '../features/About/Timeline';
import AboutCTA from '../features/About/AboutCTA';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-slate-900 min-h-screen overflow-hidden text-white font-sans relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>
      <AboutHero />
      <StatsBar />
      <WhoWeAre />
      <CoreValues />
      <Timeline />
      <AboutCTA />
      <Footer />
    </div>
  );
}