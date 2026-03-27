import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

export default function FAQs() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What specific detailing software do you use?",
            answer: "We primarily utilize Tekla Structures for the massive majority of our 3D BIM structural steel detailing. We are also proficient in AutoCAD for 2D drafting and coordination needs depending on client project specifications."
        },
        {
            question: "Do you handle projects outside of the Philippines?",
            answer: "Absolutely. GlobalBIM Engineering Services has extensive experience working with clients worldwide, including major projects in the United States, Australia, the Middle East (UAE, Saudi Arabia, Qatar), and Europe."
        },
        {
            question: "How long does it typically take to get a quote?",
            answer: "Once you submit your project drawings and specifications through our contact form, our estimation team typically reviews the scope and provides a detailed quotation within 24 to 48 business hours."
        },
        {
            question: "Are your deliverables compliant with international standards?",
            answer: "Yes. Our engineering and detailing teams are well-versed in interpreting and strictly adhering to global structural standards including AISC (USA), BS/EN (Europe), and AS/NZS (Australia/New Zealand)."
        },
        {
            question: "Can we sign a Non-Disclosure Agreement (NDA)?",
            answer: "We understand that architectural designs and intellectual property are highly sensitive. We are fully willing and accustomed to signing NDAs before receiving any project files or opening discussions."
        },
        {
            question: "How do you handle revisions or changes in design?",
            answer: "We incorporate a clear revision management process. Minor coordination adjustments are usually handled fluidly, while major architectural changes mid-project are formally logged as variations, quoted for approval, and executed immediately."
        }
    ];

    return (
        <div className="bg-slate-950 min-h-screen pt-32 pb-24 text-slate-300 font-sans relative overflow-hidden">

            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <Reveal>
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-12 flex items-center text-slate-400 hover:text-yellow-500 transition-colors group text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <div className="text-center mb-16">
                        <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <MessageSquare className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Find answers to the most common questions regarding our engineering workflow, project handling, and company policies.
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="bg-slate-900 border border-white/5 shadow-lg rounded-xl overflow-hidden hover:border-white/10 transition-colors"
                        >
                            <button
                                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={`font-bold text-lg md:text-xl transition-colors ${openIndex === index ? 'text-yellow-500' : 'text-white'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ml-4 ${openIndex === index ? 'rotate-180 text-yellow-500' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed border-t border-white/5 mx-6 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <Reveal delay="delay-300">
                    <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border border-yellow-500/20 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
                        <p className="text-slate-400 mb-6">Our team is always ready to discuss your specific engineering needs.</p>
                        <a href="/contact" className="inline-block bg-yellow-500 hover:bg-white text-slate-900 font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]">
                            Contact Us Today
                        </a>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
