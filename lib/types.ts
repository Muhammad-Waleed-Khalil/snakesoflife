/**
 * Type definitions for Snakes of Life application
 */

export interface SnakeArchetype {
  id: string;
  name: string;
  category: 'ex' | 'friend' | 'family' | 'work' | 'other';
  image: string;
  tagline: string;
  description: string;
  crimes: string[];
  fakeQuote: string;
  lifeLesson: string;
}

export interface Story {
  id: string;
  title: string;
  snakeType: string;
  content: string; // encrypted
  lesson?: string; // encrypted
  imageUrl?: string;
  createdAt: number;
  likes: number;
  commentCount: number;
  saves: number;
  anonId: string; // author's anonymous ID
}

export interface Comment {
  id: string;
  storyId: string;
  content: string; // encrypted
  createdAt: number;
  anonId: string;
  anonNickname: string;
}

export interface FrustrationPost {
  id: string;
  content: string; // encrypted
  createdAt: number;
  anonId: string;
  intensity: number; // 1-10
}

export interface Confession {
  id: string;
  content: string; // encrypted
  createdAt: number;
  anonId: string;
}

export interface ChatMessage {
  id: string;
  content: string; // encrypted
  anonNickname: string;
  anonId: string;
  createdAt: number;
}

export interface TarotCard {
  id: string;
  name: string;
  image: string;
  meaning: string;
  darkLesson: string;
  warning: string;
}

export interface SnakePersona {
  name: string;
  description: string;
  traits: string[];
  shadowSide: string;
  strengths: string[];
  upgradeTip: string;
}

export interface Lesson {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  createdAt: string;
}

export type SortMode = 'latest' | 'popular' | 'venom';
