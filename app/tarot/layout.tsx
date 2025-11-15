import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snake Tarot',
  description: 'Dark tarot readings with brutal truths. Draw cards and receive warnings from the serpent deck.',
};

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
