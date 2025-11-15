'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import Card from '@/components/Card';
import type { SnakePersona } from '@/lib/types';

const questions = [
  {
    id: 1,
    text: 'How quickly do you trust new people?',
    options: [
      { value: 1, label: 'Very slowly - everyone is suspect' },
      { value: 2, label: 'Cautiously - need time to observe' },
      { value: 3, label: 'Moderately - give them a chance' },
      { value: 4, label: 'Easily - innocent until proven guilty' },
    ],
  },
  {
    id: 2,
    text: 'How often have you been betrayed?',
    options: [
      { value: 4, label: 'Too many times to count' },
      { value: 3, label: 'Several memorable times' },
      { value: 2, label: 'A few significant instances' },
      { value: 1, label: 'Rarely or never' },
    ],
  },
  {
    id: 3,
    text: 'How do you react when someone lies to you?',
    options: [
      { value: 4, label: 'Immediate cut-off, no second chances' },
      { value: 3, label: 'Confrontation and demands for honesty' },
      { value: 2, label: 'Distance myself gradually' },
      { value: 1, label: 'Try to understand and forgive' },
    ],
  },
  {
    id: 4,
    text: 'How do you handle conflict?',
    options: [
      { value: 4, label: 'Strike first, ask questions never' },
      { value: 3, label: 'Direct confrontation' },
      { value: 2, label: 'Passive aggression' },
      { value: 1, label: 'Avoid at all costs' },
    ],
  },
  {
    id: 5,
    text: 'What\'s your approach to revenge?',
    options: [
      { value: 4, label: 'Cold, calculated, and brutal' },
      { value: 3, label: 'Living well is the best revenge' },
      { value: 2, label: 'Karma will handle it' },
      { value: 1, label: 'Forgive and forget' },
    ],
  },
];

const personas: Record<string, SnakePersona> = {
  viper: {
    name: 'The Quiet Python',
    description:
      'You observe from the shadows, patient and calculating. You don\'t strike often, but when you do, it\'s lethal and precise. People underestimate you—big mistake.',
    traits: ['Silent observer', 'Patient strategist', 'Rarely forgets', 'Slow to trust'],
    shadowSide:
      'Your silence can be mistaken for weakness. Your patience sometimes becomes paralysis.',
    strengths: ['Exceptional pattern recognition', 'Strategic thinking', 'Emotional control'],
    upgradeTip:
      'Learn to strike faster. Not every betrayal needs months of planning—sometimes immediate boundaries are enough.',
  },
  cobra: {
    name: 'The Fire Fang Adder',
    description:
      'You\'re a force of nature—quick to react, impossible to ignore. When crossed, you strike with venom and precision. You don\'t hide your fangs, and everyone knows it.',
    traits: ['Quick to react', 'Unapologetically direct', 'Natural intimidator', 'Loyal until betrayed'],
    shadowSide:
      'Your intensity can burn bridges before you mean to. Sometimes you strike at shadows.',
    strengths: ['Fearless confrontation', 'Clear boundaries', 'Authentic self-expression'],
    upgradeTip:
      'Pause before you strike. Not every slight deserves full venom—save it for the real snakes.',
  },
  chameleon: {
    name: 'The Adaptive Serpent',
    description:
      'You blend, shift, and survive. You\'ve learned to read rooms and people with surgical precision. You\'re not weak—you\'re strategic. You choose your battles wisely.',
    traits: ['Highly adaptable', 'Socially intelligent', 'Conflict-averse', 'Diplomatic'],
    shadowSide:
      'You adapt so much that you lose yourself. You avoid confrontation even when it\'s necessary.',
    strengths: ['Social navigation', 'Empathy', 'Resilience through flexibility'],
    upgradeTip:
      'Stand your ground more often. Adapting is smart, but disappearing into the background makes you invisible—even to yourself.',
  },
  mamba: {
    name: 'The Black Mamba of Boundaries',
    description:
      'You\'re fast, fierce, and unforgiving. You\'ve been burned before, and now you have zero tolerance for BS. Your boundaries are walls, and you guard them with venom.',
    traits: ['Zero tolerance policy', 'Hyper-vigilant', 'Fiercely independent', 'Brutally honest'],
    shadowSide:
      'Your walls are so high that genuine people can\'t get in. You might be protecting yourself from connection, not just pain.',
    strengths: ['Strong self-preservation', 'Clarity of values', 'Unwavering standards'],
    upgradeTip:
      'Let someone in—just one. Not everyone is a snake. Vulnerability isn\'t weakness when it\'s with the right person.',
  },
};

export default function PersonaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<SnakePersona | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const total = newAnswers.reduce((sum, val) => sum + val, 0);
      const avg = total / newAnswers.length;

      let personaKey: string;
      if (avg >= 3.5) personaKey = 'mamba';
      else if (avg >= 2.5) personaKey = 'cobra';
      else if (avg >= 1.5) personaKey = 'chameleon';
      else personaKey = 'viper';

      setResult(personas[personaKey]);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Snake Persona Generator
          </h1>
          <p className="text-xl text-venom mb-2">Discover your serpent archetype</p>
          <p className="text-gray-400 text-sm">
            Answer honestly. The venom knows when you\'re lying.
          </p>
        </motion.div>

        {/* Questions or Result */}
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-abyss-light rounded-full h-2">
                    <div
                      className="bg-blood h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-2xl font-bold text-venom mb-6">
                  {questions[currentQuestion].text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full text-left px-6 py-4 bg-abyss border-2 border-venom/30 rounded-lg text-white hover:border-venom hover:bg-abyss-light transition-all"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="border-blood/50">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🐍</div>
                  <h2 className="text-4xl font-creepy text-blood mb-2">{result.name}</h2>
                  <p className="text-lg text-gray-300">{result.description}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-venom font-bold mb-3 uppercase text-sm">Your Traits:</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-3 py-1 bg-venom/20 text-venom text-sm rounded-full border border-venom/50"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-abyss p-4 rounded border-l-4 border-venom">
                    <h3 className="text-venom font-bold mb-2 uppercase text-sm">Strengths:</h3>
                    <ul className="space-y-1">
                      {result.strengths.map((strength) => (
                        <li key={strength} className="text-gray-300 text-sm flex items-start">
                          <span className="text-venom mr-2">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-abyss p-4 rounded border-l-4 border-blood">
                    <h3 className="text-blood font-bold mb-2 uppercase text-sm">Shadow Side:</h3>
                    <p className="text-gray-300 text-sm italic">{result.shadowSide}</p>
                  </div>

                  <div className="bg-blood/10 p-4 rounded border-l-4 border-blood">
                    <h3 className="text-blood font-bold mb-2 uppercase text-sm">Upgrade Tip:</h3>
                    <p className="text-gray-300 text-sm">{result.upgradeTip}</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button variant="secondary" size="lg" onClick={reset}>
                    Take Test Again 🔄
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
