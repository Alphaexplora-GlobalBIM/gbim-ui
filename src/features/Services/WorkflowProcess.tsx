import { FileText, Globe, Cpu, CheckCircle } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const process = [
    { title: 'Input & Scope', icon: FileText, desc: 'We review architectural drawings and define project parameters.' },
    { title: '3D Modeling', icon: Globe, desc: 'Creating precise digital twins using Tekla and AutoCAD.' },
    { title: 'Clash Detection', icon: Cpu, desc: 'Automated checks to resolve conflicts before fabrication.' },
    { title: 'Final Delivery', icon: CheckCircle, desc: 'Issuing shop drawings, erection plans, and CNC data.' },
];

export default function WorkflowProcess() {
    return (
        <section className="py-32 bg-slate-900/50 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-yellow-500 font-mono text-xs tracking-widest uppercase">Systematic Engineering</span>
                        <h2 className="text-4xl font-bold text-white mt-2">Our Workflow</h2>
                    </div>
                </Reveal>
                <div className="relative">
                    <div className="grid md:grid-cols-4 gap-12 text-center">
                        {process.map((step, index) => (
                            <Reveal key={index} delay={`delay-${index * 100}`}>
                                <div className="relative pt-4 md:pt-0 group">
                                    <div className={`step-${index} relative z-20 mx-auto w-24 h-24 bg-slate-800 border-4 border-slate-700 rounded-full flex items-center justify-center mb-6 transition-all duration-300 shadow-xl`}>
                                        <step.icon className="w-10 h-10" />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-30 ring-4 ring-slate-900">{index + 1}</div>
                                    </div>
                                    {index !== process.length - 1 && (
                                        <>
                                            <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-slate-800 -z-10"></div>
                                            <div className={`line-${index} hidden md:block absolute top-12 left-1/2 h-1 bg-yellow-600 -z-10 shadow-[0_0_10px_rgba(234,179,8,0.5)]`}></div>
                                        </>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
        @keyframes step1-accumulate { 0% { border-color: #EAB308; transform: scale(1.15); box-shadow: 0 0 20px rgba(234,179,8,0.4); color: #EAB308; } 90% { border-color: #EAB308; transform: scale(1.15); color: #EAB308; } 95% { border-color: #334155; transform: scale(1); color: #64748b; } 100% { border-color: #334155; transform: scale(1); color: #64748b; } }
        @keyframes step2-accumulate { 0%, 24% { border-color: #334155; transform: scale(1); color: #64748b; } 25% { border-color: #EAB308; transform: scale(1.15); color: #EAB308; } 90% { border-color: #EAB308; color: #EAB308; } 95% { border-color: #334155; transform: scale(1); color: #64748b; } 100% { border-color: #334155; transform: scale(1); color: #64748b; } }
        @keyframes step3-accumulate { 0%, 49% { border-color: #334155; transform: scale(1); color: #64748b; } 50% { border-color: #EAB308; transform: scale(1.15); color: #EAB308; } 90% { border-color: #EAB308; color: #EAB308; } 95% { border-color: #334155; transform: scale(1); color: #64748b; } 100% { border-color: #334155; transform: scale(1); color: #64748b; } }
        @keyframes step4-accumulate { 0%, 74% { border-color: #334155; transform: scale(1); color: #64748b; } 75% { border-color: #EAB308; transform: scale(1.15); color: #EAB308; } 90% { border-color: #EAB308; color: #EAB308; } 95% { border-color: #334155; transform: scale(1); color: #64748b; } 100% { border-color: #334155; transform: scale(1); color: #64748b; } }
        @keyframes line1-accumulate { 0%, 6% { width: 0%; } 25% { width: 100%; } 90% { width: 100%; } 96% { width: 0%; } 100% { width: 0%; } }
        @keyframes line2-accumulate { 0%, 31% { width: 0%; } 50% { width: 100%; } 90% { width: 100%; } 96% { width: 0%; } 100% { width: 0%; } }
        @keyframes line3-accumulate { 0%, 56% { width: 0%; } 75% { width: 100%; } 90% { width: 100%; } 96% { width: 0%; } 100% { width: 0%; } }
        .step-0 { animation: step1-accumulate 8s linear infinite; } .step-1 { animation: step2-accumulate 8s linear infinite; } .step-2 { animation: step3-accumulate 8s linear infinite; } .step-3 { animation: step4-accumulate 8s linear infinite; }
        .line-0 { animation: line1-accumulate 8s linear infinite; } .line-1 { animation: line2-accumulate 8s linear infinite; } .line-2 { animation: line3-accumulate 8s linear infinite; }
      `}</style>
        </section>
    );
}
