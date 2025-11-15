'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import Card from '@/components/Card';
import VenomDrip from '@/components/VenomDrip';
import { snakeArchetypes } from '@/lib/data/archetypes';

export default function HomePage() {
  const featuredSnakes = snakeArchetypes.slice(0, 6);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss-light to-abyss" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-slither"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%2300FF41' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-creepy text-blood mb-6 animate-glitch">
              Welcome to the Den of Snakes
            </h1>
            <p className="text-xl sm:text-2xl text-venom mb-4 font-bold">
              Exposing the Fakes Who Slither Through Life
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              This is a space for <span className="text-blood font-bold">brutal honesty</span>,{' '}
              <span className="text-venom font-bold">dark catharsis</span>, and{' '}
              <span className="text-blood font-bold">satirical venting</span>. All content is{' '}
              <span className="underline">encrypted and anonymous</span>. No login. No judgment.
              Just raw truth.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/stories">
                <Button variant="primary" size="lg">
                  Share a Snake Story 🐍
                </Button>
              </Link>
              <Link href="/frustration-pit">
                <Button variant="secondary" size="lg">
                  Spit Your Frustration 🔥
                </Button>
              </Link>
              <Link href="/oracle">
                <Button variant="ghost" size="lg">
                  Consult the Oracle 🔮
                </Button>
              </Link>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>⚠️ Satirical content · No real individuals referenced</p>
              <p>🔒 End-to-end style encryption · Anonymous by design</p>
            </div>
          </motion.div>
        </div>

        <VenomDrip />
      </section>

      {/* Featured Snakes Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-abyss-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-creepy text-blood mb-4">
              The Hall of Snakes
            </h2>
            <p className="text-xl text-venom">
              Fictional archetypes of the fakes you know too well
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredSnakes.map((snake, index) => (
              <motion.div
                key={snake.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/hall-of-snakes#${snake.id}`}>
                  <Card hover className="h-full group">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={snake.image}
                        alt={snake.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-blood/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                          {snake.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-venom mb-2 group-hover:text-venom-light transition-colors">
                      {snake.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 italic">{snake.tagline}</p>
                    <p className="text-gray-300 text-sm line-clamp-3">{snake.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/hall-of-snakes">
              <Button variant="primary" size="lg">
                View All Snakes →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-creepy text-blood mb-4">
              Tools for Catharsis
            </h2>
            <p className="text-xl text-gray-400">
              Multiple ways to vent, reflect, and find dark solidarity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Snake Pit Chat',
                emoji: '💬',
                description: 'Anonymous real-time chat. Chaos mode enabled.',
                href: '/snake-pit',
              },
              {
                title: 'The Abyss',
                emoji: '🕳️',
                description: 'Confess your darkest thoughts. Encrypted forever.',
                href: '/abyss',
              },
              {
                title: 'Snake Tarot',
                emoji: '🔮',
                description: 'Dark readings for darker times. Let the cards speak.',
                href: '/tarot',
              },
              {
                title: 'Persona Generator',
                emoji: '🎭',
                description: 'Discover your snake persona. Who are you, really?',
                href: '/persona',
              },
              {
                title: 'Rage Meter',
                emoji: '🤬',
                description: 'Interactive rage tools. Break glass. Burn letters.',
                href: '/rage-meter',
              },
              {
                title: 'Brutal Lessons',
                emoji: '📚',
                description: 'Hard truths about snakes and survival.',
                href: '/lessons',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card hover className="text-center h-full">
                    <div className="text-6xl mb-4">{feature.emoji}</div>
                    <h3 className="text-xl font-bold text-venom mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-abyss-light to-abyss">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-creepy text-blood mb-6">
              Ready to Shed Your Venom?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of anonymous users finding catharsis in the darkness.
              No account needed. No judgment. Just brutal honesty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/stories">
                <Button variant="primary" size="lg">
                  Start Sharing →
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
