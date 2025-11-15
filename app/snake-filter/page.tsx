'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Button from '@/components/Button';

type Filter = 'snake-eyes' | 'venom-drip' | 'broken-heart' | 'toxic-smoke' | 'none';

export default function SnakeFilterPage() {
  const [isActive, setIsActive] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>('none');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied. Please allow camera access to use this feature.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsActive(false);
    setCurrentFilter('none');
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const renderFilter = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    if (currentFilter === 'snake-eyes') {
      // Draw snake eyes overlay
      ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.35, canvas.height * 0.35, 30, 40, 0, 0, Math.PI * 2);
      ctx.ellipse(canvas.width * 0.65, canvas.height * 0.35, 30, 40, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.35, canvas.height * 0.35, 8, 20, 0, 0, Math.PI * 2);
      ctx.ellipse(canvas.width * 0.65, canvas.height * 0.35, 8, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    if (currentFilter === 'venom-drip') {
      ctx.fillStyle = 'rgba(0, 255, 65, 0.6)';
      for (let i = 0; i < 10; i++) {
        const x = (canvas.width / 10) * i + Math.random() * 20;
        const y = Math.random() * canvas.height * 0.3;
        ctx.fillRect(x, y, 3, 20 + Math.random() * 30);
      }
    }

    if (currentFilter === 'broken-heart') {
      ctx.strokeStyle = 'rgba(220, 20, 60, 0.8)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.random() * 100 - 50, y + Math.random() * 100 - 50);
        ctx.stroke();
      }
    }

    if (currentFilter === 'toxic-smoke') {
      ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height - Math.random() * 200;
        const radius = 20 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    if (isActive && currentFilter !== 'none') {
      const interval = setInterval(renderFilter, 100);
      return () => clearInterval(interval);
    }
  }, [isActive, currentFilter]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Snake Filter
          </h1>
          <p className="text-xl text-venom mb-2">Transform into your inner serpent</p>
          <p className="text-gray-400 text-sm">
            Camera-based filters. Nothing is saved or transmitted.
          </p>
        </motion.div>

        {/* Camera Feed */}
        <Card className="mb-8">
          {!isActive ? (
            <div className="text-center py-20">
              <p className="text-gray-300 mb-6">
                Activate your camera to see the snake filters in action
              </p>
              <Button variant="primary" size="lg" onClick={startCamera}>
                Start Camera 📸
              </Button>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full rounded-lg ${currentFilter === 'none' ? 'block' : 'hidden'}`}
              />
              <canvas
                ref={canvasRef}
                className={`w-full rounded-lg ${currentFilter !== 'none' ? 'block' : 'hidden'}`}
              />

              <div className="absolute top-4 right-4">
                <Button variant="danger" size="sm" onClick={stopCamera}>
                  Stop Camera
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Filter Buttons */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              { id: 'none' as Filter, name: 'No Filter', emoji: '❌' },
              { id: 'snake-eyes' as Filter, name: 'Snake Eyes', emoji: '👁️' },
              { id: 'venom-drip' as Filter, name: 'Venom Drip', emoji: '💧' },
              { id: 'broken-heart' as Filter, name: 'Broken Heart', emoji: '💔' },
              { id: 'toxic-smoke' as Filter, name: 'Toxic Smoke', emoji: '☠️' },
            ].map((filter) => (
              <Button
                key={filter.id}
                variant={currentFilter === filter.id ? 'primary' : 'ghost'}
                onClick={() => setCurrentFilter(filter.id)}
                className="flex-col h-auto py-4"
              >
                <div className="text-3xl mb-2">{filter.emoji}</div>
                <div className="text-xs">{filter.name}</div>
              </Button>
            ))}
          </motion.div>
        )}

        {/* Info */}
        <div className="mt-12 text-center text-gray-600 text-sm space-y-2">
          <p>🔒 Nothing is recorded, saved, or transmitted</p>
          <p>All filtering happens locally in your browser</p>
        </div>
      </div>
    </div>
  );
}
