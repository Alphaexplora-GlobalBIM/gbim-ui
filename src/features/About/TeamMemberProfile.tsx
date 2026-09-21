// src/features/About/TeamMemberProfile.tsx

import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import Footer from "../../components/Footer";
import { teamData } from "../About/TeamData";

export default function TeamMemberProfile() {
  const { id } = useParams();
  const member = teamData.find((m) => m.id === id);

  if (!member) {
    return <Navigate to="/about/our-team" replace />;
  }

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
      </div>

      <section className="relative pt-32 pb-20 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Link
            to="/about/our-team"
            className="inline-flex items-center text-slate-400 hover:text-yellow-500 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
          </Link>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 space-y-8">
              <Reveal>
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                </div>
              </Reveal>

              <Reveal delay="delay-100">
                <div className="bg-slate-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">
                  <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4">
                    Career Highlights
                  </h4>
                  <ul className="space-y-4">
                    {member.stats.map((stat, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-slate-400 text-sm">
                          {stat.label}
                        </span>
                        <span className="text-white font-bold">
                          {stat.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay="delay-200">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {member.name}
                </h1>
                <p className="text-xl text-yellow-500 font-medium mb-8">
                  {member.role}
                </p>

                <div className="w-16 h-1 bg-yellow-500 rounded mb-8"></div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Professional Background
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  {member.fullBio.replace(/\]+\]/g, "")}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">
                      Core Expertise
                    </h3>
                    <ul className="space-y-4">
                      {member.expertise.map((exp, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm leading-relaxed">
                            {exp.replace(/\]+\]/g, "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">
                      Software & Projects
                    </h3>
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3">
                        Software Proficiency
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.software.map((sw, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-slate-300 text-xs font-medium"
                          >
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3">
                        Notable Projects
                      </h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-300 text-sm">
                        {member.projects.map((proj, i) => (
                          <li key={i}>{proj.replace(/\]+\]/g, "")}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
