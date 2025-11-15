import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brutal Lessons',
  description: 'Hard truths about fake people, toxic relationships, and self-preservation. No sugar-coating.',
};

export default function LessonsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
