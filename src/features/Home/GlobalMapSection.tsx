import { useState, useEffect } from 'react';
import { Globe, MapPin, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
// @ts-ignore
import ReactMapGL, { Marker, NavigationControl, useMap } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { rawProjects } from '../../assets/data/projectsData';

interface MapProject {
    id: string;
    title: string;
    location: string;
    region: string;
    category: string;
    description: string;
    lng: number;
    lat: number;
    isHQ?: boolean;
    year?: number;
}

const getRandomYear = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
    return 2012 + Math.abs(h) % 13;
};

const individualProjects: MapProject[] = (rawProjects as any[]).map(proj => ({
    ...proj,
    year: getRandomYear(proj.id)
}));


export default function GlobalMapSection() {
    const [activeProject, setActiveProject] = useState<MapProject | null>(null);
    const [hoveredProject, setHoveredProject] = useState<MapProject | null>(null);

    const [isMapInteractive, setIsMapInteractive] = useState(false);

    useEffect(() => {
        if (!isMapInteractive) return;
        const handleScroll = () => setIsMapInteractive(false);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMapInteractive]);

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 w-full text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-mono text-xs tracking-widest uppercase mb-6 mx-auto md:mx-0">
                        <Globe className="w-4 h-4" /> Global Footprint
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Engineering Across Borders</h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                        From steel framing in North America to massive structural projects in the Middle East, our detailing spans continents.
                    </p>
                </div>
            </div>

            <div className="relative w-full mt-8 group" onMouseLeave={() => setIsMapInteractive(false)}>
                <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-slate-900 shadow-2xl border-y border-white/5"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                    }}
                >
                    {/* Interactive Overlay */}
                    {!isMapInteractive && (
                        <div
                            className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] cursor-pointer transition-all duration-300 hover:bg-slate-900/10"
                            onClick={() => setIsMapInteractive(true)}
                        >
                            <div className="px-6 py-3 bg-slate-900/90 border border-yellow-500/40 rounded-full flex items-center gap-3 text-yellow-500 font-mono text-xs md:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-transform hover:scale-105">
                                <Globe className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                                <span>Click to Interact</span>
                            </div>
                        </div>
                    )}

                    <ReactMapGL
                        mapLib={maplibregl}
                        initialViewState={{ longitude: 40, latitude: 25, zoom: 2 }}
                        mapStyle="https://api.maptiler.com/maps/019d0a5b-813d-7acd-b654-f87699d6a147/style.json?key=VT0btvYNkE2GE66zACVl"
                        interactive={true}
                        dragRotate={false}
                        scrollZoom={false}
                    >
                        <NavigationControl position="bottom-right" showCompass={false} />


                        {/* Normal Markers (Geographic) */}
                        {individualProjects.map((proj) => {
                            const isHovered = hoveredProject?.id === proj.id;
                            const isHQ = proj.isHQ;

                            return (
                                <Marker key={proj.id} longitude={proj.lng} latitude={proj.lat} anchor="center">
                                    <div className="relative cursor-pointer group flex items-center justify-center"
                                        style={{ zIndex: isHovered ? 100 : (isHQ ? 50 : 10) }}
                                        onMouseEnter={() => setHoveredProject(proj)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                        onClick={() => setActiveProject(proj)}
                                    >
                                        {isHQ ? (
                                            <div className="relative flex items-center justify-center h-10 w-10 pointer-events-none">
                                                <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping scale-110"></div>
                                                <MapPin className={`w-7 h-7 text-yellow-500 fill-yellow-500/30 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} strokeWidth={2.5} />
                                            </div>
                                        ) : (
                                            <div className="relative flex items-center justify-center h-5 w-5 pointer-events-none">
                                                <div className="absolute w-8 h-8 border border-yellow-500/40 rounded-full animate-ping"></div>
                                                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-white scale-125 shadow-[0_0_20px_#fff]' : 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,1)]'}`}></div>
                                            </div>
                                        )}

                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                                    transition={{ duration: 0.15 }}
                                                    className={`absolute bottom-full mb-6 w-64 bg-slate-900/95 border ${isHQ ? 'border-yellow-500' : 'border-yellow-500/40'} p-3 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none z-[110]`}
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest">{proj.category}</span>
                                                            <span className="text-[9px] text-slate-500 font-bold">{proj.year}</span>
                                                        </div>
                                                        <h4 className="text-sm font-bold text-white leading-tight">{proj.title}</h4>
                                                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                                                            <MapPin className="w-3 h-3 text-yellow-500/70" />
                                                            {proj.location}
                                                        </div>
                                                    </div>
                                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-3 h-3 bg-slate-900 border-r border-b ${isHQ ? 'border-yellow-500' : 'border-yellow-500/40'} rotate-45 transform`}></div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Marker>
                            );
                        })}
                    </ReactMapGL>

                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-900/10 to-slate-900/80 pointer-events-none"></div>
                </div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 md:p-6"
                        onClick={() => setActiveProject(null)}
                        data-lenis-prevent="true"
                        style={{ overscrollBehavior: 'contain' }}
                    >
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-slate-900 border-t-[4px] border-t-yellow-500 border-x border-b border-white/10 rounded-2xl max-w-2xl w-full p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                            onClick={e => e.stopPropagation()}>

                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors border border-white/5 z-50"><X className="w-5 h-5 md:w-6 md:h-6" /></button>

                            <div className="relative z-10 flex flex-col items-start text-left overflow-y-auto custom-scrollbar pr-2 min-h-0">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded font-mono text-xs tracking-widest uppercase">{activeProject.category}</span>
                                    {activeProject.isHQ && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1 rounded font-mono text-xs tracking-widest uppercase">Global Headquarters</span>}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">{activeProject.title}</h3>
                                <div className="flex items-center text-gray-400 text-lg md:text-xl mb-8 font-light"><MapPin className="w-5 h-5 mr-3 text-yellow-500" />{activeProject.location}</div>

                                <div className="w-full bg-slate-800/50 rounded-lg p-6 border border-white/5 shadow-inner">
                                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2"><Layers className="w-4 h-4 text-slate-600" /> Project Scope</div>
                                    <p className="text-gray-300 leading-relaxed text-base md:text-lg italic">"{activeProject.description}"</p>
                                </div>

                                <div className="mt-8 w-full flex justify-between items-center border-t border-white/5 pt-6">
                                    <div className="text-[10px] text-slate-600 font-mono tracking-widest uppercase bg-slate-800/80 px-3 py-1.5 rounded border border-white/5">Project ID: {activeProject.id}</div>
                                    <div className="text-[10px] text-yellow-500/50 font-mono tracking-widest uppercase">Completion: {activeProject.year}</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
                .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; } 
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; } 
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #EAB308; } 

                .maplibregl-ctrl-bottom-right {
                    right: 2.5rem !important;
                    bottom: 2.5rem !important;
                    z-index: 40;
                }
                .maplibregl-ctrl-group {
                    background-color: rgba(15, 23, 42, 0.8) !important;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(234, 179, 8, 0.2) !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4) !important;
                    border-radius: 12px !important;
                    overflow: hidden;
                }
                .maplibregl-ctrl-group button {
                    width: 36px !important;
                    height: 36px !important;
                    transition: all 0.2s ease;
                }
                .maplibregl-ctrl-group button:hover {
                    background-color: rgba(234, 179, 8, 0.15) !important;
                }
                .maplibregl-ctrl-icon {
                    filter: invert(1) brightness(2) !important;
                }
            `}</style>
        </section>
    );
}