import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voice Vent',
  description: 'Scream into the void. Voice-based venting with real-time visual feedback. Nothing is recorded.',
};

export default function VoiceVentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
