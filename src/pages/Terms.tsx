import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-950 min-h-screen pt-32 pb-24 text-slate-300 font-sans relative overflow-hidden">

            {/* Background elements for premium aesthetic */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 flex items-center text-slate-400 hover:text-yellow-500 transition-colors group text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <div className="mb-12">
                        <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase mb-4 block">Legal Documentation</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
                        <p className="text-slate-400 text-lg">Last Updated: March {new Date().getFullYear()}</p>
                    </div>

                    <div className="bg-slate-900 border border-white/5 shadow-2xl rounded-2xl p-8 md:p-12 space-y-8 prose prose-invert prose-yellow max-w-none">

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the website and services provided by GlobalBIM Engineering Services ("Company", "we", "us", or "our"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Professional Services</h2>
                            <p>
                                GlobalBIM provides structural steel detailing, BIM modeling, and engineering consultation services. The scope, timeline, and deliverables for any specific project will be outlined in a separate, mutually agreed-upon formal contract or proposal format.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
                            <p>
                                Unless otherwise explicitly stated in a signed contract, the structural models, proprietary drafting techniques, scripts, and documentation developed by GlobalBIM remain our intellectual property. Clients are granted a limited license to use the final deliverables strictly for the construction of the specified project.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                            <p>
                                While we adhere strictly to industry standards and exercise the utmost professional care, GlobalBIM Engineering Services shall not be held liable for indirect, incidental, or consequential damages resulting from the use of our models or drawings, including but not limited to construction delays entirely outside our agreed scope of work.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Revisions and Modifications</h2>
                            <p>
                                We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
                            <p>
                                If you have any questions regarding these Terms & Conditions, please contact us at: <a href="mailto:globalbim.ph@gmail.com" className="text-yellow-500 hover:text-yellow-400 font-mono">globalbim.ph@gmail.com</a>
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
