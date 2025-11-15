'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/Card';
import Button from '@/components/Button';

type Mode = 'break-mirror' | 'burn-letter' | 'punch-snake' | 'scream-box';

export default function RageMeterPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [cracks, setCracks] = useState<Array<{ x: number; y: number }>>([]);
  const [letter, setLetter] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [snakeHits, setSnakeHits] = useState(0);
  const [screamText, setScreamText] = useState('');
  const [shakeIntensity, setShakeIntensity] = useState(0);

  const handleMirrorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCracks([...cracks, { x, y }]);

    if (cracks.length > 10) {
      setTimeout(() => {
        setCracks([]);
      }, 2000);
    }
  };

  const handleBurnLetter = () => {
    if (!letter.trim()) return;
    setIsBurning(true);

    setTimeout(() => {
      setLetter('');
      setIsBurning(false);
    }, 2000);
  };

  const handlePunchSnake = () => {
    setSnakeHits((prev) => prev + 1);
  };

  const handleScreamInput = (text: string) => {
    setScreamText(text);
    const capsCount = (text.match(/[A-Z]/g) || []).length;
    const intensity = Math.min(10, Math.floor((capsCount / text.length) * 10));
    setShakeIntensity(intensity);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Rage Meter
          </h1>
          <p className="text-xl text-venom mb-2">Interactive catharsis tools</p>
          <p className="text-gray-400 text-sm">
            Let out your rage in a safe, virtual space
          </p>
        </motion.div>

        {/* Mode Selection */}
        {!mode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                id: 'break-mirror' as Mode,
                title: 'Break the Mirror',
                emoji: '🪞',
                description: 'Click to shatter your reflection',
              },
              {
                id: 'burn-letter' as Mode,
                title: 'Burn the Letter',
                emoji: '🔥',
                description: 'Write it down, watch it burn',
              },
              {
                id: 'punch-snake' as Mode,
                title: 'Punch the Snake',
                emoji: '🐍',
                description: 'Virtual snake, real catharsis',
              },
              {
                id: 'scream-box' as Mode,
                title: 'Scream Box',
                emoji: '📢',
                description: 'Type in ALL CAPS and watch it shake',
              },
            ].map((item) => (
              <Card key={item.id} hover onClick={() => setMode(item.id)} className="text-center">
                <div className="text-6xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold text-venom mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Break the Mirror */}
        {mode === 'break-mirror' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-creepy text-blood mb-4">Break the Mirror</h2>
              <p className="text-gray-400 mb-6">Click anywhere on the mirror to crack it</p>
            </div>

            <div
              onClick={handleMirrorClick}
              className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-4 border-blood/50 cursor-crosshair overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 50px rgba(255,255,255,0.1)',
              }}
            >
              {cracks.map((crack, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute"
                  style={{
                    left: `${crack.x}%`,
                    top: `${crack.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + Math.random() * 40 - 20}
                      y2={0}
                      stroke="#DC143C"
                      strokeWidth="2"
                    />
                    <line
                      x1="50"
                      y1="50"
                      x2={100}
                      y2={50 + Math.random() * 40 - 20}
                      stroke="#DC143C"
                      strokeWidth="2"
                    />
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + Math.random() * 40 - 20}
                      y2={100}
                      stroke="#DC143C"
                      strokeWidth="2"
                    />
                    <line
                      x1="50"
                      y1="50"
                      x2={0}
                      y2={50 + Math.random() * 40 - 20}
                      stroke="#DC143C"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.div>
              ))}

              {cracks.length > 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black flex items-center justify-center text-4xl font-creepy text-blood"
                >
                  SHATTERED
                </motion.div>
              )}
            </div>

            <div className="text-center">
              <p className="text-venom mb-4">Cracks: {cracks.length}</p>
              <Button variant="ghost" onClick={() => setMode(null)}>
                ← Back to Tools
              </Button>
            </div>
          </motion.div>
        )}

        {/* Burn the Letter */}
        {mode === 'burn-letter' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-creepy text-blood mb-4">Burn the Letter</h2>
              <p className="text-gray-400 mb-6">
                Write what you need to say, then watch it burn away
              </p>
            </div>

            <Card>
              <textarea
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                placeholder="Dear [Snake],&#10;&#10;You were the worst thing that ever happened to me...&#10;&#10;Never contact me again."
                className={`w-full h-64 bg-transparent border-2 border-venom/30 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-venom resize-none font-serif ${
                  isBurning ? 'animate-burn' : ''
                }`}
                disabled={isBurning}
              />

              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500 text-sm">{letter.length} characters</span>
                <Button
                  variant="primary"
                  onClick={handleBurnLetter}
                  disabled={!letter.trim() || isBurning}
                >
                  {isBurning ? '🔥 Burning...' : 'Burn It 🔥'}
                </Button>
              </div>
            </Card>

            <div className="text-center">
              <Button variant="ghost" onClick={() => setMode(null)}>
                ← Back to Tools
              </Button>
            </div>
          </motion.div>
        )}

        {/* Punch the Snake */}
        {mode === 'punch-snake' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-creepy text-blood mb-4">Punch the Snake</h2>
              <p className="text-gray-400 mb-6">Click the snake as many times as you need</p>
            </div>

            <div className="text-center">
              <motion.button
                whileTap={{ scale: 0.8, rotate: 15 }}
                onClick={handlePunchSnake}
                className="text-9xl hover:scale-110 transition-transform cursor-pointer"
              >
                🐍
              </motion.button>
              <p className="text-venom text-2xl mt-6">Hits: {snakeHits}</p>
            </div>

            <div className="text-center">
              <Button variant="secondary" onClick={() => setSnakeHits(0)} className="mr-4">
                Reset Counter
              </Button>
              <Button variant="ghost" onClick={() => setMode(null)}>
                ← Back to Tools
              </Button>
            </div>
          </motion.div>
        )}

        {/* Scream Box */}
        {mode === 'scream-box' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-creepy text-blood mb-4">Scream Box</h2>
              <p className="text-gray-400 mb-6">
                Type in ALL CAPS. The angrier you type, the more it shakes.
              </p>
            </div>

            <Card
              className={shakeIntensity > 5 ? 'animate-shake' : ''}
              style={{
                borderColor: `rgba(220, 20, 60, ${shakeIntensity / 10})`,
              }}
            >
              <textarea
                value={screamText}
                onChange={(e) => handleScreamInput(e.target.value)}
                placeholder="TYPE YOUR RAGE IN ALL CAPS..."
                className="w-full h-64 bg-transparent border-2 border-venom/30 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-venom resize-none text-2xl font-bold uppercase"
                style={{
                  textShadow:
                    shakeIntensity > 7 ? '0 0 10px rgba(220, 20, 60, 0.8)' : 'none',
                }}
              />

              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  Rage Intensity: {shakeIntensity}/10
                </span>
                <Button variant="primary" onClick={() => setScreamText('')}>
                  Clear
                </Button>
              </div>
            </Card>

            <div className="text-center">
              <Button variant="ghost" onClick={() => setMode(null)}>
                ← Back to Tools
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
