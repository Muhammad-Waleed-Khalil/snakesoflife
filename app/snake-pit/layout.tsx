import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snake Pit',
  description: 'Anonymous, encrypted real-time chat. Connect with others in the darkness. Chaos mode available.',
};

export default function SnakePitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
