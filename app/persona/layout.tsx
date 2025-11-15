import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Persona Generator',
  description: 'Discover your snake persona. Answer questions to reveal your serpent archetype and survival traits.',
};

export default function PersonaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
