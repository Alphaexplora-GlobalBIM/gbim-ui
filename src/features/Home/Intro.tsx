import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroProps {
    onComplete: () => void;
}

const Intro = ({ onComplete }: IntroProps) => {
    const comp = useRef<HTMLDivElement>(null);
    const titleText = 'GLOBALBIM';

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap
                .timeline()
                .to(comp.current, {
                    backgroundColor: '#111827', // bg-gray-900/charcoal
                    duration: 1,
                    ease: 'power2.inOut',
                })
                .from('.char', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                })
                .from(
                    '.subtitle',
                    {
                        opacity: 0,
                        y: 20,
                        duration: 1,
                        ease: 'power2.out',
                    },
                    '-=0.2'
                )
                .to(comp.current, {
                    y: '-100vh',
                    duration: 1.2,
                    ease: 'power4.inOut',
                    delay: 0.5,
                    onComplete,
                });
        }, comp);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={comp}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
        >
            {/* Container for alignment */}
            <div className="flex flex-col items-center">

                {/* TITLE: Scaled up versions of text-2xl -> text-4xl/7xl/9xl for Intro impact */}
                <h1 className="flex overflow-hidden font-bold uppercase tracking-widest leading-none text-4xl md:text-7xl lg:text-9xl">
                    {titleText.split('').map((char, i) => {
                        // Logic: First 6 chars ("GLOBAL") are Yellow, rest (" BIM") are White
                        const isGlobal = i < 6;
                        return (
                            <span
                                key={i}
                                className={`char inline-block ${isGlobal ? 'text-yellow-500' : 'text-white'
                                    }`}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        );
                    })}
                </h1>

                {/* SUBTITLE: Matches your gray-400 silver style */}
                <span className="subtitle mt-4 text-gray-400 uppercase tracking-widest opacity-80 text-sm md:text-xl lg:text-2xl">
                    Engineering Services
                </span>

            </div>
        </div>
    );
};

export default Intro;
