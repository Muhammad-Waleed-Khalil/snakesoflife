import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hall of Snakes',
  description:
    'Explore fictional archetypes of fake people: the ex-gf viper, backstabbing bestie cobra, gaslighting chameleon, and more. Dark satire and brutal honesty.',
};

export default function HallOfSnakesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
