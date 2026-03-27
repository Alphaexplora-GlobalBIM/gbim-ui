import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const history = [
    { year: "1996", title: "Foundation", desc: "Established in Marikina as a boutique drafting firm." },
    { year: "2002", title: "First High-Rise", desc: "Secured first 30-story tower in Makati." },
    { year: "2008", title: "BIM Adoption", desc: "Transitioned fully to 3D BIM workflows." },
    { year: "2015", title: "Global Reach", desc: "Expanded to North American & Australian markets." },
    { year: "2020", title: "Remote Growth", desc: "Scaled to 50+ engineers with cloud collaboration." },
    { year: "Present", title: "Leadership", desc: "600+ projects completed worldwide." }
];

const fixedAngles = [160, 130, 100, 80, 50, 20];

export default function Timeline() {
    const [activeItem, setActiveItem] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleNext = () => { setActiveItem(p => (p + 1) % history.length); setIsPaused(true); };
    const handlePrev = () => { setActiveItem(p => (p - 1 + history.length) % history.length); setIsPaused(true); };

    useEffect(() => {
        if (!isPaused) autoplayRef.current = setInterval(() => setActiveItem(p => (p + 1) % history.length), 4000);
        return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
    }, [isPaused, history.length]);

    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-slate-900/50"
            onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="text-center mb-8 md:mb-16">
                    <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Our Legacy</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Engineering History</h2>
                </motion.div>

                <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] select-none">
                    <svg viewBox="0 0 1000 500" className="w-full h-full overflow-visible">
                        <path d="M 100 500 A 400 400 0 0 1 900 500" fill="none" stroke="#475569" strokeWidth="2" />
                        <path d="M 50 500 A 450 450 0 0 1 950 500" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" />
                        {Array.from({ length: 181 }).map((_, i) => {
                            const angleDeg = 180 - i, angleRad = (angleDeg * Math.PI) / 180;
                            const cx = 500, cy = 500, isMajor = i % 10 === 0;
                            const activeAngle = fixedAngles[activeItem], isActiveLine = isMajor && angleDeg === activeAngle;
                            const tx1 = cx + 380 * Math.cos(angleRad), ty1 = cy - 380 * Math.sin(angleRad);
                            const tx2 = cx + (isMajor ? 415 : 395) * Math.cos(angleRad), ty2 = cy - (isMajor ? 415 : 395) * Math.sin(angleRad);
                            const rx2 = cx + 370 * Math.cos(angleRad), ry2 = cy - 370 * Math.sin(angleRad);
                            return (
                                <g key={i}>
                                    <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke={isMajor ? "#94a3b8" : "#475569"} strokeWidth={isMajor ? 2 : 1} />
                                    {isMajor && <line x1={cx} y1={cy} x2={rx2} y2={ry2} stroke={isActiveLine ? "#EAB308" : "#1e293b"} strokeWidth={isActiveLine ? "2" : "1"} className="transition-colors duration-500 ease-in-out" style={{ opacity: isActiveLine ? 1 : 0.5 }} />}
                                </g>
                            );
                        })}
                        {history.map((item, index) => {
                            const deg = fixedAngles[index], rad = (deg * Math.PI) / 180;
                            const x = 500 + 400 * Math.cos(rad), y = 500 - 400 * Math.sin(rad), isActive = activeItem === index;
                            return (
                                <g key={index} onClick={() => { setActiveItem(index); setIsPaused(true); }} onMouseEnter={() => { setActiveItem(index); setIsPaused(true); }} className="cursor-pointer">
                                    {isActive && <circle cx={x} cy={y} r={10} fill="#eab308" opacity="0.4"><animate attributeName="r" from="10" to="28" dur="1.5s" begin="0s" repeatCount="indefinite" /><animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" /></circle>}
                                    <circle cx={x} cy={y} r={isActive ? 10 : 6} fill={isActive ? "#eab308" : "#1e293b"} stroke={isActive ? "#fff" : "#64748b"} strokeWidth="2" className="transition-all duration-300" />
                                    <text x={x} y={y - 25} textAnchor="middle" className={`text-sm font-bold select-none ${isActive ? 'fill-yellow-500' : 'fill-slate-500'}`}>{item.year}</text>
                                </g>
                            );
                        })}
                        <foreignObject x="250" y="220" width="500" height="280">
                            <div className="w-full h-full flex flex-col items-center justify-end text-center p-4">
                                <div className="bg-slate-800 border border-white/10 shadow-2xl p-8 rounded-2xl w-full h-full flex flex-col justify-center relative overflow-hidden z-20">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                                    <div key={activeItem} className="animate-fade-in-up">
                                        <h3 className="text-3xl font-bold text-white mb-3">{history[activeItem].year}</h3>
                                        <h4 className="text-xl font-semibold text-yellow-500 mb-2">{history[activeItem].title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{history[activeItem].desc}</p>
                                    </div>
                                </div>
                            </div>
                        </foreignObject>
                    </svg>
                    <button onClick={handlePrev} className="absolute left-[25%] top-[72%] -translate-y-1/2 -translate-x-1/2 p-3 rounded-full bg-slate-800 shadow-lg border border-white/10 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition-all z-30"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={handleNext} className="absolute left-[75%] top-[72%] -translate-y-1/2 -translate-x-1/2 p-3 rounded-full bg-slate-800 shadow-lg border border-white/10 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition-all z-30"><ChevronRight className="w-6 h-6" /></button>
                </div>
            </div>
            <style>{`@keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }`}</style>
        </section>
    );
}
