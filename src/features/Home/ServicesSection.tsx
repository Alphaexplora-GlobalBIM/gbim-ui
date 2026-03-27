import { Box, Layers, Ruler, Cpu, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';

const servicesData = [
    { id: '01', icon: Box, tech_id: 'PEB-MOD-01', title: 'Pre-Engineered Buildings', desc: 'Complete 3D structural modeling using Tekla Structures. We optimize steel weight and ensure fit-up accuracy.', tags: ['TEKLA STRUCTURES', 'WEIGHT OPTIMIZATION'] },
    { id: '02', icon: Layers, tech_id: 'STL-DET-02', title: 'Structural Steel Detailing', desc: 'Fabrication-ready shop drawings, erection diagrams, and anchor bolt plans for seamless on-site assembly.', tags: ['SHOP DRAWINGS', 'CNC FILES'] },
    { id: '03', icon: Ruler, tech_id: 'FEA-ANA-03', title: 'Design & Estimation', desc: 'Advanced structural analysis and precise material take-offs to help you bid confidently with accurate tonnage.', tags: ['MATERIAL TAKE-OFF', 'COST ESTIMATION'] },
];

export default function ServicesSection() {
    return (
        <section className="py-32 bg-slate-900 relative overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Cpu className="w-5 h-5 text-yellow-500" />
                            <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">Technical Capabilities</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Engineering <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Service Suite</span></h2>
                    </div>
                    <Reveal width="fit-content">
                        <Link to="/services" className="group flex items-center gap-2 px-6 py-3 bg-yellow-500/10 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-500 hover:text-slate-900 font-bold uppercase tracking-widest text-sm rounded-sm transition-all shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]">
                            Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {servicesData.map((item, index) => (
                        <Reveal key={index} delay={index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : ''}>
                            <div className="group relative h-full bg-slate-800/30 backdrop-blur-sm border border-white/10 p-8 hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-sm">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-yellow-500 transition-colors" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-yellow-500 transition-colors" />
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
