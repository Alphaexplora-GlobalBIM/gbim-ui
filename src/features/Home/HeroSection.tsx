import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextReveal } from '../../components/TextReveal';

const heroVideo = "https://res.cloudinary.com/dqapo8elj/video/upload/v1775823253/GBIM_Video.mp4";

const Reveal = ({ children, delay = '', className = '' }: { children: React.ReactNode; delay?: string; className?: string }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); observer.unobserve(e.target); } }, { threshold: 0.15 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={`${isVisible ? `animate-slide-up ${delay}` : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
};

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden pt-24 pb-12">
            <div className="absolute inset-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900"></div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
                <Reveal>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Revolutionizing <span className="text-yellow-500">Steel Detailing</span>
                    </h1>
                </Reveal>
                <div className="mb-10 max-w-3xl mx-auto">
                    <TextReveal text="Precision AutoCAD & Tekla solutions for complex structural projects." variant="blur" as="p" className="text-base sm:text-lg md:text-xl text-gray-300" delay={300} />
                </div>
                <Reveal delay="delay-200">
                    <div className="flex justify-center">
                        <Link to="/contact" className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-600 text-gray-900 font-bold rounded hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg shadow-yellow-600/30 text-sm sm:text-base">
                            Get A Quote <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>
                </Reveal>
            </div>

            {/* VIDEO SOURCE CREDIT - Subtle bottom right corner */}
            <div className="absolute bottom-4 right-4 z-20">
                <a
                    href="https://www.youtube.com/watch?v=4BzjUq921Y4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/30 hover:text-white/80 transition-colors tracking-widest uppercase font-mono"
                >
                    Video Source
                </a>
            </div>

            <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>
        </section>
    );
}