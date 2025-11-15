import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snake Filter',
  description: 'Camera-based snake filters. Transform into your inner serpent. Nothing is saved or transmitted.',
};

export default function SnakeFilterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
