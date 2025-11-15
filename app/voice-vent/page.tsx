'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function VoiceVentPage() {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  const triggerWords = [
    'hate', 'angry', 'frustration', 'betrayal', 'liar', 'fake',
    'toxic', 'done', 'enough', 'sick', 'tired', 'never', 'why'
  ];

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      setIsListening(true);
      monitorVolume();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access denied. Please allow microphone access to use this feature.');
    }
  };

  const stopListening = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setVolume(0);
  };

  const monitorVolume = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const checkVolume = () => {
      if (!analyserRef.current || !isListening) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalized = Math.min(100, (average / 128) * 100);

      setVolume(normalized);

      // Random keyword generation when volume is high
      if (normalized > 50 && Math.random() > 0.9) {
        const randomWord = triggerWords[Math.floor(Math.random() * triggerWords.length)];
        setKeywords((prev) => [...prev.slice(-10), randomWord]);
      }

      requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const backgroundColor = `rgb(${Math.min(220, volume * 2.2)}, ${Math.max(10, 20 - volume / 5)}, ${Math.max(10, 60 - volume / 2)})`;
  const intensity = Math.floor(volume / 10);

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      style={{ backgroundColor: isListening ? backgroundColor : '#0A0A0A' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Voice Vent
          </h1>
          <p className="text-xl text-venom mb-2">Scream into the void</p>
          <p className="text-gray-400 text-sm">
            The louder you scream, the more the screen reacts
          </p>
        </motion.div>

        {/* Control Card */}
        <Card className="mb-8">
          <div className="text-center">
            {!isListening ? (
              <>
                <p className="text-gray-300 mb-6">
                  Grant microphone access and start venting. Your voice stays on your device—nothing
                  is recorded or transmitted.
                </p>
                <Button variant="primary" size="lg" onClick={startListening}>
                  Start Venting 🎤
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-300 mb-6">Listening... Let it all out.</p>
                <Button variant="danger" size="lg" onClick={stopListening}>
                  Stop 🛑
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Visualizer */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Waveform */}
            <Card
              className="border-blood"
              style={{
                boxShadow: `0 0 ${volume}px rgba(220, 20, 60, ${volume / 100})`,
              }}
            >
              <div className="flex items-center justify-center h-32">
                <div className="flex items-end gap-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: `${Math.random() * volume + 20}px`,
                      }}
                      transition={{ duration: 0.1 }}
                      className="w-3 bg-venom rounded-t"
                      style={{
                        filter: `blur(${intensity * 0.5}px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Volume Meter */}
            <Card>
              <h3 className="text-venom font-bold mb-4 text-center">Intensity Level</h3>
              <div className="w-full bg-abyss rounded-full h-8 overflow-hidden">
                <motion.div
                  animate={{ width: `${volume}%` }}
                  className="h-full bg-gradient-to-r from-venom via-blood to-blood rounded-full"
                  style={{
                    boxShadow: `0 0 20px rgba(220, 20, 60, ${volume / 100})`,
                  }}
                />
              </div>
              <p className="text-center text-gray-400 mt-2">
                {volume < 20 && 'Speak up...'}
                {volume >= 20 && volume < 40 && 'Louder...'}
                {volume >= 40 && volume < 60 && 'Keep going...'}
                {volume >= 60 && volume < 80 && 'SCREAM IT OUT!'}
                {volume >= 80 && 'PURE RAGE!!!'}
              </p>
            </Card>

            {/* Floating Keywords */}
            {keywords.length > 0 && (
              <div className="relative h-64">
                {keywords.map((word, index) => (
                  <motion.div
                    key={`${word}-${index}`}
                    initial={{ y: 250, opacity: 0, x: Math.random() * 300 }}
                    animate={{ y: -50, opacity: [0, 1, 0], x: Math.random() * 300 }}
                    transition={{ duration: 3, delay: index * 0.1 }}
                    className="absolute text-2xl font-bold text-blood"
                    style={{
                      textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
                      filter: `blur(${Math.random() * 2}px)`,
                    }}
                  >
                    {word.toUpperCase()}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Info */}
        <div className="mt-12 text-center text-gray-600 text-sm space-y-2">
          <p>🔒 Nothing is recorded or transmitted</p>
          <p>All processing happens locally in your browser</p>
        </div>
      </div>
    </div>
  );
}
