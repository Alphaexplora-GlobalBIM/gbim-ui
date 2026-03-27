import ResourcesGrid from '../features/Resources/ResourcesGrid';
import Footer from '../components/Footer';

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 selection:bg-yellow-500 selection:text-black font-sans relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]"></div>
      </div>
      <ResourcesGrid />
      <Footer />
    </div>
  );
}