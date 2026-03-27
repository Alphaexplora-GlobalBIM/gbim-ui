import { TextReveal } from '../../components/TextReveal';

export default function ServicesHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden z-10 pt-24 pb-12">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent" style={{ animation: 'scanline 8s linear infinite' }}></div>
            </div>
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
                <div className="inline-block px-4 py-1 mb-6 border border-yellow-500/30 rounded-full bg-yellow-500/10 text-yellow-500 font-mono text-xs sm:text-sm tracking-widest uppercase backdrop-blur-md opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                    Global BIM Engineering
                </div>
                <div className="overflow-visible mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-tight opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                        <span className="white-shine-wrapper">PRECISION IN{' '}<span className="gold-shimmer-loop">EVERY DETAIL</span></span>
                    </h1>
                </div>
                <TextReveal text="Transforming complex architectural concepts into fabrication-ready reality with advanced 3D modeling and analysis." variant="blur" as="p" className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed" delay={400} />
            </div>
            <style>{`
        @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes shineSweep { 0% { left: -100%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        .animate-slide-up-fade { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .white-shine-wrapper { position: relative; display: inline-block; overflow: hidden; color: white; }
        .white-shine-wrapper::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent); transform: skewX(-25deg); animation: shineSweep 1s ease-in-out 0.8s 1 forwards; pointer-events: none; z-index: 10; }
        @keyframes shimmerMove { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .gold-shimmer-loop { display: inline-block; background-image: linear-gradient(to right, #EAB308 20%, #fde047 50%, #EAB308 80%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmerMove 3s linear infinite; }
      `}</style>
        </section>
    );
}
