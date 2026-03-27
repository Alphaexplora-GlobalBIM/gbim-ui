import { Target, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../../components/Reveal';

const values = [
    { icon: Target, title: "Precision", desc: "We believe that in engineering, close enough is not enough. We strive for zero-error deliverables." },
    { icon: Users, title: "Collaboration", desc: "We don't just work for you; we work with you. We act as an extension of your in-house team." },
    { icon: Zap, title: "Innovation", desc: "We constantly upgrade our tech stack (Lisp, API automation) to deliver faster than the competition." },
    { icon: Award, title: "Integrity", desc: "Transparent pricing, honest timelines, and a commitment to seeing every project through." },
];

export default function CoreValues() {
    return (
        <section className="py-48 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-20">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Values</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
                    </Reveal>
                </div>
                <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}>
                    {values.map((val, i) => (
                        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}>
                            <div className="group h-full bg-slate-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-slate-800/60 hover:border-yellow-500/50 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50 border border-white/10">
                                    <val.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{val.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
