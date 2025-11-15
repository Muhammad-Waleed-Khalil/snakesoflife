'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navItems = [
  { name: 'Den', href: '/' },
  { name: 'Hall of Snakes', href: '/hall-of-snakes' },
  { name: 'Stories', href: '/stories' },
  { name: 'Frustration Pit', href: '/frustration-pit' },
  { name: 'Abyss', href: '/abyss' },
  { name: 'Oracle', href: '/oracle' },
  { name: 'Snake Pit', href: '/snake-pit' },
  { name: 'Tarot', href: '/tarot' },
  { name: 'Persona', href: '/persona' },
  { name: 'Lessons', href: '/lessons' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-abyss border-b-2 border-blood/30 sticky top-0 z-40 backdrop-blur-md bg-abyss/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🐍</span>
            <span className="text-2xl font-creepy text-blood animate-glitch hidden sm:block">
              Snakes of Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-all',
                  pathname === item.href
                    ? 'bg-blood text-white'
                    : 'text-venom hover:bg-blood/20 hover:text-venom-light'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-venom hover:text-venom-light hover:bg-blood/20 transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-blood/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block px-3 py-2 rounded-md text-base font-medium transition-all',
                    pathname === item.href
                      ? 'bg-blood text-white'
                      : 'text-venom hover:bg-blood/20 hover:text-venom-light'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
