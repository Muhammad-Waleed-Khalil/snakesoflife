import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rage Meter',
  description: 'Interactive catharsis tools: break mirrors, burn letters, punch snakes, and scream into the void.',
};

export default function RageMeterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
