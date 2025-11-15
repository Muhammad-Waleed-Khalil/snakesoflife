import { MetadataRoute } from 'next';
import { lessons } from '@/lib/data/lessons';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://snakesoflife.vercel.app';

  const staticPages = [
    '',
    '/hall-of-snakes',
    '/stories',
    '/frustration-pit',
    '/abyss',
    '/oracle',
    '/snake-pit',
    '/tarot',
    '/persona',
    '/rage-meter',
    '/voice-vent',
    '/snake-filter',
    '/lessons',
    '/about',
    '/disclaimer',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const lessonPages = lessons.map((lesson) => ({
    url: `${baseUrl}/lessons/${lesson.slug}`,
    lastModified: new Date(lesson.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...lessonPages];
}
