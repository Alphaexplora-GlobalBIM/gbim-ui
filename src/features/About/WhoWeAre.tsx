import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../../components/Reveal';
import { TextReveal } from '../../components/TextReveal';

export default function WhoWeAre() {
    return (
        <section className="py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.0 }}>
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" alt="Engineer Working" className="w-full h-auto object-cover opacity-90" />
                            </div>
                        </motion.div>
                        <div className="absolute -bottom-10 -right-10 w-2/3 z-20 hidden md:block">
                            <motion.div initial={{ opacity: 0, x: 50, y: 50 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }}>
                                <div className="rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">
                                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80" alt="Steel Structure" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                            </motion.div>
                        </div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(#eab308_2px,transparent_2px)] [background-size:16px_16px] opacity-20"></div>
                    </div>

                    <div className="lg:pl-10">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Who We Are</h2>
                        </Reveal>
                        <div className="mb-6">
                            <TextReveal text="GlobalBIM Engineering Services is a leading Philippines-based engineering firm revolutionizing structural steel detailing and pre-engineered building design through advanced CAD and BIM solutions." variant="blur" as="p" className="text-lg text-slate-400 leading-relaxed text-justify" delay={100} />
                        </div>
                        <div className="mb-10">
                            <TextReveal text="Our Marikina-based team combines technical precision with creative problem-solving to deliver exceptional results for complex steel construction projects. With certified expertise in AutoCAD and Tekla Structures, we transform architectural visions into buildable reality for clients throughout the Philippines and internationally." variant="blur" as="p" className="text-lg text-slate-400 leading-relaxed text-justify" delay={300} />
                        </div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}>
                            <ul className="space-y-4 mb-10">
                                {['24/7 Support', 'Cost Efficient'].map((item, i) => (
                                    <motion.li key={i} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }} className="flex items-center space-x-3 text-white font-bold">
                                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/30">
                                            <CheckCircle2 size={14} strokeWidth={4} />
                                        </div>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
