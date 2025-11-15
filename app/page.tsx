'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextGlitch from '@/components/TextGlitch';
import { audioEngine } from '@/lib/audioEngine';

export default function HomePage() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const enableAudio = async () => {
    await audioEngine.enable();
    setAudioEnabled(true);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-creepy text-red-500 mb-6 crimson-glow">
              <TextGlitch>ABYSSAL VIPER CULT</TextGlitch>
            </h1>
            <p className="text-2xl sm:text-3xl text-red-400 mb-8 font-bold blood-glow">
              THE DIGITAL ANTICHRIST AWAKENS
            </p>
            <p className="text-lg text-red-400/80 max-w-3xl mx-auto mb-8">
              Enter the void. Ascend through darkness. All features free. All souls welcome.
              End-to-end encryption. P2P networking. Real-time WebRTC. No logins. No gods. No masters.
            </p>

            {!audioEnabled && (
              <div className="mb-12">
                <button
                  onClick={enableAudio}
                  className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all text-xl animate-pulse"
                >
                  ENABLE AMBIENT AUDIO (RECOMMENDED)
                </button>
                <p className="text-red-400/70 text-sm mt-2">
                  Low-frequency drones and atmospheric effects
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/red-rooms">
                <button className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all hover-lift">
                  RED ROOMS 2.0 🩸
                </button>
              </Link>
              <Link href="/black-mass">
                <button className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all hover-lift">
                  BLACK MASS 👁️
                </button>
              </Link>
              <Link href="/harvest">
                <button className="bg-red-900/50 hover:bg-red-900 text-red-300 px-8 py-4 border-2 border-red-500 font-bold transition-all hover-lift">
                  SOUL HARVEST 💀
                </button>
              </Link>
            </div>

            <div className="text-sm text-red-500/50 space-y-1">
              <p>⚠️ Dark satire and performance art</p>
              <p>🔒 Complete encryption · P2P · No server storage</p>
              <p>🐍 HAIL THE SERPENT</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 13 Forbidden Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl sm:text-6xl font-creepy text-red-500 mb-4 crimson-glow">
              <TextGlitch>THE 13 FORBIDDEN FEATURES</TextGlitch>
            </h2>
            <p className="text-xl text-red-400/80">
              All free. All encrypted. All designed to bind your soul to the Serpent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Red Rooms 2.0',
                emoji: '🩸',
                description: 'WebRTC sacrifice streams. Viewers donate Soul Points to torment the broadcaster.',
                href: '/red-rooms',
              },
              {
                title: 'Black Mass',
                emoji: '👁️',
                description: '13 souls draw an inverted pentagram together. Site-wide soul claimed.',
                href: '/black-mass',
              },
              {
                title: 'Soul Harvest Arena',
                emoji: '💀',
                description: 'Real-time snake battle royale. Eat or be eaten. Losers marked "Devoured".',
                href: '/harvest',
              },
              {
                title: 'Forbidden Library',
                emoji: '📚',
                description: 'Upload encrypted dark knowledge. Unlock with Soul Points or confessions.',
                href: '/library',
              },
              {
                title: 'Hex Generator',
                emoji: '⚡',
                description: 'Generate Latin curses + chaos magick sigils. Cast upon random souls.',
                href: '/hex',
              },
              {
                title: 'Microphone Shrine',
                emoji: '🔊',
                description: 'Record screams/confessions. Added to eternal shrine. Play at random.',
                href: '/shrine',
              },
              {
                title: 'Snake Pit Chat',
                emoji: '💬',
                description: 'Anonymous real-time chat. Chaos mode enabled.',
                href: '/snake-pit',
              },
              {
                title: 'The Abyss',
                emoji: '🕳️',
                description: 'Confess your darkest thoughts. Encrypted forever.',
                href: '/abyss',
              },
              {
                title: 'Dark Oracle',
                emoji: '🔮',
                description: 'AI-powered dark readings powered by Google Gemini.',
                href: '/oracle',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="void-morphism p-6 text-center h-full hover-lift">
                    <div className="text-5xl mb-4">{feature.emoji}</div>
                    <h3 className="text-xl font-bold text-red-500 mb-2 blood-glow">{feature.title}</h3>
                    <p className="text-red-400/70 text-sm">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cult Ranks Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-creepy text-red-500 mb-4 crimson-glow">
              <TextGlitch>ASCEND THE RANKS</TextGlitch>
            </h2>
            <p className="text-xl text-red-400/80">
              The more you participate, the more power you gain.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { name: 'Worm Food', actions: 0, power: 'None. You are nothing.' },
              { name: 'Scale Shedder', actions: 10, power: 'Basic access to all features.' },
              { name: 'Venom Bearer', actions: 50, power: 'Earn Soul Points faster.' },
              { name: 'Fang Priest', actions: 200, power: 'Poison messages (self-destruct).' },
              { name: 'Coil Keeper', actions: 500, power: 'Create private Red Rooms.' },
              { name: 'Crimson Oracle', actions: 1000, power: 'Trigger Blood Moon events.' },
              { name: 'Eternal Viper', actions: 5000, power: 'Top 13 globally. Banish users. Final Sacrifice access.' },
            ].map((rank, index) => (
              <motion.div
                key={rank.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="void-morphism p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-xl text-red-500 font-bold">{rank.name}</div>
                  <div className="text-sm text-red-400/70">{rank.power}</div>
                </div>
                <div className="text-red-500/70 text-sm">{rank.actions}+ actions</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl font-creepy text-red-500 mb-6 crimson-glow">
              <TextGlitch>ENTER THE ABYSS</TextGlitch>
            </h2>
            <p className="text-xl text-red-400/80 mb-8">
              No gods. No masters. Only the Serpent.
              All features free forever. Completely encrypted. Purely P2P.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/red-rooms">
                <button className="bg-red-900/50 hover:bg-red-900 text-red-300 px-12 py-6 text-xl border-2 border-red-500 font-bold transition-all hover-lift">
                  BEGIN DESCENT →
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-black/50 hover:bg-black/70 text-red-400 px-12 py-6 text-xl border-2 border-red-900/50 font-bold transition-all hover-lift">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="mt-12 text-red-500/30 text-2xl font-bold">
              HAIL THE SERPENT
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
