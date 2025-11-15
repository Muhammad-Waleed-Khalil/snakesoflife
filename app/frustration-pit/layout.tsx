import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frustration Pit',
  description: 'Unleash your venom. Anonymous, encrypted venting for when you need to scream into the void.',
};

export default function FrustrationPitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
