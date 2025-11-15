'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { db } from '@/lib/firebase';
import { encrypt, decrypt } from '@/lib/encryption';
import { getAnonNickname, getAnonId } from '@/lib/anonIdentity';
import type { ChatMessage } from '@/lib/types';

export default function SnakePitPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chaosMode, setChaosModeState] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nickname = getAnonNickname();

  useEffect(() => {
    const messagesRef = collection(db, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const loadedMessages = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            content: await decrypt(data.content),
            anonNickname: data.anonNickname,
            anonId: data.anonId,
            createdAt: data.createdAt || Date.now(),
          } as ChatMessage;
        })
      );

      setMessages(loadedMessages.reverse());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const encryptedContent = await encrypt(newMessage);

      await addDoc(collection(db, 'chat'), {
        content: encryptedContent,
        anonNickname: nickname,
        anonId: getAnonId(),
        createdAt: Date.now(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-4 animate-glitch">
            The Snake Pit
          </h1>
          <p className="text-xl text-venom mb-2">Anonymous real-time chat</p>
          <p className="text-gray-400 text-sm mb-4">
            Your nickname: <span className="text-venom font-bold">{nickname}</span>
          </p>

          <div className="flex justify-center gap-3">
            <Button
              variant={chaosMode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setChaosModeState(!chaosMode)}
            >
              {chaosMode ? '🔥 CHAOS MODE ON' : 'Activate Chaos Mode'}
            </Button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 mb-4">
            {messages.map((msg, index) => {
              const isOwnMessage = msg.anonId === getAnonId();

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: isOwnMessage ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[60%] ${
                      isOwnMessage ? 'text-right' : 'text-left'
                    }`}
                  >
                    <p className="text-xs text-venom mb-1">{msg.anonNickname}</p>
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        isOwnMessage
                          ? 'bg-blood text-white'
                          : 'bg-abyss-light border border-venom/30 text-gray-300'
                      }`}
                      style={
                        chaosMode
                          ? {
                              transform: `rotate(${(Math.random() - 0.5) * 5}deg)`,
                              filter: `hue-rotate(${Math.random() * 360}deg)`,
                            }
                          : undefined
                      }
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />

            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">
                  The pit is silent... Start the conversation.
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-blood/30 pt-4 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Hiss your message..."
              className="flex-1 px-4 py-3 bg-abyss border border-venom/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-venom"
            />
            <Button type="submit" variant="primary" disabled={!newMessage.trim()}>
              Send 🐍
            </Button>
          </form>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center text-gray-600 text-sm space-y-1">
          <p>🔒 All messages are encrypted</p>
          <p>⏰ Messages older than 24 hours may be auto-deleted</p>
        </div>
      </div>
    </div>
  );
}
