import { motion } from 'framer-motion';
import ContactForm from '../features/Contact/ContactForm';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-0 selection:bg-yellow-500 selection:text-black overflow-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="fixed top-0 left-[-10%] w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="fixed bottom-0 right-[-10%] w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[120px] pointer-events-none" />
      <ContactForm />
      <Footer />
    </div>
  );
}