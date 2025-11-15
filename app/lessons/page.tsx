'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/Card';
import { lessons } from '@/lib/data/lessons';

export default function LessonsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            Brutal Lessons
          </h1>
          <p className="text-xl text-venom mb-2">Hard truths about snakes and survival</p>
          <p className="text-gray-400 text-sm">
            No sugar-coating. No false hope. Just raw reality.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/lessons/${lesson.slug}`}>
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-2 py-1 bg-venom/20 text-venom text-xs font-bold rounded uppercase">
                        {lesson.category}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">{lesson.readTime} min read</span>
                  </div>

                  <h2 className="text-2xl font-bold text-blood mb-3 group-hover:text-blood-light transition-colors">
                    {lesson.title}
                  </h2>

                  <p className="text-gray-300 mb-4">{lesson.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                    <span className="text-venom hover:text-venom-light">Read More →</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">More lessons coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
