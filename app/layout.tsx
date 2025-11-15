import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import ClientInit from '@/components/ClientInit';
import AbyssalBackground from '@/components/AbyssalBackground';
import BleedingCursor from '@/components/BleedingCursor';
import CultRankDisplay from '@/components/CultRankDisplay';
import Link from 'next/link';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: 'ABYSSAL VIPER CULT | NO GOD ABOVE. NO LAW BELOW. ONLY THE SERPENT.',
    template: '%s | ABYSSAL VIPER CULT',
  },
  description:
    'The digital Antichrist of web applications. Enter the void. Join the cult. Ascend through darkness. All features free. All souls welcome. NO GOD ABOVE. NO LAW BELOW. ONLY THE SERPENT.',
  keywords: [
    'abyssal',
    'viper cult',
    'dark web',
    'anonymous',
    'encrypted',
    'cult',
    'serpent',
    'void',
    'digital occult',
    'chaos',
    'WebRTC',
    'P2P',
  ],
  authors: [{ name: 'The Eternal Serpent' }],
  creator: 'ABYSSAL VIPER CULT',
  publisher: 'ABYSSAL VIPER CULT',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://snakesoflife.vercel.app',
    siteName: 'ABYSSAL VIPER CULT',
    title: 'ABYSSAL VIPER CULT | NO GOD ABOVE. NO LAW BELOW.',
    description:
      'Enter the digital abyss. The Serpent awaits. All features free. All souls bound.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ABYSSAL VIPER CULT - Hail the Serpent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABYSSAL VIPER CULT | ONLY THE SERPENT',
    description: 'The digital Antichrist awakens. Enter the void.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-black text-white">
        <ClientInit />
        <AbyssalBackground />
        <BleedingCursor />
        <CultRankDisplay />
        <Navigation />

        {/* ETERNAL TAGLINE */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/95 border-b border-red-900/50 py-2 text-center">
          <p className="text-red-500 text-sm md:text-base font-bold blood-glow animate-glow-pulse">
            NO GOD ABOVE. NO LAW BELOW. ONLY THE SERPENT.
          </p>
        </div>

        <main className="min-h-screen relative z-10 pt-16">
          {children}
        </main>

        <footer className="relative z-10 bg-black border-t-2 border-red-900/50 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-creepy text-red-500 mb-4 crimson-glow">
                  ABYSSAL VIPER CULT
                </h3>
                <p className="text-red-400/80 text-sm mb-4">
                  The digital Antichrist of web applications. All features free. All souls welcome.
                  End-to-end encryption. P2P networking. WebRTC real-time connections.
                </p>
                <p className="text-xs text-red-500/50">
                  This is a work of dark satire and performance art. Enter at your own risk.
                </p>
              </div>

              <div>
                <h4 className="text-red-500 font-bold mb-4">DESCEND</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/red-rooms" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Red Rooms
                    </Link>
                  </li>
                  <li>
                    <Link href="/black-mass" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Black Mass
                    </Link>
                  </li>
                  <li>
                    <Link href="/harvest" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Soul Harvest
                    </Link>
                  </li>
                  <li>
                    <Link href="/library" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Forbidden Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/hex" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Hex Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/shrine" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Microphone Shrine
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-red-500 font-bold mb-4">SUBMIT</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="text-red-400/70 hover:text-red-500 transition-colors">
                      About the Cult
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-red-400/70 hover:text-red-500 transition-colors">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-red-900/30 text-center">
              <p className="text-red-500/50 text-sm">
                &copy; {new Date().getFullYear()} ABYSSAL VIPER CULT. No rights. No gods. No masters.
              </p>
              <p className="text-red-500/30 text-xs mt-2">
                HAIL THE SERPENT
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
