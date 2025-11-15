'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { snakeArchetypes } from '@/lib/data/archetypes';
import type { SnakeArchetype } from '@/lib/types';

export default function HallOfSnakesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSnake, setExpandedSnake] = useState<string | null>(null);

  const categories = ['all', 'ex', 'friend', 'family', 'work', 'other'];

  const filteredSnakes =
    selectedCategory === 'all'
      ? snakeArchetypes
      : snakeArchetypes.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Hall of Snakes
          </h1>
          <p className="text-xl text-venom mb-2">
            Fictional archetypes of the fakes who poison your life
          </p>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            These are satirical representations. No real individuals are referenced. If you recognize
            someone, that's on them, not us.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Snakes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSnakes.map((snake) => (
              <motion.div
                key={snake.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                id={snake.id}
              >
                <Card className="h-full">
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={snake.image}
                      alt={snake.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
                    <div className="absolute top-2 right-2">
                      <span className="px-3 py-1 bg-blood/90 text-white text-xs font-bold rounded-full backdrop-blur-sm uppercase">
                        {snake.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-venom mb-2">{snake.name}</h3>
                  <p className="text-gray-400 italic mb-4">&quot;{snake.tagline}&quot;</p>

                  <p className="text-gray-300 mb-4">{snake.description}</p>

                  <div className="mb-4">
                    <h4 className="text-blood font-bold mb-2 uppercase text-sm">
                      Known Crimes:
                    </h4>
                    <ul className="space-y-1">
                      {snake.crimes.map((crime, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-venom mr-2">•</span>
                          {crime}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AnimatePresence>
                    {expandedSnake === snake.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t-2 border-blood/30 pt-4 mt-4 space-y-4"
                      >
                        <div>
                          <h4 className="text-venom font-bold mb-2 uppercase text-sm">
                            Typical Quote:
                          </h4>
                          <p className="text-gray-300 italic text-sm bg-abyss p-3 rounded border-l-4 border-blood">
                            &quot;{snake.fakeQuote}&quot;
                          </p>
                        </div>

                        <div>
                          <h4 className="text-blood font-bold mb-2 uppercase text-sm">
                            Life Lesson:
                          </h4>
                          <p className="text-gray-300 text-sm bg-abyss p-3 rounded border-l-4 border-venom">
                            {snake.lifeLesson}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedSnake(expandedSnake === snake.id ? null : snake.id)
                    }
                    className="mt-4 w-full"
                  >
                    {expandedSnake === snake.id ? 'Show Less ▲' : 'Read More ▼'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSnakes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No snakes found in this category... yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
