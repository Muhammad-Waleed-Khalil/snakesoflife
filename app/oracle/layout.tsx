import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Venom Prophet',
  description: 'Consult the dark oracle for brutal truths and savage wisdom. Ask your questions, receive honest answers.',
};

export default function OracleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
