import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutCTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-950 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0 }} className="relative z-10 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Want to be part of our next chapter?</h2>
                <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                    Whether you need engineering services or want to join our growing team, we'd love to hear from you.
                </p>
                <Link to="/contact" className="group inline-flex items-center px-8 py-4 bg-yellow-500 text-slate-900 font-bold rounded-full hover:bg-white transition-all shadow-[0_0_40px_-10px_rgba(234,179,8,0.6)] hover:shadow-white/20 hover:scale-105">
                    Get A Quote <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
}
