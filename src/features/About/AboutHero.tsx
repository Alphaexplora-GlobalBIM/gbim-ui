import { TextReveal } from '../../components/TextReveal';

export default function AboutHero() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden z-10 pt-24 pb-12">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Engineering Office"
                    className="w-full h-full object-cover opacity-30 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 opacity-80"></div>
            </div>
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                <div className="inline-block mb-4 px-4 py-1.5 border border-yellow-500/50 rounded-full bg-yellow-500/10 backdrop-blur-sm animate-slide-up">
                    <span className="text-yellow-400 font-mono text-xs tracking-widest uppercase">Est. 1996 • Philippines</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <span className="white-shine-wrapper">
                        BUILDING THE FUTURE<br />
                        <span className="gold-shimmer-loop">SINCE 1996</span>
                    </span>
                </h1>
                <div style={{ opacity: 0, animation: 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s' }}>
                    <TextReveal text="Engineering excellence through innovation and decades of trust." variant="blur" as="p" className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light" delay={300} />
                </div>
            </div>
            <style>{`
        @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes shineSweep { 0% { left: -100%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        .white-shine-wrapper { position: relative; display: inline-block; overflow: hidden; color: white; padding-bottom: 15px; }
        .white-shine-wrapper::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent); transform: skewX(-25deg); animation: shineSweep 1.2s ease-in-out 1s 1 forwards; pointer-events: none; z-index: 10; }
        @keyframes shimmerMove { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .gold-shimmer-loop { display: inline-block; background-image: linear-gradient(to right, #EAB308 20%, #fde047 50%, #EAB308 80%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmerMove 3s linear infinite; }
      `}</style>
        </section>
    );
}
