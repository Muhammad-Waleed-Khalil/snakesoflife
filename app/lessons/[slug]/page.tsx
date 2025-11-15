'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import { lessons } from '@/lib/data/lessons';

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessons.find((l) => l.slug === params.slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/lessons">
            <Button variant="ghost" size="sm">
              ← Back to Lessons
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-venom/20 text-venom text-sm font-bold rounded uppercase">
              {lesson.category}
            </span>
            <span className="text-gray-500 text-sm">{lesson.readTime} min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-creepy text-blood mb-4">
            {lesson.title}
          </h1>

          <p className="text-xl text-gray-300 mb-4">{lesson.excerpt}</p>

          <div className="text-sm text-gray-500">
            Published {new Date(lesson.createdAt).toLocaleDateString()}
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-blood max-w-none"
        >
          <div className="text-gray-300 leading-relaxed space-y-6">
            {lesson.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-creepy text-blood mt-8 mb-4">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-venom mt-6 mb-3">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="font-bold text-blood bg-blood/10 p-4 rounded border-l-4 border-blood">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="border-blood/30 my-8" />;
              }
              return (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.article>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t-2 border-blood/30 text-center"
        >
          <Link href="/lessons">
            <Button variant="secondary" size="lg">
              Read More Lessons →
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
