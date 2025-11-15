'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { cultRankManager } from '@/lib/cultRank';
import TextGlitch from '@/components/TextGlitch';

interface Player {
  x: number;
  y: number;
  score: number;
  id: string;
}

export default function SoulHarvestPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'dead'>('lobby');
  const [arenaId, setArenaId] = useState('');
  const [players, setPlayers] = useState<Map<string, Player>>(new Map());
  const [myId, setMyId] = useState('');
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const myPlayer = useRef({ x: 400, y: 300, vx: 0, vy: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    setSocket(socketInstance);
    setMyId(socketInstance.id || '');

    return () => {
      socketInstance.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const joinArena = () => {
    const newArenaId = `harvest_${Date.now()}`;
    setArenaId(newArenaId);

    socket?.emit('harvest:create', { arenaId: newArenaId });
    socket?.emit('harvest:join', {
      arenaId: newArenaId,
      playerData: { color: '#dc143c' },
    });

    setGameState('playing');
    cultRankManager.addAction(10);
    startGame();
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('harvest:player_joined', ({ playerId, player }: { playerId: string; player: Player }) => {
      setPlayers(prev => new Map(prev).set(playerId, player));
    });

    socket.on('harvest:player_moved', ({ playerId, x, y }: { playerId: string; x: number; y: number }) => {
      setPlayers(prev => {
        const updated = new Map(prev);
        const player = updated.get(playerId);
        if (player) {
          player.x = x;
          player.y = y;
        }
        return updated;
      });
    });

    socket.on('harvest:devoured', async ({ predatorId, victimId }: { predatorId: string; victimId: string }) => {
      if (victimId === myId) {
        setGameState('dead');
        await cultRankManager.incrementStat('soulsHarvested');
      }
      if (predatorId === myId) {
        setScore(prev => prev + 1);
      }
    });

    socket.on('harvest:you_died', () => {
      setGameState('dead');
    });

    socket.on('harvest:game_start', () => {
      setGameState('playing');
    });

    return () => {
      socket.off('harvest:player_joined');
      socket.off('harvest:player_moved');
      socket.off('harvest:devoured');
      socket.off('harvest:you_died');
      socket.off('harvest:game_start');
    };
  }, [socket, myId]);

  const startGame = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 3;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          myPlayer.current.vy = -speed;
          break;
        case 'ArrowDown':
        case 's':
          myPlayer.current.vy = speed;
          break;
        case 'ArrowLeft':
        case 'a':
          myPlayer.current.vx = -speed;
          break;
        case 'ArrowRight':
        case 'd':
          myPlayer.current.vx = speed;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'w':
        case 's':
          myPlayer.current.vy = 0;
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'a':
        case 'd':
          myPlayer.current.vx = 0;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update my position
    myPlayer.current.x += myPlayer.current.vx;
    myPlayer.current.y += myPlayer.current.vy;

    // Bounds checking
    myPlayer.current.x = Math.max(15, Math.min(canvas.width - 15, myPlayer.current.x));
    myPlayer.current.y = Math.max(15, Math.min(canvas.height - 15, myPlayer.current.y));

    // Emit position
    socket?.emit('harvest:move', {
      arenaId,
      x: myPlayer.current.x,
      y: myPlayer.current.y,
    });

    // Check collisions
    players.forEach((player, playerId) => {
      if (playerId !== myId) {
        const dx = player.x - myPlayer.current.x;
        const dy = player.y - myPlayer.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 25) {
          socket?.emit('harvest:eat', { arenaId, victimId: playerId });
        }
      }
    });

    // Clear and draw
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a0000';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw other players
    players.forEach((player, playerId) => {
      if (playerId !== myId) {
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff0000';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${player.score}`, player.x, player.y - 20);
      }
    });

    // Draw my snake
    ctx.fillStyle = '#dc143c';
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(myPlayer.current.x, myPlayer.current.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw eyes
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(myPlayer.current.x - 5, myPlayer.current.y - 3, 2, 0, Math.PI * 2);
    ctx.arc(myPlayer.current.x + 5, myPlayer.current.y - 3, 2, 0, Math.PI * 2);
    ctx.fill();

    if (gameState === 'playing') {
      animationFrame.current = requestAnimationFrame(gameLoop);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>SOUL HARVEST ARENA</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">EAT OR BE EATEN</p>
        </div>

        {gameState === 'lobby' && (
          <div className="void-morphism p-12 text-center">
            <h2 className="text-3xl text-red-500 mb-6 font-bold">ENTER THE ARENA</h2>
            <p className="text-red-400/70 mb-8">
              You are a snake. Eat other players. When you eat someone, their camera appears
              on everyone's screen for 3 seconds. Loser gets "Devoured" tag for 24h.
            </p>
            <button
              onClick={joinArena}
              className="bg-red-900/50 hover:bg-red-900 text-red-300 px-12 py-6 text-xl border-2 border-red-500 font-bold transition-all"
            >
              BEGIN HARVEST
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="void-morphism p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-red-400">
                Use <span className="text-red-500 font-bold">WASD</span> or{' '}
                <span className="text-red-500 font-bold">Arrow Keys</span> to move
              </div>
              <div className="text-2xl text-red-500 font-bold">
                Souls Harvested: {score}
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full border-2 border-red-900/50 bg-black"
            />

            <div className="mt-4 text-center text-red-400/70 text-sm">
              Collide with other snakes to devour them. Survivors earn Soul Points.
            </div>
          </div>
        )}

        {gameState === 'dead' && (
          <div className="void-morphism p-12 text-center">
            <h2 className="text-6xl text-red-500 mb-6 font-bold animate-pulse crimson-glow">
              <TextGlitch>DEVOURED</TextGlitch>
            </h2>
            <p className="text-2xl text-red-400 mb-8">
              You were consumed by a greater serpent.
            </p>
            <button
              onClick={() => {
                setGameState('lobby');
                setScore(0);
              }}
              className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        <div className="mt-12 void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">THE RULES</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Real-time multiplayer snake arena powered by Socket.IO</li>
            <li>• You are a snake. Eat other players by colliding with them</li>
            <li>• When eaten, victim's camera flashes on all screens for 3 seconds (with consent)</li>
            <li>• Loser gets "Devoured" tag for 24 hours</li>
            <li>• Winners earn Soul Points based on kills</li>
            <li>• Free-for-all mode: everyone vs everyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
