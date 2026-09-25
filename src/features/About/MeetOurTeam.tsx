// src/features/About/MeetOurTeam.tsx

import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import Footer from "../../components/Footer";
import { teamData } from "../../assets/data/teamData";

export default function MeetOurTeam() {
  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-32 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-4 block">
              The Minds Behind The Models
            </span>
          </Reveal>
          <TextReveal
            text="Meet Our Leadership Team"
            variant="slide"
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          />
          <TextReveal
            text="Our strength lies not just in our software, but in the decades of collective engineering experience our team brings to every structural challenge."
            variant="blur"
            as="p"
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            delay={200}
          />
        </div>
      </section>

      <section className="py-16 relative z-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* CHANGED: Switched from grid to flex-wrap with justify-center */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {teamData.map((member) => (
              <motion.div
                key={member.id}
                /* ADDED: Calculated widths to maintain 3-column sizing with gaps */
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] flex"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                  },
                }}
              >
                <div className="group flex flex-col w-full h-full bg-slate-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10 shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>

                    <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-slate-900 hover:border-yellow-500 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-slate-900 hover:border-yellow-500 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-yellow-600 text-sm font-bold uppercase tracking-wider mb-4">
                      {member.role}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4 mb-6 line-clamp-4">
                      {member.shortBio.replace(/\]+\]/g, "")}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        to={`/about/our-team/${member.id}`}
                        className="inline-flex items-center text-sm font-bold text-white group-hover:text-yellow-500 transition-colors"
                      >
                        View Full Profile{" "}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
