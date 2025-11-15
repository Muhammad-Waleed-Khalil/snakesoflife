'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { HeartIcon, ChatBubbleLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input, TextArea } from '@/components/Input';
import Modal from '@/components/Modal';
import { db } from '@/lib/firebase';
import { encrypt, decrypt } from '@/lib/encryption';
import {
  getAnonId,
  hasPerformedAction,
  markActionPerformed,
  removeActionMark,
  isStorySaved,
  saveStory,
  unsaveStory,
} from '@/lib/anonIdentity';
import type { Story, SortMode } from '@/lib/types';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [snakeType, setSnakeType] = useState('ex');
  const [content, setContent] = useState('');
  const [lesson, setLesson] = useState('');

  useEffect(() => {
    loadStories();
  }, [sortMode]);

  const loadStories = async () => {
    try {
      setIsLoading(true);
      const storiesRef = collection(db, 'stories');
      let q;

      if (sortMode === 'latest') {
        q = query(storiesRef, orderBy('createdAt', 'desc'), limit(50));
      } else if (sortMode === 'popular') {
        q = query(storiesRef, orderBy('likes', 'desc'), limit(50));
      } else {
        q = query(storiesRef, orderBy('venom', 'desc'), limit(50));
      }

      const snapshot = await getDocs(q);
      const loadedStories = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: await decrypt(data.title),
            snakeType: data.snakeType,
            content: await decrypt(data.content),
            lesson: data.lesson ? await decrypt(data.lesson) : undefined,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
            likes: data.likes || 0,
            commentCount: data.commentCount || 0,
            saves: data.saves || 0,
            anonId: data.anonId,
          } as Story;
        })
      );

      setStories(loadedStories);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      setIsSubmitting(true);

      const encryptedTitle = await encrypt(title);
      const encryptedContent = await encrypt(content);
      const encryptedLesson = lesson ? await encrypt(lesson) : '';

      const storyData = {
        title: encryptedTitle,
        snakeType,
        content: encryptedContent,
        lesson: encryptedLesson,
        createdAt: Date.now(),
        likes: 0,
        commentCount: 0,
        saves: 0,
        venom: content.length + (lesson?.length || 0),
        anonId: getAnonId(),
      };

      await addDoc(collection(db, 'stories'), storyData);

      // Reset form
      setTitle('');
      setContent('');
      setLesson('');
      setSnakeType('ex');
      setIsModalOpen(false);

      // Reload stories
      await loadStories();
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Failed to submit story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (storyId: string) => {
    const actionKey = `like_${storyId}`;
    const hasLiked = hasPerformedAction('like', storyId);

    try {
      const storyRef = doc(db, 'stories', storyId);

      if (hasLiked) {
        await updateDoc(storyRef, { likes: increment(-1) });
        removeActionMark('like', storyId);
        setStories((prev) =>
          prev.map((s) => (s.id === storyId ? { ...s, likes: s.likes - 1 } : s))
        );
      } else {
        await updateDoc(storyRef, { likes: increment(1) });
        markActionPerformed('like', storyId);
        setStories((prev) =>
          prev.map((s) => (s.id === storyId ? { ...s, likes: s.likes + 1 } : s))
        );
      }
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const handleSave = async (storyId: string) => {
    const isSaved = isStorySaved(storyId);

    try {
      const storyRef = doc(db, 'stories', storyId);

      if (isSaved) {
        await updateDoc(storyRef, { saves: increment(-1) });
        unsaveStory(storyId);
        setStories((prev) =>
          prev.map((s) => (s.id === storyId ? { ...s, saves: s.saves - 1 } : s))
        );
      } else {
        await updateDoc(storyRef, { saves: increment(1) });
        saveStory(storyId);
        setStories((prev) =>
          prev.map((s) => (s.id === storyId ? { ...s, saves: s.saves + 1 } : s))
        );
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

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
            Your Stories
          </h1>
          <p className="text-xl text-venom mb-6">
            Anonymous, encrypted tales of snakes and survival
          </p>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            Share Your Story 🐍
          </Button>
        </motion.div>

        {/* Sort Options */}
        <div className="flex justify-center gap-3 mb-8">
          {(['latest', 'popular', 'venom'] as SortMode[]).map((mode) => (
            <Button
              key={mode}
              variant={sortMode === mode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSortMode(mode)}
            >
              {mode === 'latest' && '🕐 Latest'}
              {mode === 'popular' && '❤️ Popular'}
              {mode === 'venom' && '🔥 Most Venom'}
            </Button>
          ))}
        </div>

        {/* Stories Feed */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blood border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">Loading stories...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-venom mb-1">{story.title}</h3>
                        <span className="px-2 py-1 bg-blood/20 text-blood text-xs font-bold rounded uppercase">
                          {story.snakeType}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 whitespace-pre-wrap">{story.content}</p>

                    {story.lesson && (
                      <div className="bg-abyss p-3 rounded border-l-4 border-venom mb-4">
                        <p className="text-sm text-gray-300 italic">{story.lesson}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-6 text-sm">
                      <button
                        onClick={() => handleLike(story.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-blood transition-colors"
                      >
                        {hasPerformedAction('like', story.id) ? (
                          <HeartSolidIcon className="w-5 h-5 text-blood" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                        <span>{story.likes}</span>
                      </button>

                      <div className="flex items-center gap-2 text-gray-400">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>{story.commentCount}</span>
                      </div>

                      <button
                        onClick={() => handleSave(story.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-venom transition-colors"
                      >
                        {isStorySaved(story.id) ? (
                          <BookmarkSolidIcon className="w-5 h-5 text-venom" />
                        ) : (
                          <BookmarkIcon className="w-5 h-5" />
                        )}
                        <span>{story.saves}</span>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {stories.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">No stories yet. Be the first to share.</p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Share Your Story
            </Button>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Share Your Snake Story"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
              Submit Story
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Story Title"
            placeholder="What do you call this snake?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-venom font-bold mb-2 text-sm uppercase tracking-wide">
              Snake Type
            </label>
            <select
              value={snakeType}
              onChange={(e) => setSnakeType(e.target.value)}
              className="w-full px-4 py-3 bg-abyss border-2 border-venom/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-venom/30 focus:border-venom"
            >
              <option value="ex">Ex</option>
              <option value="friend">Friend</option>
              <option value="family">Family</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

          <TextArea
            label="What the snake did"
            placeholder="Bleed your story onto the page... let the venom flow."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />

          <TextArea
            label="What you learned (optional)"
            placeholder="How did you survive? What did you learn?"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            rows={3}
          />

          <p className="text-xs text-gray-500">
            🔒 Your story will be encrypted before being saved. Anonymous by design.
          </p>
        </form>
      </Modal>
    </div>
  );
}
