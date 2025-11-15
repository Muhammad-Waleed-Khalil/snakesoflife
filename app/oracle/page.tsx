'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import Card from '@/components/Card';

type Mood = 'venomous' | 'brutal' | 'merciful' | 'chaotic';

export default function OraclePage() {
  const [question, setQuestion] = useState('');
  const [mood, setMood] = useState<Mood>('venomous');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsTyping(true);
    setResponse('');

    try {
      // Call Gemini API
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mood }),
      });

      if (!res.ok) {
        throw new Error('Failed to get oracle response');
      }

      const data = await res.json();
      const oracleResponse = data.response;

      // Typing effect with API response
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < oracleResponse.length) {
          setResponse((prev) => prev + oracleResponse[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    } catch (error) {
      console.error('Oracle error:', error);
      setResponse('The oracle is temporarily unavailable. Even dark powers need a break sometimes.');
      setIsTyping(false);
    }
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
          <p>Powered by AI. Responses are generated for satirical purposes.</p>
        </div>
      </div>
    </div>
  );
}
