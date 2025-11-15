'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { tarotCards } from '@/lib/data/tarot';
import type { TarotCard } from '@/lib/types';

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [cardCount, setCardCount] = useState<1 | 3>(3);

  const drawCards = () => {
    setIsReading(true);
    setSelectedCards([]);

    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, cardCount);

    // Reveal cards one by one
    drawn.forEach((card, index) => {
      setTimeout(() => {
        setSelectedCards((prev) => [...prev, card]);
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      setIsReading(false);
    }, cardCount * 800 + 500);
  };

  const reset = () => {
    setSelectedCards([]);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Snake Tarot
          </h1>
          <p className="text-xl text-venom mb-2">Dark readings for darker times</p>
          <p className="text-gray-400 text-sm">
            Let the cards speak the truth you already know
          </p>
        </motion.div>

        {/* Controls */}
        {selectedCards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12 space-y-6"
          >
            <div>
              <p className="text-venom mb-4">Select your reading type:</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant={cardCount === 1 ? 'primary' : 'ghost'}
                  onClick={() => setCardCount(1)}
                >
                  Single Card
                </Button>
                <Button
                  variant={cardCount === 3 ? 'primary' : 'ghost'}
                  onClick={() => setCardCount(3)}
                >
                  Three Card Spread
                </Button>
              </div>
            </div>

            <Button variant="primary" size="lg" onClick={drawCards} isLoading={isReading}>
              Draw Cards 🔮
            </Button>
          </motion.div>
        )}

        {/* Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AnimatePresence>
            {selectedCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                }}
                className={cardCount === 1 ? 'md:col-span-3 max-w-md mx-auto w-full' : ''}
              >
                <Card className="h-full text-center border-blood/50">
                  <div className="text-7xl mb-4">{card.image}</div>
                  <h3 className="text-2xl font-creepy text-blood mb-4">{card.name}</h3>

                  {cardCount === 3 && (
                    <p className="text-venom text-sm mb-4 uppercase font-bold">
                      {index === 0 && 'Past'}
                      {index === 1 && 'Present'}
                      {index === 2 && 'Future'}
                    </p>
                  )}

                  <div className="space-y-4 text-left">
                    <div>
                      <h4 className="text-venom font-bold mb-2 text-sm uppercase">Meaning:</h4>
                      <p className="text-gray-300 text-sm">{card.meaning}</p>
                    </div>

                    <div className="bg-abyss p-3 rounded border-l-4 border-blood">
                      <h4 className="text-blood font-bold mb-2 text-sm uppercase">
                        Dark Lesson:
                      </h4>
                      <p className="text-gray-300 text-sm italic">{card.darkLesson}</p>
                    </div>

                    <div className="bg-abyss p-3 rounded border-l-4 border-venom">
                      <h4 className="text-venom font-bold mb-2 text-sm uppercase">Warning:</h4>
                      <p className="text-gray-300 text-sm italic">{card.warning}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Reset Button */}
        {selectedCards.length > 0 && !isReading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Button variant="secondary" size="lg" onClick={reset}>
              Draw Again 🔄
            </Button>
          </motion.div>
        )}

        {/* All Cards Reference */}
        <div className="mt-20 border-t-2 border-blood/30 pt-12">
          <h2 className="text-3xl font-creepy text-venom mb-8 text-center">
            The Full Deck
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tarotCards.map((card) => (
              <Card key={card.id} className="text-center">
                <div className="text-5xl mb-3">{card.image}</div>
                <h3 className="text-lg font-bold text-blood mb-2">{card.name}</h3>
                <p className="text-gray-400 text-sm">{card.meaning}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
