'use client';

import { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { cultRankManager } from '@/lib/cultRank';
import TextGlitch from '@/components/TextGlitch';

export default function HexGeneratorPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [targetName, setTargetName] = useState('');
  const [intention, setIntention] = useState('');
  const [hex, setHex] = useState<{ text: string; sigil: string } | null>(null);
  const [receivedHex, setReceivedHex] = useState<{ text: string; sigil: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    setSocket(socketInstance);

    socketInstance.on('hex:received', (hexData: { text: string; sigil: string }) => {
      setReceivedHex(hexData);
      setTimeout(() => setReceivedHex(null), 6000);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const generateHex = () => {
    if (!targetName || !intention) {
      alert('Enter target and intention');
      return;
    }

    // Generate Latin-style hex
    const hexText = generateLatinHex(targetName, intention);
    const sigil = generateSigil(intention);

    setHex({ text: hexText, sigil });

    // Draw sigil on canvas
    drawSigil(sigil);

    cultRankManager.addAction(5);
  };

  const generateLatinHex = (target: string, intent: string): string => {
    const templates = [
      `MALEDICTIO SUPER ${target.toUpperCase()}`,
      `PER TENEBRAS ET SERPENTES, ${target.toUpperCase()} DAMNATUR`,
      `IN NOMINE SERPENTIS, ${target.toUpperCase()} MALEDICATUR`,
      `MALUM FATUM TIBI, ${target.toUpperCase()}`,
      `TENEBRAE CONSUMENT ${target.toUpperCase()}`,
    ];

    const hexTemplate = templates[Math.floor(Math.random() * templates.length)];
    const intentPhrase = intent.split('').reverse().join('').toUpperCase();

    return `${hexTemplate}\n\n${intentPhrase}\n\nSIC FIAT`;
  };

  const generateSigil = (text: string): string => {
    // Remove vowels and duplicate consonants for chaos magick sigil
    const cleaned = text
      .toUpperCase()
      .replace(/[AEIOU\s]/g, '')
      .split('')
      .filter((char, index, arr) => arr.indexOf(char) === index)
      .join('');

    return cleaned;
  };

  const drawSigil = (sigil: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.strokeStyle = '#dc143c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();

    // Draw random lines based on sigil
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;

    const points = [];
    for (let i = 0; i < sigil.length; i++) {
      const angle = (i / sigil.length) * Math.PI * 2;
      const x = canvas.width / 2 + Math.cos(angle) * 80;
      const y = canvas.height / 2 + Math.sin(angle) * 80;
      points.push({ x, y });
    }

    ctx.beginPath();
    if (points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineTo(points[0].x, points[0].y);
    }
    ctx.stroke();

    // Add symbols
    ctx.font = 'bold 24px Creepster';
    ctx.fillStyle = '#dc143c';
    ctx.textAlign = 'center';
    ctx.fillText(sigil, canvas.width / 2, canvas.height / 2);
  };

  const castHex = async () => {
    if (!hex) return;

    socket?.emit('hex:cast', {
      hex,
      targetCount: 5,
    });

    await cultRankManager.incrementStat('hexesCast');

    alert('Hex cast upon 5 random souls!');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>HEX GENERATOR</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">CURSE THEM WITH ANCIENT POWER</p>
        </div>

        <div className="void-morphism p-8 mb-8">
          <h2 className="text-2xl text-red-500 mb-6 font-bold">CRAFT YOUR HEX</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-red-400/80 mb-2">Target (name or situation)</label>
              <input
                type="text"
                value={targetName}
                onChange={e => setTargetName(e.target.value)}
                placeholder="The one who wronged you..."
                className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
              />
            </div>

            <div>
              <label className="block text-red-400/80 mb-2">Intention</label>
              <textarea
                value={intention}
                onChange={e => setIntention(e.target.value)}
                placeholder="Your dark intention..."
                rows={3}
                className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
              />
            </div>
          </div>

          <button
            onClick={generateHex}
            className="w-full bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all"
          >
            GENERATE HEX
          </button>
        </div>

        {hex && (
          <div className="void-morphism p-8 mb-8">
            <h2 className="text-2xl text-red-500 mb-6 font-bold">YOUR HEX</h2>

            <div className="bg-black/80 border-2 border-red-900/50 p-6 mb-6">
              <pre className="text-red-400 font-mono text-center whitespace-pre-wrap">
                {hex.text}
              </pre>
            </div>

            <div className="flex justify-center mb-6">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="border-2 border-red-900/50 bg-black"
              />
            </div>

            <button
              onClick={castHex}
              className="w-full bg-red-900 hover:bg-red-800 text-red-100 px-8 py-4 border-2 border-red-500 font-bold transition-all animate-pulse"
            >
              CAST HEX (appears on 5 random screens for 6 seconds)
            </button>
          </div>
        )}

        <div className="void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">HOW IT WORKS</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Enter a name or situation you wish to curse</li>
            <li>• Write your dark intention</li>
            <li>• A Latin hex and chaos magick sigil are generated</li>
            <li>• Cast the hex to broadcast it to 5 random users for 6 seconds</li>
            <li>• All hexes are ephemeral—they vanish after casting</li>
            <li>• Earn Soul Points for every hex generated</li>
          </ul>
        </div>
      </div>

      {/* Received Hex Overlay */}
      {receivedHex && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 pointer-events-none animate-pulse">
          <div className="border-4 border-red-500 bg-black p-12 max-w-2xl">
            <div className="text-4xl text-red-500 font-bold mb-6 text-center crimson-glow">
              <TextGlitch>YOU HAVE BEEN HEXED</TextGlitch>
            </div>
            <pre className="text-red-400 font-mono text-center whitespace-pre-wrap text-xl">
              {receivedHex.text}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
