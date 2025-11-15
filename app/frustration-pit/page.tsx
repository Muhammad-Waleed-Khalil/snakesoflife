'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { TextArea } from '@/components/Input';
import { db } from '@/lib/firebase';
import { encrypt, decrypt } from '@/lib/encryption';
import { getAnonId } from '@/lib/anonIdentity';
import type { FrustrationPost } from '@/lib/types';

export default function FrustrationPitPage() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<FrustrationPost[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const postsRef = collection(db, 'frustration');
      const q = query(postsRef, orderBy('createdAt', 'desc'), limit(30));
      const snapshot = await getDocs(q);

      const loadedPosts = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            content: await decrypt(data.content),
            createdAt: data.createdAt,
            anonId: data.anonId,
            intensity: data.intensity || 5,
          } as FrustrationPost;
        })
      );

      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      setShowAnimation(true);

      const encryptedContent = await encrypt(content);
      const intensity = Math.min(10, Math.floor(content.length / 50) + 1);

      await addDoc(collection(db, 'frustration'), {
        content: encryptedContent,
        createdAt: Date.now(),
        anonId: getAnonId(),
        intensity,
      });

      setTimeout(() => {
        setContent('');
        setShowAnimation(false);
        loadPosts();
      }, 2000);
    } catch (error) {
      console.error('Error submitting frustration:', error);
      setShowAnimation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Venom Screen Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blood/30 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 5, -5, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-6xl sm:text-8xl font-creepy text-venom animate-pulse"
            >
              VENOM RELEASED
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            The Frustration Pit
          </h1>
          <p className="text-xl text-venom mb-2">Unleash your venom. Let it all out.</p>
          <p className="text-gray-400 text-sm">
            Everything here is encrypted and anonymous. Scream into the void.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <Card className="border-blood/50">
            <h2 className="text-2xl font-bold text-blood mb-4 font-creepy">
              Drop your rage here...
            </h2>
            <TextArea
              placeholder="F*** these fake people. Let the venom flow. Type in ALL CAPS if you want. No one's judging."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="font-mono text-lg"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                {content.length} characters of pure venom
              </span>
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={!content.trim()}
              >
                RELEASE THE VENOM 🐍
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Feed */}
        <div>
          <h2 className="text-2xl font-bold text-venom mb-6 font-creepy text-center">
            The Pit of Rage
          </h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="relative overflow-hidden"
                  style={{
                    borderColor: `rgba(220, 20, 60, ${post.intensity / 10})`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-blood"
                    style={{ opacity: post.intensity / 10 }}
                  />
                  <p
                    className="text-gray-300 whitespace-pre-wrap font-mono graffiti-text"
                    style={{
                      filter: `blur(${Math.random() * 0.5}px)`,
                      transform: `rotate(${(Math.random() - 0.5) * 2}deg)`,
                    }}
                  >
                    {post.content}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span>Intensity: {post.intensity}/10</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">The pit is empty. Be the first to vent.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
