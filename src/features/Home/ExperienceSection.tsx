import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';

const history = [
    { year: "1996", angle: 160, title: "Foundation", desc: "Established in Marikina as a boutique drafting firm." },
    { year: "2002", angle: 140, title: "First High-Rise", desc: "Secured first 30-story tower in Makati." },
    { year: "2008", angle: 110, title: "BIM Adoption", desc: "Transitioned fully to 3D BIM workflows." },
    { year: "2015", angle: 80, title: "Global Reach", desc: "Expanded to North American & Australian markets." },
    { year: "2020", angle: 50, title: "Remote Growth", desc: "Scaled to 50+ engineers with cloud collaboration." },
    { year: "Present", angle: 20, title: "Leadership", desc: "180+ projects completed worldwide." }
];

const getPointOnArc = (deg: number, r: number) => {
    const cx = 500, cy = 500, rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
};

const CountUpNum = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!visible) return;
        let s = 0; const inc = end / (2000 / 16);
        const t = setInterval(() => { s += inc; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
        return () => clearInterval(t);
    }, [end, visible]);
    return <span ref={ref}>{count}{suffix}</span>;
};

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ExperienceSection() {
    const [activeItem, setActiveItem] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleNext = () => { setActiveItem(p => (p + 1) % history.length); setIsPaused(true); };
    const handlePrev = () => { setActiveItem(p => (p - 1 + history.length) % history.length); setIsPaused(true); };

    useEffect(() => {
        if (!isPaused) autoplayRef.current = setInterval(() => setActiveItem(p => (p + 1) % history.length), 4000);
        return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
    }, [isPaused]);

    return (
        <section className="py-24 bg-slate-900 relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <Reveal>
                        <div className="relative h-[600px] w-[140%] -ml-[20%] flex items-end justify-center pb-0"
                            onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                            <svg viewBox="0 0 1000 500" className="w-full h-full overflow-visible select-none">
                                {Array.from({ length: 19 }).map((_, i) => {
                                    const a = 180 - i * 10;
                                    const s = getPointOnArc(a, 150), e = getPointOnArc(a, 480);
                                    return <line key={i} x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />;
                                })}
                                <path d="M 50 500 A 450 450 0 0 1 950 500" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="10 10" opacity="0.5" />
                                <path d="M 150 500 A 350 350 0 0 1 850 500" fill="none" stroke="#334155" strokeWidth="2" />
                                {Array.from({ length: 91 }).map((_, i) => {
                                    const a = 180 - i * 2, isMajor = a % 10 === 0, activeAngle = history[activeItem].angle, isActive = a === activeAngle;
                                    const p1 = getPointOnArc(a, 380), p2 = getPointOnArc(a, isMajor ? 410 : 395), c = { x: 500, y: 500 }, ray = getPointOnArc(a, 380);
                                    return (
                                        <g key={i}>
                                            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={isMajor ? "#94a3b8" : "#475569"} strokeWidth={isMajor ? 2 : 1} />
                                            {isActive && <g>
                                                <line x1={c.x} y1={c.y} x2={ray.x} y2={ray.y} stroke="#EAB308" strokeWidth="3" className="transition-all duration-500 ease-out" />
                                                <circle cx={ray.x} cy={ray.y} r="6" fill="#EAB308" className="animate-pulse" />
                                                <circle cx={ray.x} cy={ray.y} r="3" fill="#1e293b" />
                                            </g>}
                                        </g>
                                    );
                                })}
                                {history.map((item, index) => {
                                    const pos = getPointOnArc(item.angle, 425), active = activeItem === index;
                                    return (
                                        <g key={index} onClick={() => setActiveItem(index)} className="cursor-pointer">
                                            {active && <circle cx={pos.x} cy={pos.y} r="18" fill="#EAB308" opacity="0.2"><animate attributeName="r" from="12" to="22" dur="1.5s" repeatCount="indefinite" /><animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" /></circle>}
                                            <circle cx={pos.x} cy={pos.y} r={active ? 6 : 4} fill={active ? "#EAB308" : "#0f172a"} stroke={active ? "#fff" : "#64748b"} strokeWidth="2" className="transition-all duration-300" />
                                            <text x={pos.x} y={pos.y - 25} textAnchor="middle" className={`text-sm font-bold select-none ${active ? 'fill-yellow-500' : 'fill-slate-500'}`}>{item.year}</text>
                                        </g>
                                    );
                                })}
                            </svg>

                            <div className="absolute inset-x-0 bottom-6 md:bottom-12 flex justify-center px-4 pointer-events-none">
                                <AnimatePresence mode="wait">
                                    <motion.div key={activeItem} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                                        className="bg-slate-900/95 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full max-w-[280px] md:max-w-sm text-center relative overflow-hidden backdrop-blur-xl pointer-events-auto">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                                        <span className="text-yellow-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 block">// Milestone_{history[activeItem].year}</span>
                                        <h3 className="text-xl md:text-3xl font-black text-white mb-2 uppercase tracking-wide leading-tight">{history[activeItem].title}</h3>
                                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm mx-auto">{history[activeItem].desc}</p>
                                        <div className="flex justify-between items-center absolute inset-y-0 left-1 right-1 md:left-4 md:right-4 pointer-events-none">
                                            <button onClick={handlePrev} className="pointer-events-auto p-1 md:p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-colors"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /></button>
                                            <button onClick={handleNext} className="pointer-events-auto p-1 md:p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-colors"><ChevronRight className="w-5 h-5 md:w-6 md:h-6" /></button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>

                    <div className="space-y-12 pl-0 lg:pl-10 relative z-20">
                        <Reveal delay="delay-100">
                            <div className="border-b border-gray-700 pb-8">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <div className="text-7xl font-bold text-yellow-500"><CountUpNum end={30} /></div>
                                    <div className="text-xl text-slate-500 font-mono">EST. 1996</div>
                                </div>
                                <h3 className="text-3xl text-white font-medium">Years of Excellence</h3>
                            </div>
                        </Reveal>
                        <Reveal delay="delay-200">
                            <div className="border-b border-gray-700 pb-8">
                                <div className="text-7xl font-bold text-yellow-500 mb-2"><CountUpNum end={180} suffix="+" /></div>
                                <h3 className="text-3xl text-white font-medium">Global Projects</h3>
                            </div>
                        </Reveal>
                        <Reveal delay="delay-300">
                            <div>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">Our legacy is built on precision and trust. From boutique beginnings to a global force in structural engineering.</p>
                                <Link to="/about" className="text-yellow-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:text-white transition-colors">Read Our Full Story <ArrowRight className="w-4 h-4" /></Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
