'use client';

import { useState, useEffect } from 'react';
import { cultRankManager } from '@/lib/cultRank';
import TextGlitch from '@/components/TextGlitch';

interface Book {
  id: string;
  title: string;
  type: 'spell' | 'manifesto' | 'rage' | 'occult';
  content: string;
  cost: number;
  timestamp: number;
  locked: boolean;
}

export default function ForbiddenLibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState({ title: '', type: 'spell' as const, content: '' });
  const [soulPoints, setSoulPoints] = useState(0);
  const [confession, setConfession] = useState('');
  const [showConfessionModal, setShowConfessionModal] = useState(false);
  const [bookToUnlock, setBookToUnlock] = useState<Book | null>(null);

  useEffect(() => {
    // Load library from localStorage
    const storedLibrary = localStorage.getItem('abyssal_library');
    if (storedLibrary) {
      try {
        setBooks(JSON.parse(storedLibrary));
      } catch (e) {
        console.error('Failed to load library:', e);
      }
    }

    // Load soul points
    cultRankManager.getMember().then(member => {
      if (member) setSoulPoints(member.soulPoints);
    });
  }, []);

  const addBook = async () => {
    if (!newBook.title || !newBook.content) {
      alert('Title and content required');
      return;
    }

    const book: Book = {
      id: `book_${Date.now()}`,
      title: newBook.title,
      type: newBook.type,
      content: newBook.content,
      cost: Math.floor(Math.random() * 50) + 20,
      timestamp: Date.now(),
      locked: true,
    };

    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem('abyssal_library', JSON.stringify(updatedBooks));

    setNewBook({ title: '', type: 'spell', content: '' });

    await cultRankManager.addAction(20);

    alert('Your knowledge has been added to the Forbidden Library');
  };

  const unlockBook = (book: Book) => {
    if (!book.locked) {
      setSelectedBook(book);
      return;
    }

    setBookToUnlock(book);
    setShowConfessionModal(true);
  };

  const submitConfession = async () => {
    if (!confession || !bookToUnlock) {
      alert('Confession required');
      return;
    }

    if (soulPoints >= bookToUnlock.cost) {
      // Unlock with soul points
      const updatedBooks = books.map(b =>
        b.id === bookToUnlock.id ? { ...b, locked: false } : b
      );
      setBooks(updatedBooks);
      localStorage.setItem('abyssal_library', JSON.stringify(updatedBooks));

      setSoulPoints(prev => prev - bookToUnlock.cost);
      await cultRankManager.getMember().then(member => {
        if (member) {
          member.soulPoints -= bookToUnlock.cost;
          cultRankManager.saveMember(member);
        }
      });
    } else if (confession.length >= 50) {
      // Unlock with confession
      const updatedBooks = books.map(b =>
        b.id === bookToUnlock.id ? { ...b, locked: false } : b
      );
      setBooks(updatedBooks);
      localStorage.setItem('abyssal_library', JSON.stringify(updatedBooks));
    } else {
      alert('Confession too short (min 50 characters) or insufficient Soul Points');
      return;
    }

    setSelectedBook(bookToUnlock);
    setShowConfessionModal(false);
    setConfession('');
    setBookToUnlock(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spell':
        return 'text-red-500';
      case 'manifesto':
        return 'text-red-400';
      case 'rage':
        return 'text-red-600';
      case 'occult':
        return 'text-red-300';
      default:
        return 'text-red-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spell':
        return '📿';
      case 'manifesto':
        return '📜';
      case 'rage':
        return '🔥';
      case 'occult':
        return '👁️';
      default:
        return '📖';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-creepy text-red-500 mb-4 crimson-glow">
            <TextGlitch>FORBIDDEN LIBRARY</TextGlitch>
          </h1>
          <p className="text-red-400/80 text-xl">KNOWLEDGE SEALED IN BLOOD</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1 void-morphism p-6">
            <h2 className="text-2xl text-red-500 mb-6 font-bold">ADD KNOWLEDGE</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-red-400/80 mb-2">Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="The Book of..."
                  className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
                />
              </div>

              <div>
                <label className="block text-red-400/80 mb-2">Type</label>
                <select
                  value={newBook.type}
                  onChange={e => setNewBook(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
                >
                  <option value="spell">Spell</option>
                  <option value="manifesto">Manifesto</option>
                  <option value="rage">Rage Letter</option>
                  <option value="occult">Occult Text</option>
                </select>
              </div>

              <div>
                <label className="block text-red-400/80 mb-2">Content</label>
                <textarea
                  value={newBook.content}
                  onChange={e => setNewBook(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Your dark knowledge..."
                  rows={8}
                  className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
                />
              </div>

              <button
                onClick={addBook}
                className="w-full bg-red-900/50 hover:bg-red-900 text-red-300 px-6 py-3 border-2 border-red-500 font-bold transition-all"
              >
                SEAL IN LIBRARY
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedBook ? (
              <div className="void-morphism p-8">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-red-400 hover:text-red-500 mb-6"
                >
                  ← Back to Library
                </button>

                <div className="mb-6">
                  <div className="text-3xl mb-2">{getTypeIcon(selectedBook.type)}</div>
                  <h2 className="text-3xl text-red-500 font-bold mb-2">{selectedBook.title}</h2>
                  <div className={`text-sm ${getTypeColor(selectedBook.type)}`}>
                    {selectedBook.type.toUpperCase()}
                  </div>
                </div>

                <div className="bg-black/80 border border-red-900/50 p-6 max-h-96 overflow-y-auto">
                  <pre className="text-red-400 whitespace-pre-wrap font-mono text-sm">
                    {selectedBook.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="void-morphism p-8">
                <h2 className="text-2xl text-red-500 mb-6 font-bold">
                  THE COLLECTION ({books.length} books)
                </h2>

                {books.length === 0 ? (
                  <div className="text-center text-red-400/70 py-12">
                    The library is empty. Add the first forbidden knowledge.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {books.map(book => (
                      <button
                        key={book.id}
                        onClick={() => unlockBook(book)}
                        className="text-left bg-black/50 border border-red-900/30 p-4 hover:border-red-900/50 transition-all hover-lift"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="text-3xl">{getTypeIcon(book.type)}</div>
                            <div>
                              <div className="text-lg text-red-500 font-bold flex items-center gap-2">
                                {book.title}
                                {book.locked && (
                                  <span className="text-xs text-red-400/70">🔒</span>
                                )}
                              </div>
                              <div className={`text-xs ${getTypeColor(book.type)}`}>
                                {book.type.toUpperCase()}
                              </div>
                              <div className="text-xs text-red-400/50 mt-1">
                                {new Date(book.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {book.locked && (
                            <div className="text-sm text-red-400/70">
                              {book.cost} SP or confession
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="void-morphism p-6">
          <h3 className="text-xl text-red-500 mb-4 font-bold">THE LIBRARY</h3>
          <ul className="text-red-400/70 space-y-2 text-sm">
            <li>• Upload encrypted PDFs/text of "dark knowledge"</li>
            <li>• Spells, manifestos, rage letters, occult texts</li>
            <li>• Each book costs Soul Points or a confession to unlock</li>
            <li>• Confessions must be at least 50 characters</li>
            <li>• All content is stored locally and encrypted</li>
            <li>• Earn Soul Points for adding knowledge</li>
          </ul>
        </div>
      </div>

      {/* Confession Modal */}
      {showConfessionModal && bookToUnlock && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95">
          <div className="void-morphism p-8 max-w-2xl w-full mx-4">
            <h2 className="text-3xl text-red-500 mb-6 font-bold text-center">
              <TextGlitch>UNLOCK "{bookToUnlock.title}"</TextGlitch>
            </h2>

            <p className="text-red-400/80 mb-6 text-center">
              Pay {bookToUnlock.cost} Soul Points OR write a confession (min 50 chars)
            </p>

            <div className="mb-6">
              <label className="block text-red-400/80 mb-2">Your Confession:</label>
              <textarea
                value={confession}
                onChange={e => setConfession(e.target.value)}
                placeholder="Confess your sins..."
                rows={6}
                className="w-full bg-black/80 border border-red-900/50 p-3 text-red-400"
              />
              <div className="text-xs text-red-400/50 mt-1">
                {confession.length} / 50 characters
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={submitConfession}
                className="flex-1 bg-red-900/50 hover:bg-red-900 text-red-300 px-6 py-3 border-2 border-red-500 font-bold transition-all"
              >
                UNLOCK
              </button>
              <button
                onClick={() => {
                  setShowConfessionModal(false);
                  setConfession('');
                  setBookToUnlock(null);
                }}
                className="flex-1 bg-black/50 hover:bg-black/70 text-red-400 px-6 py-3 border-2 border-red-900/50 font-bold transition-all"
              >
                CANCEL
              </button>
            </div>

            <div className="mt-4 text-center text-red-400/70 text-sm">
              Current Soul Points: {soulPoints}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
