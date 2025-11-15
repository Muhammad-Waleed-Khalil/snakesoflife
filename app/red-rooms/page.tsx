'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { cultRankManager } from '@/lib/cultRank';
import TextGlitch from '@/components/TextGlitch';

export default function RedRoomsPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mode, setMode] = useState<'select' | 'broadcast' | 'watch'>('select');
  const [roomId, setRoomId] = useState('');
  const [soulPoints, setSoulPoints] = useState(0);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [effect, setEffect] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    setSocket(socketInstance);

    cultRankManager.getMember().then(member => {
      if (member) setSoulPoints(member.soulPoints);
    });

    return () => {
      socketInstance.disconnect();
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const startBroadcast = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      const newRoomId = `room_${Date.now()}`;
      setRoomId(newRoomId);
      setMode('broadcast');

      socket?.emit('redroom:create', {
        roomId: newRoomId,
        broadcasterData: { soulPoints },
      });

      await cultRankManager.addAction(10);
    } catch (error) {
      console.error('Failed to start broadcast:', error);
      alert('Failed to access camera/microphone. Check permissions.');
    }
  };

  const joinRoom = async (targetRoomId: string) => {
    if (!targetRoomId) {
      alert('Enter a room ID');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);
      setRoomId(targetRoomId);
      setMode('watch');

      socket?.emit('redroom:join', {
        roomId: targetRoomId,
        viewerData: { soulPoints },
      });

      await cultRankManager.addAction(5);
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const donateEffect = (effectType: string, cost: number) => {
    if (soulPoints >= cost) {
      socket?.emit('redroom:donate', {
        roomId,
        amount: cost,
        effect: effectType,
      });
      setSoulPoints(prev => prev - cost);
    } else {
      alert('Insufficient Soul Points');
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('redroom:effect', (effectType: string) => {
      setEffect(effectType);
      applyEffect(effectType);
      setTimeout(() => setEffect(null), 5000);
    });

    return () => {
      socket.off('redroom:effect');
    };
  }, [socket]);

  const applyEffect = (effectType: string) => {
    const video = localVideoRef.current;
    if (!video) return;

    switch (effectType) {
      case 'invert':
        video.style.filter = 'invert(1)';
        setTimeout(() => (video.style.filter = ''), 5000);
        break;
      case 'distort':
        video.style.transform = 'scale(1.5) rotate(180deg)';
        setTimeout(() => (video.style.transform = ''), 5000);
        break;
      case 'glitch':
        video.style.animation = 'glitch-anim 0.2s infinite';
        setTimeout(() => (video.style.animation = ''), 5000);
        break;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>RED ROOMS 2.0</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">THE SACRIFICED ONE AWAITS</p>
        </div>

        {mode === 'select' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="void-morphism p-8 text-center hover-lift">
              <h2 className="text-3xl text-red-500 mb-4 font-bold">BECOME THE SACRIFICE</h2>
              <p className="text-red-400/70 mb-6">
                Broadcast yourself. Let viewers donate Soul Points to torment you.
              </p>
              <button
                onClick={startBroadcast}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all"
              >
                START BROADCAST
              </button>
            </div>

            <div className="void-morphism p-8 text-center hover-lift">
              <h2 className="text-3xl text-red-500 mb-4 font-bold">WATCH & TORMENT</h2>
              <p className="text-red-400/70 mb-6">
                Enter a room ID. Donate Soul Points to trigger effects on the broadcaster.
              </p>
              <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className="w-full bg-black/80 border border-red-900/50 p-3 mb-4 text-red-400"
              />
              <button
                onClick={() => joinRoom(roomId)}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all"
              >
                JOIN ROOM
              </button>
            </div>
          </div>
        )}

        {mode === 'broadcast' && (
          <div className="void-morphism p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl text-red-500 font-bold">YOU ARE THE SACRIFICE</h2>
                <p className="text-red-400/70">Room ID: <span className="text-red-500 font-mono">{roomId}</span></p>
              </div>
              {effect && (
                <div className="text-red-500 animate-pulse font-bold text-xl">
                  EFFECT: {effect.toUpperCase()}
                </div>
              )}
            </div>

            <div className="relative aspect-video bg-black mb-4">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center text-red-400/70">
              Viewers can donate Soul Points to trigger effects on your stream
            </div>
          </div>
        )}

        {mode === 'watch' && (
          <div className="void-morphism p-8">
            <h2 className="text-2xl text-red-500 font-bold mb-6">DONATE TO TORMENT</h2>

            <div className="relative aspect-video bg-black mb-6">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => donateEffect('invert', 50)}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-4 py-3 border border-red-500 transition-all"
              >
                INVERT (50 SP)
              </button>
              <button
                onClick={() => donateEffect('distort', 100)}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-4 py-3 border border-red-500 transition-all"
              >
                DISTORT (100 SP)
              </button>
              <button
                onClick={() => donateEffect('glitch', 150)}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-4 py-3 border border-red-500 transition-all"
              >
                GLITCH (150 SP)
              </button>
            </div>

            <div className="mt-4 text-center text-red-400/70">
              Your Soul Points: <span className="text-red-500 font-bold">{soulPoints}</span>
            </div>
          </div>
        )}

        <div className="mt-12 void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">THE RULES</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Broadcasters become "The Sacrificed One"</li>
            <li>• Viewers donate Soul Points to trigger visual effects</li>
            <li>• Effects last 5 seconds: INVERT, DISTORT, GLITCH, and more</li>
            <li>• Top donor becomes next Sacrificed One automatically</li>
            <li>• All streams are P2P encrypted (nothing is recorded)</li>
            <li>• Earn Soul Points through site activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
