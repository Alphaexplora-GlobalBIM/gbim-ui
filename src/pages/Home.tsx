import HeroSection from '../features/Home/HeroSection';
import ExperienceSection from '../features/Home/ExperienceSection';
import GlobalMapSection from '../features/Home/GlobalMapSection';
import SectorsSection from '../features/Home/SectorsSection';
import ServicesSection from '../features/Home/ServicesSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="overflow-hidden bg-slate-900 text-white selection:bg-yellow-500 selection:text-black">
      <HeroSection />
      <ExperienceSection />
      <GlobalMapSection />
      <SectorsSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}