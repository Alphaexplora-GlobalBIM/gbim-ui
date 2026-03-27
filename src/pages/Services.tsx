import ServicesHero from '../features/Services/ServicesHero';
import WorkflowProcess from '../features/Services/WorkflowProcess';
import ServicesGrid from '../features/Services/ServicesGrid';
import ServicesCTA from '../features/Services/ServicesCTA';
import Footer from '../components/Footer';

export default function Services() {
  return (
    <div className="bg-slate-900 min-h-screen overflow-hidden text-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      <ServicesHero />
      <WorkflowProcess />
      <ServicesGrid />
      <ServicesCTA />
      <Footer />
    </div>
  );
}