'use client';

import { useState, useEffect, useRef } from 'react';
import { cultRankManager } from '@/lib/cultRank';
import { audioEngine } from '@/lib/audioEngine';
import TextGlitch from '@/components/TextGlitch';

interface ShrineEntry {
  id: string;
  type: 'scream' | 'confession' | 'prayer';
  duration: number;
  timestamp: number;
  blob: Blob;
}

export default function MicrophoneShrinePage() {
  const [recording, setRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'scream' | 'confession' | 'prayer'>('scream');
  const [shrine, setShrine] = useState<ShrineEntry[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load shrine from localStorage
    const storedShrine = localStorage.getItem('abyssal_shrine');
    if (storedShrine) {
      try {
        const parsed = JSON.parse(storedShrine);
        setShrine(parsed.map((entry: any) => ({
          ...entry,
          blob: null, // Can't store blobs in localStorage
        })));
      } catch (e) {
        console.error('Failed to load shrine:', e);
      }
    }

    // Play random ambient shrine sounds
    const interval = setInterval(() => {
      if (shrine.length > 0 && Math.random() > 0.7) {
        audioEngine.playScream();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [shrine.length]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const entry: ShrineEntry = {
          id: `shrine_${Date.now()}`,
          type: recordingType,
          duration: chunksRef.current.length,
          timestamp: Date.now(),
          blob,
        };

        setShrine(prev => [...prev, entry]);

        // Save to localStorage (without blob)
        const shrineData = [...shrine, { ...entry, blob: null }];
        localStorage.setItem('abyssal_shrine', JSON.stringify(shrineData.slice(-100)));

        await cultRankManager.addAction(15);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 30000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to access microphone. Check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const playEntry = (entry: ShrineEntry) => {
    if (!entry.blob) {
      alert('Recording data not available');
      return;
    }

    const url = URL.createObjectURL(entry.blob);
    const audio = new Audio(url);

    audioRef.current = audio;
    setPlayingId(entry.id);

    audio.play();

    audio.onended = () => {
      setPlayingId(null);
      URL.revokeObjectURL(url);
    };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scream':
        return 'text-red-500';
      case 'confession':
        return 'text-red-400';
      case 'prayer':
        return 'text-red-300';
      default:
        return 'text-red-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scream':
        return '🔥';
      case 'confession':
        return '💀';
      case 'prayer':
        return '🐍';
      default:
        return '⚫';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>MICROPHONE SHRINE</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">ETERNAL ECHOES OF THE DAMNED</p>
        </div>

        <div className="void-morphism p-8 mb-8">
          <h2 className="text-2xl text-red-500 mb-6 font-bold">ADD YOUR VOICE</h2>

          <div className="mb-6">
            <label className="block text-red-400/80 mb-3">Type of offering:</label>
            <div className="grid grid-cols-3 gap-4">
              {(['scream', 'confession', 'prayer'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setRecordingType(type)}
                  className={`p-4 border-2 transition-all ${
                    recordingType === type
                      ? 'border-red-500 bg-red-900/50'
                      : 'border-red-900/30 bg-black/50 hover:border-red-900/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{getTypeIcon(type)}</div>
                  <div className={`text-sm font-bold ${getTypeColor(type)}`}>
                    {type.toUpperCase()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-red-900/50 hover:bg-red-900 text-red-300 px-12 py-6 text-xl border-2 border-red-500 font-bold transition-all"
              >
                BEGIN RECORDING
              </button>
            ) : (
              <div>
                <div className="text-red-500 text-4xl mb-4 animate-pulse">
                  🔴 RECORDING...
                </div>
                <button
                  onClick={stopRecording}
                  className="bg-red-900 hover:bg-red-800 text-red-100 px-8 py-4 border-2 border-red-500 font-bold transition-all"
                >
                  STOP & ADD TO SHRINE
                </button>
                <p className="text-red-400/70 text-sm mt-4">
                  Max 30 seconds. Speak your truth.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="void-morphism p-8 mb-8">
          <h2 className="text-2xl text-red-500 mb-6 font-bold">
            THE ETERNAL SHRINE ({shrine.length} offerings)
          </h2>

          {shrine.length === 0 ? (
            <div className="text-center text-red-400/70 py-12">
              The shrine is empty. Be the first to offer your voice.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {shrine
                .slice()
                .reverse()
                .map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between bg-black/50 border border-red-900/30 p-4 hover:border-red-900/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{getTypeIcon(entry.type)}</div>
                      <div>
                        <div className={`font-bold ${getTypeColor(entry.type)}`}>
                          {entry.type.toUpperCase()}
                        </div>
                        <div className="text-xs text-red-400/50">
                          {new Date(entry.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {entry.blob && (
                      <button
                        onClick={() => playEntry(entry)}
                        disabled={playingId === entry.id}
                        className={`px-4 py-2 border transition-all ${
                          playingId === entry.id
                            ? 'border-red-500 bg-red-900 text-red-100 animate-pulse'
                            : 'border-red-900/50 text-red-400 hover:border-red-500'
                        }`}
                      >
                        {playingId === entry.id ? 'PLAYING...' : 'PLAY'}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">THE SHRINE</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Record a scream, confession, or prayer (max 30 seconds)</li>
            <li>• Your offering is added to the eternal shrine</li>
            <li>• Random recordings play quietly in the background for all users</li>
            <li>• All recordings are stored locally (no server uploads)</li>
            <li>• The shrine remembers the last 100 offerings</li>
            <li>• Earn Soul Points for every offering</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
