import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Maximize2, X, List, LayoutGrid } from 'lucide-react';
import { TextReveal } from '../../components/TextReveal';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer';

// 1. IMPORT YOUR CLEAN DATA
import { rawProjects } from '../../assets/data/projectsData';


// 3. DYNAMIC CLOUDINARY GALLERY LOADER (1 to 14)
const cloudinaryBase = "https://res.cloudinary.com/dqapo8elj/image/upload";

const galleryItems = Array.from({ length: 14 }).map((_, index) => {
    const num = index + 1;
    return {
        id: num,
        real: `${cloudinaryBase}/Site-1-${num}.jpg`,
        sketch: `${cloudinaryBase}/Site-1-${num}_sketch.png`
    };
});

// Dynamically extract categories from the data
const uniqueCats = Array.from(new Set(rawProjects.map((p) => p.category)));
const categories = ['All', ...uniqueCats].sort();

// --- ANIMATION VARIANTS ---

const itemVariants = {
    hidden: {
        opacity: 0,
        x: 40,
        filter: "blur(10px)"
    },
    show: (index: number) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1] as const,
            delay: (index % 10) * 0.1
        }
    })
};

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<'list' | 'gallery'>('gallery');

    // State for Fullscreen Gallery Modal
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

    // Handle URL filtering
    React.useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const decodedCategory = decodeURIComponent(categoryParam);
            if (categories.includes(decodedCategory)) {
                setActiveCategory(decodedCategory);
            }
        }

        const viewParam = searchParams.get('view');
        if (viewParam === 'list' || viewParam === 'gallery') {
            setViewMode(viewParam);
        }
    }, [searchParams]);

    const filteredProjects = useMemo(() => {
        return rawProjects.filter(project => {
            const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-0 selection:bg-yellow-500 selection:text-black">

            {/* 1. PAGE HEADER */}
            {/* Expanded width to max-w-[90rem] */}
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10 bg-yellow-500"></div>
                        <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">Global Portfolio</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 uppercase tracking-tight leading-none">
                        PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 uppercase">ARCHIVE</span>
                    </h1>

                    <div className="max-w-2xl">
                        <TextReveal
                            text="A comprehensive database of our structural engineering feats. Browse over 180+ projects delivered with precision across 30+ countries."
                            variant="blur" as="p" className="text-xl text-slate-400 leading-relaxed" delay={300}
                        />
                    </div>
                </motion.div>
            </div>

            {/* 2. NAVIGATION & SEARCH */}
            {/* Removed 'sticky top-20' so it scrolls naturally */}
            <div className="relative z-40 bg-slate-900/80 border-y border-white/5 mb-0 shadow-2xl shadow-black/50">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Changed lg:flex-row to xl:flex-row to prevent crowding on medium screens */}
                    <div className="flex flex-col xl:flex-row gap-6 justify-between items-center w-full">

                        {/* Left/Top: Filters & Gallery Button */}
                        <div className="flex items-center overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 custom-scrollbar pr-4">

                            {/* Category Filters Group */}
                            <AnimatePresence mode="popLayout">
                                {viewMode === 'list' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="flex items-center shrink-0 pr-6" // Replaces spacing from visual divider
                                    >
                                        <div className="flex items-center gap-2 shrink-0">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat} onClick={() => setActiveCategory(cat)}
                                                    className={`px-5 py-2.5 rounded-sm text-xs font-bold transition-all whitespace-nowrap uppercase tracking-widest border ${activeCategory === cat
                                                        ? 'text-slate-900 bg-yellow-500 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                                                        : 'text-slate-400 hover:text-white bg-slate-800/50 border-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Ample Space Visual Divider */}
                                        <div className="hidden sm:block w-px h-8 bg-white/10 ml-6 shrink-0"></div>
                                        <div className="sm:hidden w-6 shrink-0"></div> {/* Mobile Spacer */}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* View Toggle */}
                            <div className="flex bg-slate-800/50 rounded-sm p-1 border border-white/5 shrink-0">
                                <button
                                    onClick={() => setViewMode('gallery')}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${viewMode === 'gallery' ? 'bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    Gallery
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${viewMode === 'list' ? 'bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <List className="w-4 h-4" />
                                    List
                                </button>
                            </div>
                        </div>

                        {/* Right/Bottom: Search Bar */}
                        <div className="relative w-full xl:w-96 shrink-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                type="text" placeholder="Search archive..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600 font-mono"
                            />
                        </div>

                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* 3. PROJECT LIST WITH SCROLL REVEAL */}
                {viewMode === 'list' && (
                    <motion.div
                        key="list-view"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative pt-12 pb-24 overflow-x-hidden min-h-[500px]"
                    >
                        {/* LIGHT GOLD GRID OVERLAY */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.07] z-0"
                            style={{
                                backgroundImage: `linear-gradient(to right, #eab308 1px, transparent 1px), linear-gradient(to bottom, #eab308 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        {/* Expanded width to max-w-[90rem] */}
                        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="flex flex-col gap-4">
                                <AnimatePresence mode='popLayout'>
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            layout
                                            key={project.id || index}
                                            custom={index}
                                            variants={itemVariants}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true, margin: "-50px" }}
                                            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                            whileHover={{
                                                backgroundColor: "rgba(234, 179, 8, 0.08)",
                                                scale: 1.005,
                                                transition: { duration: 0.3 }
                                            }}
                                            className="group relative border border-white/5 bg-slate-950/60 backdrop-blur-sm transition-colors overflow-hidden rounded-sm cursor-default"
                                        >
                                            {/* GOLD LINE ON HOVER */}
                                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-yellow-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-20" />

                                            <div className="py-6 px-6 md:px-10 flex flex-col md:flex-row gap-4 md:items-center items-start">
                                                {/* Category - Fixed width to align titles */}
                                                <div className="shrink-0 w-40">
                                                    <span className="px-3 py-1.5 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-white/5 rounded-sm whitespace-nowrap">
                                                        {project.category}
                                                    </span>
                                                </div>

                                                {/* Content Section - Title & Location */}
                                                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 md:pl-4">
                                                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-yellow-400 transition-colors leading-tight tracking-tight uppercase">
                                                        {project.title}
                                                    </h3>

                                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-widest shrink-0 mt-2 md:mt-0">
                                                        <MapPin className="w-4 h-4 text-yellow-500/80" />
                                                        <span>{project.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Empty State */}
                            {filteredProjects.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-40 border border-dashed border-white/10 rounded-sm bg-slate-900/50 relative z-10 mt-6"
                                >
                                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-widest">No Matches Found</h3>
                                    <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-yellow-500 text-xs font-bold uppercase tracking-widest hover:underline mt-4">Reset System Filters</button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 5. VISUAL GALLERY (Blueprint to Real) */}
                {viewMode === 'gallery' && (
                    <motion.div
                        key="gallery-view"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        id="detailing-gallery"
                        className="bg-slate-950 relative py-12 border-t border-white/5 scroll-mt-24 min-h-[500px]"
                    >
                        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                            {/* Gallery Header */}
                            <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                                <div>
                                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                        <div className="h-px w-8 bg-yellow-500"></div>
                                        <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">Structural Visuals</span>
                                    </div>
                                    <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Detailing Gallery</h2>
                                </div>
                                <p className="text-slate-500 text-sm max-w-sm">A visual collection of structural detailing highlights, showcasing the transition from 3D model to physical reality.</p>
                            </div>

                            {/* 4-Column Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: (item.id % 4) * 0.1 }}
                                        className="group relative aspect-[4/3] bg-slate-900 rounded-sm overflow-hidden border border-white/5 cursor-pointer"
                                        onClick={() => item.real && setFullScreenImage(item.real)}
                                    >
                                        {/* BLUEPRINT (Default View - Top Layer) */}
                                        {item.sketch && (
                                            <img
                                                src={item.sketch}
                                                alt={`Structural Sketch ${item.id}`}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                                                style={{ zIndex: 10 }}
                                            />
                                        )}

                                        {/* REAL IMAGE (Revealed on Hover - Bottom Layer) */}
                                        {item.real && (
                                            <img
                                                src={item.real}
                                                alt={`Real Construction ${item.id}`}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] scale-100 group-hover:scale-110"
                                                style={{ zIndex: 5 }}
                                            />
                                        )}

                                        {/* Missing Image Fallback */}
                                        {(!item.real || !item.sketch) && (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px] z-0">
                                                ASSET_NOT_FOUND
                                            </div>
                                        )}

                                        {/* Dark Gradient Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 flex flex-col justify-end p-6">
                                            <Maximize2 className="text-yellow-500 w-5 h-5 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                                            <span className="text-white font-mono text-[10px] tracking-widest uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                                Click to Expand
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* FULL SCREEN MODAL */}
            <AnimatePresence>
                {fullScreenImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
                        onClick={() => setFullScreenImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-full transition-colors text-white z-50"
                            onClick={(e) => { e.stopPropagation(); setFullScreenImage(null); }}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={fullScreenImage}
                            alt="Expanded Construction Reality"
                            className="w-auto h-auto max-w-full max-h-full object-contain rounded shadow-2xl shadow-yellow-500/10 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(234, 179, 8, 0.2); }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
        </div>
    );
}
