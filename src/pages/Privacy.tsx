import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-950 min-h-screen pt-32 pb-24 text-slate-300 font-sans relative overflow-hidden">

            {/* Background elements for premium aesthetic */}
            <div className="absolute top-1/2 left-0 -mt-40 -ml-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

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
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                        <p className="text-slate-400 text-lg">Effective Date: March {new Date().getFullYear()}</p>
                    </div>

                    <div className="bg-slate-900 border border-white/5 shadow-2xl rounded-2xl p-8 md:p-12 space-y-8 prose prose-invert prose-yellow max-w-none">

                        <p className="text-lg">
                            At GlobalBIM Engineering Services, we are committed to protecting your privacy and ensuring the security of your personal and corporate information.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <ul className="space-y-2 list-disc pl-5">
                                <li><strong>Contact Information:</strong> Name, email address, phone number, and company details provided via our contact forms.</li>
                                <li><strong>Project Data:</strong> Architectural blueprints, structural specifications, and any files uploaded for project inquiries.</li>
                                <li><strong>Usage Data:</strong> Anonymous analytical data on how visitors navigate and interact with our website to improve UX.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <p>
                                We use the data we collect solely for the following purposes:
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>To evaluate incoming project bids and provide accurate estimates.</li>
                                <li>To communicate with you directly regarding ongoing projects, inquiries, or billing.</li>
                                <li>To improve our website functionality and internal service workflows.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security & Confidentiality</h2>
                            <p>
                                As an engineering firm handling sensitive architectural IP, we adhere strictly to Non-Disclosure Agreements (NDAs). Your uploaded files, structural specs, and contact information are stored securely and are never sold, rented, or traded to third-party marketers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
                            <p>
                                We may utilize trusted third-party services (such as secure email delivery APIs and cloud storage) to facilitate our business operations. These providers are bound by strict confidentiality obligations and are not permitted to use your information for their own purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                            <p>
                                You retain the right to request access to, correction of, or deletion of your personal data stored in our systems at any point in time. Simply contact our support team.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p>
                                For concerns or further clarifications regarding this Privacy Policy, please reach us at: <a href="mailto:globalbim.ph@gmail.com" className="text-yellow-500 hover:text-yellow-400 font-mono">globalbim.ph@gmail.com</a>
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
