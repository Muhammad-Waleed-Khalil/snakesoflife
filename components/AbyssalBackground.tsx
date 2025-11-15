'use client';

import { useEffect, useRef } from 'react';
import { BloodFogCanvas, SnakeCanvas, PentagramCanvas } from '@/lib/canvasEffects';

export default function AbyssalBackground() {
  const bloodFogRef = useRef<HTMLCanvasElement>(null);
  const snakesRef = useRef<HTMLCanvasElement>(null);
  const pentagramsRef = useRef<HTMLCanvasElement>(null);

  const bloodFogInstance = useRef<BloodFogCanvas | null>(null);
  const snakesInstance = useRef<SnakeCanvas | null>(null);
  const pentagramsInstance = useRef<PentagramCanvas | null>(null);

  useEffect(() => {
    if (!bloodFogRef.current || !snakesRef.current || !pentagramsRef.current) return;

    // Initialize canvases
    bloodFogInstance.current = new BloodFogCanvas(bloodFogRef.current);
    snakesInstance.current = new SnakeCanvas(snakesRef.current);
    pentagramsInstance.current = new PentagramCanvas(pentagramsRef.current);

    bloodFogInstance.current.start();
    snakesInstance.current.start();
    pentagramsInstance.current.start();

    // Track user activity for pentagrams
    const handleActivity = () => {
      if (pentagramsInstance.current) {
        pentagramsInstance.current.updateActivity();
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Handle window resize
    const handleResize = () => {
      if (bloodFogRef.current && snakesRef.current && pentagramsRef.current) {
        [bloodFogRef, snakesRef, pentagramsRef].forEach(ref => {
          if (ref.current) {
            ref.current.width = window.innerWidth;
            ref.current.height = window.innerHeight;
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      bloodFogInstance.current?.stop();
      snakesInstance.current?.stop();
      pentagramsInstance.current?.stop();
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={bloodFogRef}
        className="absolute inset-0 opacity-100"
        style={{ mixBlendMode: 'screen' }}
      />
      <canvas
        ref={snakesRef}
        className="absolute inset-0 opacity-80"
      />
      <canvas
        ref={pentagramsRef}
        className="absolute inset-0 opacity-100"
      />
    </div>
  );
}
