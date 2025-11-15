'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Button from '@/components/Button';
import { db } from '@/lib/firebase';
import { encrypt, decrypt } from '@/lib/encryption';
import { getAnonId } from '@/lib/anonIdentity';
import type { Confession } from '@/lib/types';

export default function AbyssPage() {
  const [confession, setConfession] = useState('');
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadConfessions();
  }, []);

  const loadConfessions = async () => {
    try {
      const confessionsRef = collection(db, 'confessions');
      const q = query(confessionsRef, orderBy('createdAt', 'desc'), limit(20));
      const snapshot = await getDocs(q);

      const loadedConfessions = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            content: await decrypt(data.content),
            createdAt: data.createdAt,
            anonId: data.anonId,
          } as Confession;
        })
      );

      setConfessions(loadedConfessions);
    } catch (error) {
      console.error('Error loading confessions:', error);
    }
  };

  const handleSubmit = async () => {
    if (!confession.trim()) return;

    try {
      setIsSubmitting(true);

      const encryptedContent = await encrypt(confession);

      await addDoc(collection(db, 'confessions'), {
        content: encryptedContent,
        createdAt: Date.now(),
        anonId: getAnonId(),
      });

      setConfession('');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        loadConfessions();
      }, 2000);
    } catch (error) {
      console.error('Error submitting confession:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Pulsing Background */}
      <div className="absolute inset-0 bg-gradient-radial from-blood/10 via-abyss to-black animate-pulse-red" />

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="text-6xl sm:text-8xl font-creepy text-blood animate-glitch">
              CONSUMED BY THE ABYSS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full mb-12"
        >
          <h1 className="text-5xl sm:text-7xl font-creepy text-blood mb-8 text-center animate-pulse-red">
            The Abyss
          </h1>

          <p className="text-2xl text-venom text-center mb-12 animate-pulse">
            Speak your poison...
          </p>

          <div className="relative">
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="The abyss is listening... confess your darkest thoughts."
              className="w-full h-64 bg-black/80 border-2 border-blood/50 rounded-lg p-6 text-white placeholder-gray-700 focus:outline-none focus:border-blood focus:ring-2 focus:ring-blood/30 text-lg font-mono resize-none"
              style={{
                textShadow: '0 0 10px rgba(220, 20, 60, 0.5)',
              }}
            />

            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={!confession.trim()}
              >
                Release into the Void
              </Button>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Your confession is encrypted and will be lost to the abyss forever...
          </p>
        </motion.div>

        {/* Confessions Display */}
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl font-creepy text-venom mb-6 text-center">
            Echoes from the Abyss
          </h2>

          <div className="space-y-4">
            {confessions.map((conf, index) => (
              <motion.div
                key={conf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0.3, 0.7, 0.3], y: 0 }}
                transition={{
                  opacity: { duration: 3, repeat: Infinity },
                  y: { duration: 0.5 },
                  delay: index * 0.1,
                }}
                className="bg-black/60 border border-blood/30 rounded-lg p-6"
                style={{
                  transform: `rotate(${(Math.random() - 0.5) * 3}deg)`,
                  filter: `blur(${Math.random() * 1}px)`,
                }}
              >
                <p className="text-gray-400 font-mono text-sm sm:text-base whitespace-pre-wrap">
                  {conf.content.split(' ').map((word, i) =>
                    Math.random() > 0.85 ? (
                      <span key={i} className="blur-sm">
                        {word}{' '}
                      </span>
                    ) : (
                      <span key={i}>{word} </span>
                    )
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          {confessions.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">The abyss is silent... for now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
