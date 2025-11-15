'use client';

import { useEffect, useRef } from 'react';

export default function BleedingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const bloodDrops = useRef<BloodDrop[]>([]);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Add blood drop
      if (Math.random() > 0.7) {
        bloodDrops.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          opacity: 1,
          vy: 0,
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blood drops
      bloodDrops.current = bloodDrops.current.filter(drop => {
        drop.y += drop.vy;
        drop.vy += 0.1; // Gravity
        drop.opacity -= 0.01;

        if (drop.opacity > 0) {
          ctx.fillStyle = `rgba(139, 0, 0, ${drop.opacity})`;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Inverted cross cursor */}
        <svg width="20" height="20" viewBox="0 0 20 20" className="filter drop-shadow-[0_0_3px_rgba(255,0,0,0.8)]">
          <line x1="10" y1="0" x2="10" y2="20" stroke="#ff0000" strokeWidth="2" />
          <line x1="0" y1="13" x2="20" y2="13" stroke="#ff0000" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
}

interface BloodDrop {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vy: number;
}
