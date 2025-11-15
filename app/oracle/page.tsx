'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import Card from '@/components/Card';

type Mood = 'venomous' | 'brutal' | 'merciful' | 'chaotic';

const responses: Record<Mood, string[]> = {
  venomous: [
    'You already know the answer. You just don\'t want to accept how pathetic it is.',
    'They\'re not coming back. And honestly? You dodged a serpent.',
    'The truth is: they never cared as much as you did. Move on.',
    'Stop asking questions you already know the answer to. It\'s embarrassing.',
    'You\'re not confused. You\'re just afraid of being alone. Get over it.',
    'The oracle sees your future: more of the same until you grow a spine.',
  ],
  brutal: [
    'You\'re the common denominator in all your problems. Fix yourself first.',
    'They showed you who they are. You chose to ignore it. That\'s on you.',
    'No, it won\'t get better if you just "give it time." Cut it off.',
    'You don\'t have bad luck. You have bad judgment. Learn the difference.',
    'The oracle speaks: You\'re wasting your time on people who wouldn\'t cross the street for you.',
    'Stop romanticizing pain. Suffering isn\'t poetic—it\'s just stupid.',
  ],
  merciful: [
    'You deserve better. But you won\'t get it until you believe it yourself.',
    'It\'s okay to walk away from people who drain you. Self-preservation isn\'t selfish.',
    'The pain will pass. Not today, maybe not tomorrow, but it will.',
    'You\'re stronger than you think. The fact that you\'re still here proves it.',
    'Sometimes the best revenge is just living well and forgetting they exist.',
    'The oracle sees growth in your future. But only if you let go of the past.',
  ],
  chaotic: [
    'Burn the bridge. Dance on the ashes. Post it on social media.',
    'The oracle says: Send that risky text. What\'s the worst that could happen? (Actually, don\'t.)',
    'Chaos mode activated: Block them, but keep checking their profile. It\'s a vibe.',
    'You want advice? Here: Do the opposite of whatever you were planning.',
    'The spirits are confused. Are you asking about love or self-destruction? Same thing, probably.',
    'The oracle suggests: Scream into a pillow, eat some snacks, and reassess in the morning.',
  ],
};

export default function OraclePage() {
  const [question, setQuestion] = useState('');
  const [mood, setMood] = useState<Mood>('venomous');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = () => {
    if (!question.trim()) return;

    setIsTyping(true);
    setResponse('');

    // Simulate typing effect
    setTimeout(() => {
      const randomResponse = responses[mood][Math.floor(Math.random() * responses[mood].length)];
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < randomResponse.length) {
          setResponse((prev) => prev + randomResponse[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    }, 500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            The Venom Prophet
          </h1>
          <p className="text-xl text-venom mb-2">The Dark Oracle Speaks</p>
          <p className="text-gray-400 text-sm">
            Ask your questions. Receive brutal truths.
          </p>
        </motion.div>

        {/* Terminal Interface */}
        <Card className="bg-black border-venom/50 font-mono">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blood" />
              <div className="w-3 h-3 rounded-full bg-venom" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span className="text-venom text-sm ml-2">oracle.terminal</span>
            </div>

            {/* Mood Selector */}
            <div className="mb-6">
              <p className="text-venom mb-3">{'>'} SELECT ORACLE MOOD:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['venomous', 'brutal', 'merciful', 'chaotic'] as Mood[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-3 py-2 text-sm rounded border transition-all ${
                      mood === m
                        ? 'border-blood bg-blood/20 text-blood'
                        : 'border-venom/30 text-venom hover:border-venom'
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Input */}
            <div className="mb-4">
              <p className="text-venom mb-2">{'>'} ENTER YOUR QUESTION:</p>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full bg-abyss border border-venom/30 rounded p-3 text-white placeholder-gray-600 focus:outline-none focus:border-venom resize-none"
                rows={4}
              />
            </div>

            <Button
              variant="secondary"
              onClick={handleAsk}
              disabled={!question.trim() || isTyping}
              className="w-full sm:w-auto"
            >
              {'>'} CONSULT ORACLE
            </Button>
          </div>

          {/* Response Section */}
          <AnimatePresence>
            {(response || isTyping) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-venom/30 pt-6 mt-6"
              >
                <p className="text-blood mb-3 flex items-center">
                  {'>'} ORACLE RESPONSE:
                  {isTyping && (
                    <span className="ml-2 w-2 h-4 bg-venom animate-pulse inline-block" />
                  )}
                </p>
                <div className="bg-abyss border border-blood/30 rounded p-4">
                  <p className="text-white text-lg leading-relaxed">
                    {response}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Info */}
        <div className="mt-8 text-center text-gray-600 text-sm space-y-2">
          <p>The Oracle is not responsible for hurt feelings or existential crises.</p>
          <p>Responses are randomly generated for satirical purposes.</p>
        </div>
      </div>
    </div>
  );
}
