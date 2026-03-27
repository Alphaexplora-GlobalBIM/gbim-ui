import { useState } from 'react';
import { ArrowUpRight, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cloudinaryBase = "https://res.cloudinary.com/dqapo8elj/image/upload";
const industrialReal = `${cloudinaryBase}/Site-1-6.jpg`;
const industrialSketch = `${cloudinaryBase}/Site-1-6_sketch.png`;
const commercialReal = `${cloudinaryBase}/Site-1-3.jpg`;
const commercialSketch = `${cloudinaryBase}/Site-1-3_sketch.png`;
const infrastructureReal = `${cloudinaryBase}/Site-1-4.jpg`;
const infrastructureSketch = `${cloudinaryBase}/Site-1-4_sketch.png`;
const warehouseReal = `${cloudinaryBase}/Site-1-12.jpg`;
const warehouseSketch = `${cloudinaryBase}/Site-1-12_sketch.png`;

const sectorsData = [
    { id: '01', title: 'Industrial', desc: 'Large-scale warehousing, factories & logistics hubs.', img: industrialReal, sketch: industrialSketch },
    { id: '02', title: 'Commercial', desc: 'Complex shopping centers & mixed-use high rises.', img: commercialReal, sketch: commercialSketch },
    { id: '03', title: 'Infrastructure', desc: 'Bridges, transport hubs, and civic structures.', img: infrastructureReal, sketch: infrastructureSketch },
    { id: '04', title: 'Warehouse', desc: 'High-density apartment complexes & private estates.', img: warehouseReal, sketch: warehouseSketch }
];

export default function SectorsSection() {
    const [activeSector, setActiveSector] = useState(sectorsData[0]);
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden group/sector-section">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Sectors We Serve</h2>
                        <p className="text-yellow-500 mt-2 font-mono text-sm tracking-widest">ENGINEERING CAPABILITIES // EST. 1996</p>
                    </div>
                    <Crosshair className="w-4 h-4 text-yellow-500" style={{ animation: 'spin 8s linear infinite' }} />
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5 flex flex-col">
                        {sectorsData.map((sector, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveSector(sector)}
                                onClick={() => navigate(`/projects?category=${encodeURIComponent(sector.title)}&view=list`)}
                                className={`group relative flex items-center justify-between py-5 border-b border-white/10 cursor-pointer transition-all duration-300 ${activeSector.id === sector.id ? 'pl-4 border-yellow-500 bg-white/5' : 'hover:pl-4 hover:border-yellow-500/50'}`}
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono transition-colors ${activeSector.id === sector.id ? 'text-yellow-500' : 'text-slate-500'}`}>{sector.id}</span>
                                        <span className={`text-xl font-medium transition-colors ${activeSector.id === sector.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{sector.title}</span>
                                    </div>
                                </div>
                                <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${activeSector.id === sector.id ? 'text-yellow-500 translate-x-0 opacity-100' : 'text-slate-600 opacity-0'}`} />
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-7 relative h-[500px] hidden lg:block lg:sticky lg:top-24 group/image-container">
                        <div className="w-full h-full relative rounded-sm overflow-hidden border border-white/10 bg-black">
                            <AnimatePresence mode="wait">
                                <motion.div key={activeSector.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                                    <img src={activeSector.sketch} alt={`${activeSector.title} blueprint`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover/image-container:opacity-0" style={{ zIndex: 10 }} />
                                    <img src={activeSector.img} alt={activeSector.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover/image-container:opacity-100" style={{ zIndex: 5 }} />
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 pt-20 pb-8 px-8 z-20">
                                <div className="border-l-2 border-yellow-500 pl-6">
                                    <h3 className="text-3xl font-bold text-white mb-2">{activeSector.title}</h3>
                                    <p className="text-gray-300 max-w-md">{activeSector.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </section>
    );
}
