import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';

export default function ServicesCTA() {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900 to-slate-900/0 pointer-events-none"></div>
            <div className="max-w-5xl mx-auto px-4 text-center relative z-20">
                <Reveal>
                    <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Optimize Your Structure?</h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Contact our engineering team today for a free consultation on your next complex steel project.</p>
                        <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-yellow-500/20">
                            Start a Project <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
