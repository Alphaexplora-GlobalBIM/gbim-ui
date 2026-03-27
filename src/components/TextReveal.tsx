import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  variant?: "slide" | "blur";
  delay?: number;
}

export const TextReveal = ({
  text,
  className = "",
  as: Component = "h1",
  variant = "slide",
  delay = 0,
}: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Inject styles for the Shimmer animation
  const shimmerStyles = (
    <style>
      {`
        @keyframes shimmerEffect {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}
    </style>
  );

  // --- VARIANT 1: STRUCTURAL SLIDE + SHIMMER (For Big Headers) ---
  if (variant === "slide") {
    return (
      <>
        {shimmerStyles}
        <Component
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={elementRef as any}
          className={`relative overflow-hidden inline-block ${className}`} // inline-block needed for shimmer bounds
        >
          {/* 1. The Slide Up Animation */}
          <span
            className={`block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0" : "translate-y-[110%]"
              }`}
          >
            {text}
          </span>

          {/* 2. The Shimmer Overlay (Runs once after slide-up) */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              transform: 'translateX(-150%)',
              animation: isVisible ? `shimmerEffect 1.5s ease-in-out forwards` : 'none',
              animationDelay: '1000ms', // Wait 1s for slide to finish
              mixBlendMode: 'overlay', // Blends nicely with text color
              opacity: 0.8
            }}
          />
        </Component>
      </>
    );
  }

  // --- VARIANT 2: CLEAN CINEMATIC BLUR (For Paragraphs) ---
  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={elementRef as any}
      className={`transition-all duration-1000 ease-out ${className} ${isVisible ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-95"
        }`}
    >
      {text}
    </Component>
  );
};