import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import Footer from "../../components/Footer";
import { teamData } from "../../assets/data/teamData";

export default function MeetOurTeam() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const selectedMember = teamData.find((m) => m.id === selectedMemberId);

  React.useEffect(() => {
    if (selectedMemberId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMemberId]);

  return (
    // Changed to justify-center to vertically center the entire block within the screen
    <div className="bg-slate-900 min-h-screen text-white font-sans relative overflow-hidden flex flex-col justify-between pt-24">
      {/* Background Grid Accent */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Main Content Wrapper - Centers vertically */}
      <section className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 my-auto">
        {/* Changed to items-center to balance the two columns vertically */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Scaled down text to prevent clipping */}
          <div className="lg:w-2/5 shrink-0 w-full">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-yellow-500"></div>
                <span className="text-yellow-500 font-mono text-xs tracking-widest uppercase">
                  The Minds Behind The Models
                </span>
              </div>
            </Reveal>

            <TextReveal
              text="LEADERSHIP TEAM"
              variant="slide"
              as="h1"
              // Reduced from 8xl down to 6xl/7xl to fit the column width securely
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6"
            />

            <TextReveal
              text="Our strength lies not just in our software, but in the decades of collective engineering experience our team brings to every structural challenge."
              variant="blur"
              as="p"
              className="text-base text-slate-400 leading-relaxed max-w-sm"
              delay={200}
            />
          </div>

          {/* RIGHT COLUMN: Compressed Typographic List */}
          <div className="lg:w-3/5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 xl:gap-x-12 gap-y-0">
              {teamData.map((member, index) => {
                const paddedIndex = String(index + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedMemberId(member.id)}
                    // Tightened vertical padding (py-5 down from py-10)
                    className="group cursor-pointer border-b border-white/10 py-4 xl:py-5 flex gap-4 items-center relative overflow-hidden"
                  >
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-yellow-500 group-hover:w-full transition-all duration-700 ease-out z-10"></div>

                    <span className="text-[10px] xl:text-xs text-slate-600 font-mono shrink-0 group-hover:text-yellow-500 transition-colors">
                      {paddedIndex}
                    </span>

                    <div className="flex flex-col flex-1">
                      {/* Reduced header size and bottom margin */}
                      <h3 className="text-lg xl:text-xl font-black text-white uppercase tracking-tight leading-none mb-1.5 group-hover:text-yellow-400 transition-colors">
                        {member.role}
                      </h3>
                      <div className="flex items-center text-slate-400 group-hover:text-white transition-colors">
                        <span className="w-4 h-px bg-slate-600 group-hover:bg-yellow-500 mr-2 transition-colors"></span>
                        <span className="font-serif italic text-sm">
                          {member.name}
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ChevronRight className="text-yellow-500 w-4 h-4" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FULL SCREEN DATA MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedMemberId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-sm shadow-2xl shadow-black max-w-4xl w-full relative overflow-hidden my-auto"
            >
              <div className="flex justify-between items-start p-8 border-b border-white/5 bg-slate-950/50">
                <div>
                  <p className="text-yellow-500 font-mono text-xs tracking-widest uppercase mb-3">
                    Personnel Detail View
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    {selectedMember.role}
                  </h2>
                  <p className="text-xl text-slate-400 font-serif italic">
                    — {selectedMember.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMemberId(null)}
                  className="p-2 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-full transition-colors text-white shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 flex flex-col md:flex-row gap-12">
                <div className="md:w-2/3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Professional Background
                  </h4>
                  <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                    {selectedMember.fullBio.replace(/\+\]/g, "")}
                  </p>

                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Core Competencies
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {selectedMember.expertise.map((exp, i) => (
                      <li
                        key={i}
                        className="flex items-start text-slate-300 text-sm leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mr-3 mt-0.5" />
                        <span>{exp.replace(/\+\]/g, "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-1/3 flex flex-col gap-8 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
                  <div className="grid grid-cols-1 gap-4">
                    {selectedMember.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-slate-950 p-4 rounded-sm border border-white/5"
                      >
                        <p className="text-yellow-500 text-2xl font-black mb-1">
                          {stat.value}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                      Software Proficiency
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.software.map((sw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs rounded-sm"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer added back to flow normally at the bottom of the screen */}
      <div className="relative z-10 w-full mt-12">
        <Footer />
      </div>
    </div>
  );
}
