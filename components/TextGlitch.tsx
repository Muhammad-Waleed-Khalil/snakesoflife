'use client';

import { useEffect, useState, ReactNode } from 'react';

interface TextGlitchProps {
  children: ReactNode;
  className?: string;
}

export default function TextGlitch({ children, className = '' }: TextGlitchProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 100 + Math.random() * 200);
      }
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span
      className={`${className} ${glitching ? 'glitch-active' : ''}`}
      style={{
        textShadow: glitching
          ? `
            1px 0 0 rgba(255, 0, 0, 0.7),
            -1px 0 0 rgba(0, 255, 255, 0.7),
            0 1px 0 rgba(255, 0, 0, 0.5),
            0 -1px 0 rgba(0, 255, 255, 0.5)
          `
          : '0 0 1px rgba(255, 0, 0, 0.5)',
        animation: glitching ? 'glitch-anim 0.3s infinite' : 'none',
      }}
    >
      {children}
    </span>
  );
}
