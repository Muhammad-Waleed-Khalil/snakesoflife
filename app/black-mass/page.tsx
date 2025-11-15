'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { cultRankManager } from '@/lib/cultRank';
import { audioEngine } from '@/lib/audioEngine';
import TextGlitch from '@/components/TextGlitch';

export default function BlackMassPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'waiting' | 'ritual' | 'complete'>('idle');
  const [lineIndex, setLineIndex] = useState(0);
  const [pentagramProgress, setPentagramProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinBlackMass = () => {
    const newRoomId = `blackmass_${Date.now()}`;
    setRoomId(newRoomId);
    setStatus('waiting');
    socket?.emit('blackmass:join', { roomId: newRoomId });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('blackmass:participant_joined', ({ count }: { count: number }) => {
      setParticipantCount(count);
    });

    socket.on('blackmass:ritual_start', () => {
      setStatus('ritual');
      audioEngine.enable();
      audioEngine.playBloodMoonSound();
      cultRankManager.addAction(20);
    });

    socket.on('blackmass:line_drawn', (line: { x1: number; y1: number; x2: number; y2: number }) => {
      drawLine(line);
      setPentagramProgress(prev => prev + 20);
    });

    socket.on('blackmass:ritual_complete', async () => {
      setStatus('complete');
      await cultRankManager.incrementStat('ritualsCompleted');
      audioEngine.playBloodMoonSound();
    });

    socket.on('global:soul_claimed', () => {
      showGlobalNotification();
    });

    return () => {
      socket.off('blackmass:participant_joined');
      socket.off('blackmass:ritual_start');
      socket.off('blackmass:line_drawn');
      socket.off('blackmass:ritual_complete');
      socket.off('global:soul_claimed');
    };
  }, [socket]);

  const drawLine = (line: { x1: number; y1: number; x2: number; y2: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#dc143c';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();

    setLineIndex(prev => prev + 1);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (status !== 'ritual' || lineIndex >= 5) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const points = calculatePentagramPoints(canvas.width / 2, canvas.height / 2, 150);

    if (lineIndex < points.length - 1) {
      const line = {
        x1: points[lineIndex].x,
        y1: points[lineIndex].y,
        x2: points[lineIndex + 1].x,
        y2: points[lineIndex + 1].y,
      };

      socket?.emit('blackmass:draw_line', { roomId, line });
    }
  };

  const calculatePentagramPoints = (cx: number, cy: number, r: number) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI / 5) - Math.PI / 2;
      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      });
    }
    points.push(points[0]); // Close the pentagram
    return points;
  };

  const showGlobalNotification = () => {
    // Trigger a site-wide visual effect
    document.body.style.animation = 'blood-moon-pulse 2s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>SYNCHRONIZED BLACK MASS</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">13 SOULS. 1 PENTAGRAM. ETERNAL BINDING.</p>
        </div>

        {status === 'idle' && (
          <div className="void-morphism p-12 text-center">
            <h2 className="text-3xl text-red-500 mb-6 font-bold">JOIN THE RITUAL</h2>
            <p className="text-red-400/70 mb-8">
              Exactly 13 participants required. Draw the inverted pentagram together.
              When complete, a soul is claimed across the entire site.
            </p>
            <button
              onClick={joinBlackMass}
              className="bg-red-900/50 hover:bg-red-900 text-red-300 px-12 py-6 text-xl border-2 border-red-500 font-bold transition-all"
            >
              ENTER THE CIRCLE
            </button>
          </div>
        )}

        {status === 'waiting' && (
          <div className="void-morphism p-12 text-center">
            <h2 className="text-3xl text-red-500 mb-6 font-bold animate-pulse">
              GATHERING SOULS...
            </h2>
            <div className="text-6xl text-red-500 font-bold mb-4">
              {participantCount} / 13
            </div>
            <p className="text-red-400/70">
              Waiting for {13 - participantCount} more participant(s)
            </p>
            <div className="mt-8">
              <div className="h-4 bg-black border border-red-900/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-900 to-red-600 transition-all duration-500"
                  style={{ width: `${(participantCount / 13) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {status === 'ritual' && (
          <div className="void-morphism p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl text-red-500 mb-2 font-bold animate-pulse">
                THE RITUAL HAS BEGUN
              </h2>
              <p className="text-red-400/70">
                Click to draw your line. Complete the pentagram.
              </p>
              <div className="mt-4 text-2xl text-red-500">
                Progress: {pentagramProgress}%
              </div>
            </div>

            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              width={600}
              height={600}
              className="w-full border-2 border-red-900/50 bg-black cursor-crosshair"
            />

            <div className="mt-6 text-center text-red-400/70 text-sm">
              Each participant draws one line. When the pentagram is complete, all receive +666 Soul Points.
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="void-morphism p-12 text-center">
            <h2 className="text-6xl text-red-500 mb-6 font-bold animate-pulse crimson-glow">
              <TextGlitch>A SOUL WAS CLAIMED</TextGlitch>
            </h2>
            <p className="text-3xl text-red-400 mb-8">+666 Soul Points</p>
            <p className="text-red-400/70 mb-8">
              The entire site has felt the ritual. All participants are blessed.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setPentagramProgress(0);
                setLineIndex(0);
              }}
              className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all"
            >
              PERFORM ANOTHER RITUAL
            </button>
          </div>
        )}

        <div className="mt-12 void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">THE RITUAL</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Exactly 13 participants required to begin</li>
            <li>• Each participant draws one line of the inverted pentagram</li>
            <li>• Lines are synchronized across all participants in real-time</li>
            <li>• When complete, all participants receive +666 Soul Points</li>
            <li>• A global notification is sent to everyone on the site</li>
            <li>• Latin chants play during the ritual</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
