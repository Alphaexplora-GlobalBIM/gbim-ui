//src/components/Reveal.tsx

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: string; // e.g., "delay-100"
}

export const Reveal = ({ children, width = '100%', delay = '' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Stop observing once visible so it doesn't re-animate
        if (currentRef) observer.unobserve(currentRef);
      }
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={{ width }} className={`${isVisible ? `animate-slide-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
};