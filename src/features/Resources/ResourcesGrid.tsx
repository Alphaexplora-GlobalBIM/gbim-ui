import { motion } from 'framer-motion';
import { ArrowUpRight, Layout, Download } from 'lucide-react';
import { TextReveal } from '../../components/TextReveal';

const articles = [
    { id: "FEAT-01", category: "Industry Report", title: "The Future of AI in Structural Steel Detailing", excerpt: "How machine learning is automating connection design and reducing fabrication errors in high-rise structures.", date: "MAR 15, 2024", author: "Engr. J. Doe", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", size: "large", isDownload: false },
    { id: "NEWS-02", category: "Expansion", title: "Manila Operations Hub Scales Up", excerpt: "New production floor opens to support North American demand.", date: "FEB 28, 2024", author: "Press", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", size: "medium", isDownload: false },
    { id: "TECH-03", category: "Technical Guide", title: "LOD 300 vs LOD 500: A Definitive Guide", excerpt: "Specifying the right Level of Development for BIM execution.", date: "JAN 10, 2024", author: "Tech Dir.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", size: "medium", isDownload: false },
    { id: "DL-04", category: "Asset", title: "2024 Corporate Capability Statement", excerpt: "Download our updated portfolio and service matrix.", date: "UPDATED YESTERDAY", author: "Admin", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800", size: "small", isDownload: true },
    { id: "INSIGHT-05", category: "Sustainability", title: "Green Steel: Reducing Carbon in Fabrication", excerpt: "New methodologies for tracking embodied carbon in structural models.", date: "APR 02, 2024", author: "Research", image: "https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?auto=format&fit=crop&q=80&w=800", size: "medium", isDownload: false },
    { id: "TECH-06", category: "Best Practices", title: "Clash Detection Strategies for MEP", excerpt: "Optimizing coordination between structural steel and mechanical systems.", date: "MAR 20, 2024", author: "BIM Lead", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", size: "medium", isDownload: false },
    { id: "CASE-07", category: "Case Study", title: "Project Spotlight: Aviation Hangar 42", excerpt: "Overcoming long-span truss challenges using Tekla Structures.", date: "FEB 15, 2024", author: "Proj. Mgr", image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800", size: "wide", isDownload: false },
    { id: "MKT-08", category: "Market Watch", title: "2025 Steel Price Forecast", excerpt: "Analysis of global supply chain trends affecting fabrication costs.", date: "JAN 30, 2024", author: "Analyst", image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=800", size: "medium", isDownload: false },
];

const headerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } } as const;
const cardVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } } as const;

export default function ResourcesGrid() {
    return (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="flex flex-col">
                    <motion.div variants={headerVariants} className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10 bg-yellow-500"></div>
                        <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">Intelligence Hub</span>
                    </motion.div>
                    <motion.h1 variants={headerVariants} className="text-5xl md:text-7xl font-bold text-white mb-8">
                        <span className="inline-block relative z-10">RESOURCES</span>{' '}
                        <motion.span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200" style={{ backgroundSize: "200% auto" }} animate={{ backgroundPosition: ["0% center", "-200% center"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                            & INSIGHTS
                        </motion.span>
                    </motion.h1>
                    <div className="max-w-2xl">
                        <TextReveal text="Market analysis, technical documentation, and engineering standards. A knowledge base dedicated to the advancement of structural BIM." variant="blur" as="p" className="text-xl text-slate-400 leading-relaxed" delay={300} />
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest"><Layout className="w-4 h-4" />Latest Transmissions</div>
                <div className="hidden md:flex gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span><span className="text-xs font-bold text-slate-500">LIVE FEED</span></div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                {articles.map((item, index) => (
                    <motion.div key={index} variants={cardVariants}
                        className={`group relative overflow-hidden rounded-sm border border-white/10 bg-slate-800/40 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/10 flex flex-col ${item.size === 'large' ? 'md:col-span-2 md:row-span-2 min-h-[500px]' : ''} ${item.size === 'wide' ? 'md:col-span-2 min-h-[300px]' : ''} ${item.size === 'small' ? 'md:col-span-1 bg-yellow-500/5' : ''}`}>
                        <div className="absolute inset-0 z-0">
                            <img src={item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-700 opacity-60 group-hover:opacity-40 group-hover:scale-105 ${item.isDownload ? 'grayscale opacity-30' : ''}`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                        </div>
                        <div className="relative z-10 p-8 flex flex-col h-full items-start justify-end">
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border backdrop-blur-md rounded-sm ${item.isDownload ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-black/50 text-slate-300 border-white/20'}`}>{item.category}</span>
                            </div>
                            <div className="mt-auto w-full">
                                <div className="flex items-center gap-3 text-yellow-500 font-mono text-xs mb-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"><span>{item.date}</span><span>//</span><span>{item.author}</span></div>
                                <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors ${item.size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{item.title}</h3>
                                <p className={`text-slate-400 leading-relaxed mb-6 border-l-2 border-white/10 pl-4 ${item.size === 'large' ? 'text-lg max-w-xl' : 'text-sm'}`}>{item.excerpt}</p>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 w-full">
                                    <span className="text-xs font-mono text-slate-500">{item.id}</span>
                                    {item.isDownload ? (
                                        <button className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest group/btn">Download <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" /></button>
                                    ) : (
                                        <button className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group/btn hover:text-yellow-500 transition-colors">Read Analysis <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
