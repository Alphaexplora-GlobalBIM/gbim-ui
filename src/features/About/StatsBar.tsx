import { motion } from 'framer-motion';
import { CountUp } from '../../components/CountUp';

export default function StatsBar() {
    const stats = [
        { num: 30, label: "Years Active" },
        { num: 180, suffix: "+", label: "Projects Built" },
        { num: 20, suffix: "+", label: "Expert Engineers" },
        { num: 24, num2: 7, label: "Global Support" }
    ];

    return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            className="bg-yellow-500 py-12 relative z-20 shadow-2xl shadow-yellow-500/20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-900/10">
                {stats.map((stat, i) => (
                    <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-1 flex items-center justify-center">
                            <CountUp end={stat.num} suffix={stat.suffix} />
                            {stat.num2 && <><span className="mx-0.5">/</span><CountUp end={stat.num2} /></>}
                        </div>
                        <div className="text-slate-800 font-medium uppercase tracking-wider text-xs">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
