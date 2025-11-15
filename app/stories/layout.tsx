import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'Anonymous, encrypted stories of snakes and survival. Share your experience with fake people and find solidarity in the darkness.',
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
