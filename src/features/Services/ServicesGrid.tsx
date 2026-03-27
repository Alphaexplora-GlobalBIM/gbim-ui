import { Box, PenTool, Compass, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';

const services = [
    { title: 'Pre-Engineered Buildings', path: '/services/peb-detailing', desc: 'Complete erection drawings, fabrication-ready shop drawings, and facility management documentation. We specialize in optimizing PEB structures for cost and stability.', icon: Box, features: ['Erection Drawings', 'Anchor Bolt Plans', 'Bill of Materials'] },
    { title: 'Structural Steel Detailing', path: '/services/structural-steel', desc: 'Advanced Tekla Structures expertise. We deliver accurate shop drawings, assembly & erection plans, and CNC files for automated fabrication.', icon: PenTool, features: ['Tekla Structures', 'CNC Files', 'Connection Design'] },
    { title: 'Steel Design & Analysis', path: '/services/steel-design', desc: 'FEA-based 3D analysis to maximize structural efficiency. We provide material quantity takeoffs, cost estimation, and digital twin creation.', icon: Compass, features: ['Finite Element Analysis', 'Load Calculation', 'Cost Optimization'] },
    { title: 'BIM Consultation', path: '/services/bim-consulting', desc: 'Helping firms transition to modern BIM workflows. We ensure seamless integration between architectural vision and structural reality.', icon: Layers, features: ['Clash Detection', 'Workflow Setup', 'Team Training'] },
];

export default function ServicesGrid() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
            <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <Reveal key={index} delay={`delay-${index * 100}`}>
                        <Link to={service.path} className="block h-full">
                            <div className="group relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/5 hover:border-yellow-500/50 overflow-hidden h-full cursor-pointer transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-16 h-16 bg-slate-900/80 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-600 group-hover:border-yellow-500 transition-colors duration-500 shadow-lg">
                                            <service.icon className="w-8 h-8 text-yellow-500 group-hover:text-slate-900 transition-colors duration-500" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            <ArrowRight className="text-yellow-500 w-5 h-5" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors">{service.title}</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed group-hover:text-slate-300 transition-colors">{service.desc}</p>
                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        {service.features.map((f, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
