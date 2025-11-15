import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#DC143C',
};

export const metadata: Metadata = {
  title: {
    default: 'Snakes of Life | Expose the Fakes, Embrace the Truth',
    template: '%s | Snakes of Life',
  },
  description:
    'A dark, brutal satire platform for anonymous venting and catharsis. Share stories, expose fake archetypes, consult the dark oracle, and find solidarity in the snake pit. No login required. Your secrets are encrypted.',
  keywords: [
    'anonymous venting',
    'satire',
    'catharsis',
    'fake people',
    'betrayal stories',
    'dark humor',
    'confession',
    'oracle',
    'encrypted',
  ],
  authors: [{ name: 'Snakes of Life' }],
  creator: 'Snakes of Life',
  publisher: 'Snakes of Life',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://snakesoflife.vercel.app',
    siteName: 'Snakes of Life',
    title: 'Snakes of Life | Expose the Fakes, Embrace the Truth',
    description:
      'Anonymous, encrypted platform for venting, confessions, and dark catharsis. No login required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Snakes of Life - Expose the Fakes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snakes of Life | Expose the Fakes, Embrace the Truth',
    description: 'Anonymous, encrypted venting and catharsis. No login required.',
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
      <body className="font-sans">
        <Navigation />

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-abyss-light border-t-2 border-blood/30 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-creepy text-blood mb-4">Snakes of Life</h3>
                <p className="text-gray-400 text-sm mb-4">
                  A brutal satire platform for anonymous venting and catharsis. All content is
                  encrypted. No login required. Your secrets are yours alone.
                </p>
                <p className="text-xs text-gray-500">
                  This is a work of satire and fiction. No real individuals are referenced.
                </p>
              </div>

              <div>
                <h4 className="text-venom font-bold mb-4">Explore</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/hall-of-snakes" className="text-gray-400 hover:text-venom transition-colors">
                      Hall of Snakes
                    </Link>
                  </li>
                  <li>
                    <Link href="/stories" className="text-gray-400 hover:text-venom transition-colors">
                      Stories
                    </Link>
                  </li>
                  <li>
                    <Link href="/oracle" className="text-gray-400 hover:text-venom transition-colors">
                      Dark Oracle
                    </Link>
                  </li>
                  <li>
                    <Link href="/lessons" className="text-gray-400 hover:text-venom transition-colors">
                      Brutal Lessons
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-venom font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-venom transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="text-gray-400 hover:text-venom transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-venom transition-colors">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-blood/30 text-center">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Snakes of Life. All wrongs reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
