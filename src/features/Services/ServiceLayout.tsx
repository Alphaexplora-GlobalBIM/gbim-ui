import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';
import { TextReveal } from '../../components/TextReveal';

interface ServiceLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    benefits: string[];
    features: { title: string; desc: string }[];
    video?: string;
}

export default function ServiceLayout({ title, subtitle, description, image, benefits, features, video }: ServiceLayoutProps) {
    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans relative overflow-hidden">

            {/* --- GLOBAL BACKGROUND TEXTURE --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}>
                </div>
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden z-10 pt-24 pb-12">
                <div className="absolute inset-0">
                    <img src={image} alt={title} className="w-full h-full object-cover opacity-20 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <div>
                        {/* Subtitle */}
                        <TextReveal
                            text={subtitle}
                            variant="blur"
                            as="div"
                            className="text-yellow-500 font-bold tracking-widest uppercase mb-4 text-xs sm:text-sm"
                        />

                        {/* Title */}
                        <TextReveal
                            text={title}
                            variant="slide"
                            as="h1"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight"
                            delay={200}
                        />
                    </div>
                </div>
            </section>

            {/* 2. MAIN CONTENT (Zig-Zag Layout) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    {/* --- ROW 1: IMAGE (Left) + OVERVIEW TEXT (Right) --- */}
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                        {/* Image Side */}
                        <Reveal>
                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 h-[400px] group">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                            </div>
                        </Reveal>

                        {/* Text Side */}
                        <div>
                            <TextReveal
                                text={`${title} Overview`}
                                variant="slide"
                                as="h2"
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                            />
                            <div className="w-20 h-1.5 bg-yellow-500 rounded mb-8"></div>

                            <TextReveal
                                text={description}
                                variant="blur"
                                as="p"
                                className="text-lg text-slate-400 leading-relaxed mb-8 whitespace-pre-line text-justify"
                                delay={200}
                            />
                        </div>
                    </div>

                    {/* --- ROW 2: BENEFITS TEXT (Left) + VIDEO (Right) --- */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* Text Side */}
                        <div>
                            <TextReveal
                                text="Collaboration For Success"
                                variant="slide"
                                as="h2"
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                            />

                            <TextReveal
                                text="Our design team works closely with architects, consultants, and suppliers to bring our clients' visions to life. This collaborative approach involves assembling the most skilled team to manage and guide the design development, ensuring the best possible value for the project."
                                variant="blur"
                                as="p"
                                className="text-slate-400 text-lg mb-8 leading-relaxed text-justify"
                                delay={200}
                            />

                            <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>
                            <ul className="space-y-5">
                                {benefits.map((benefit, index) => (
                                    <Reveal key={index} delay={`delay-${index * 100}`}>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-300 font-medium text-lg">{benefit}</span>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        </div>

                        {/* Video Side */}
                        <Reveal delay="delay-200">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 h-[350px] bg-slate-800 group">
                                <video
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    poster={image}
                                >
                                    <source src={video || "https://videos.pexels.com/video-files/3844888/3844888-hd_1920_1080_30fps.mp4"} type="video/mp4" />
                                </video>
                            </div>
                        </Reveal>

                    </div>

                </div>
            </section>

            {/* 3. DETAILED FEATURES GRID */}
            <section className="py-24 bg-slate-950 relative z-10 border-t border-white/5">

                {/* TOP BLUR TRANSITION */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20">
                    <div className="text-center mb-16">
                        <TextReveal
                            text="Technical Capabilities"
                            variant="slide"
                            as="h2"
                            className="text-3xl font-bold mb-4 text-white"
                        />
                        <TextReveal
                            text="Our deliverables are optimized for fabrication accuracy and site safety."
                            variant="blur"
                            as="p"
                            className="text-slate-400"
                            delay={200}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Reveal key={index} delay={`delay-${index * 100}`}>
                                <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-colors h-full hover:-translate-y-1 duration-300">
                                    <h3 className="text-xl font-bold text-yellow-500 mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm text-justify">{feature.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA */}
            <section className="py-20 bg-yellow-600 relative z-10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Start Your Project?</h2>
                    <p className="text-slate-800 text-lg mb-8 font-medium">
                        Get a comprehensive estimate within 24 hours. No obligation.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                            Get A Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
