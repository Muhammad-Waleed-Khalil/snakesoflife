import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Abyss',
  description: 'Confess your darkest thoughts into the encrypted void. Anonymous confessions consumed by the abyss.',
};

export default function AbyssLayout({ children }: { children: React.ReactNode }) {
  return children;
}
