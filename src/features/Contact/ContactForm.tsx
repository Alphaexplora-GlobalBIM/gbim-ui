import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Upload, FileText, Send, CheckCircle2 } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } } as const;
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } } as const;

export default function ContactForm() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', service: 'Structural Steel Detailing', details: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => { const r = new FileReader(); r.readAsDataURL(file); r.onload = () => resolve(r.result as string); r.onerror = reject; });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setIsLoading(true); setStatusMessage({ type: '', text: '' });
        try {
            let file_content = null, file_name = null;
            if (selectedFile) { file_content = await fileToBase64(selectedFile); file_name = selectedFile.name; }
            const response = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, file_name, file_content }) });
            if (response.ok) { setStatusMessage({ type: 'success', text: 'Thank you! Your inquiry has been sent.' }); setFormData({ firstName: '', lastName: '', email: '', company: '', service: 'Structural Steel Detailing', details: '' }); setSelectedFile(null); }
            else { const err = await response.json(); throw new Error(err.error?.message || 'Failed to send'); }
        } catch { setStatusMessage({ type: 'error', text: 'Failed to send the request. Please try again.' }); }
        finally { setIsLoading(false); }
    };

    const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0]); };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) setSelectedFile(e.target.files[0]); };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow mb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="text-center mb-16">
                <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-6" initial={{ letterSpacing: "-0.05em" }} animate={{ letterSpacing: "0em" }} transition={{ duration: 1, ease: "easeOut" }}>
                    Start Your <span className="text-yellow-500 inline-block">Project</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Ready to optimize your structure? Submit your architectural plans or details below, and our engineering team will provide a comprehensive technical proposal.
                </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="lg:col-span-5 space-y-8">
                    <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-xl">
                        <h3 className="text-2xl font-bold text-white mb-6">Global Operations</h3>
                        <div className="space-y-8">
                            {[
                                { icon: MapPin, label: "Headquarters (Philippines)", content: <p className="text-gray-400 leading-relaxed font-mono text-sm">6A T. Bugallon St.<br />Marikina Heights, Marikina City<br />Philippines 1810</p> },
                                { icon: Phone, label: "Direct Lines", content: <div className="space-y-1"><p className="text-gray-400 font-mono text-sm flex items-center gap-2"><span className="text-xs bg-slate-700 px-1 rounded text-white">PH</span> (+63) 962 664 0660</p><p className="text-gray-400 font-mono text-sm flex items-center gap-2"><span className="text-xs bg-slate-700 px-1 rounded text-white">CA</span> +1 (584) 447 3416</p></div> },
                                { icon: Mail, label: "Project Inquiries", content: <p className="text-gray-400 font-mono text-sm">info@globalbim.ph</p> },
                            ].map(({ icon: Icon, label, content }, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="p-3 bg-yellow-500/10 rounded-sm border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors"><Icon className="h-6 w-6 text-yellow-500" /></div>
                                    <div><span className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">{label}</span>{content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 border border-dashed border-white/10 rounded-sm bg-white/[0.02]">
                        <h4 className="text-sm font-bold text-white mb-4">WHY PARTNER WITH US?</h4>
                        <ul className="space-y-3">
                            {['AISC & NISD Compliant Standards', 'Turnaround Time Guarantee', 'Senior Engineering Oversight', 'Seamless BIM Integration'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-yellow-500" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="bg-slate-800 p-8 md:p-10 rounded-sm border-t-4 border-yellow-500 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                            <div><h3 className="text-2xl font-bold text-white">Project Brief</h3><p className="text-slate-400 text-sm mt-1">Submit your requirements for a technical review.</p></div>
                        </div>
                        {statusMessage.text && <div className={`mb-6 p-4 rounded-sm text-sm font-medium border ${statusMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{statusMessage.text}</div>}
                        <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors" placeholder="John" /></motion.div>
                                <motion.div variants={itemVariants}><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Doe" /></motion.div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Work Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors" placeholder="john@company.com" /></motion.div>
                                <motion.div variants={itemVariants}><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company / Organization</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Construction Co." /></motion.div>
                            </div>
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Required</label>
                                <div className="relative"><select name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer"><option>Structural Steel Detailing</option><option>Pre-Engineered Buildings (PEB)</option><option>Steel Design & Analysis</option><option>BIM Consulting</option><option>Other / General Inquiry</option></select><div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div></div>
                            </motion.div>
                            <motion.div variants={itemVariants}><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Details / Scope</label><textarea name="details" value={formData.details} onChange={handleInputChange} required rows={4} className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Please describe the project scope, estimated tonnage, and timeline..."></textarea></motion.div>
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Files (Architectural/Structural)</label>
                                <div className={`relative border-2 border-dashed rounded-sm p-8 text-center transition-all duration-300 cursor-pointer ${dragActive ? 'border-yellow-500 bg-yellow-500/10 scale-[1.02]' : 'border-white/10 bg-slate-900/50 hover:border-white/30 hover:bg-slate-900'}`}
                                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleChange} />
                                    {!selectedFile ? (
                                        <div className="flex flex-col items-center gap-3"><div className="p-3 bg-slate-800 rounded-full border border-white/5"><Upload className="w-6 h-6 text-yellow-500" /></div><div><p className="text-sm text-white font-medium">Click to upload or drag and drop</p><p className="text-xs text-slate-500 mt-1">PDF, DWG, IFC, or Revit files (Max 50MB)</p></div></div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-4 relative z-10"><div className="p-3 bg-green-500/20 rounded-full"><FileText className="w-6 h-6 text-green-500" /></div><div className="text-left"><p className="text-sm text-white font-medium">{selectedFile.name}</p><p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p></div><button onClick={e => { e.preventDefault(); setSelectedFile(null); }} className="text-xs text-red-400 hover:text-red-300 underline ml-4 relative z-20 pointer-events-auto">Remove</button></div>
                                    )}
                                </div>
                            </motion.div>
                            <motion.button variants={itemVariants} type="submit" disabled={isLoading} className="w-full bg-yellow-500 text-black font-bold text-sm py-4 rounded-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? 'SENDING...' : 'SUBMIT REQUEST'}{!isLoading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </motion.button>
                            <motion.p variants={itemVariants} className="text-center text-xs text-slate-500 mt-4">By submitting this form, you agree to our privacy policy. Your data is secure.</motion.p>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
