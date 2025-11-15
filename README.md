# ABYSSAL VIPER CULT

**The Digital Antichrist of Web Applications**

> NO GOD ABOVE. NO LAW BELOW. ONLY THE SERPENT.

## Overview

ABYSSAL VIPER CULT is a dark-themed, experimental web application featuring real-time P2P communication, WebRTC streaming, cult-based gamification, and fully encrypted anonymous interactions. This is a work of performance art and dark satire.

---

## Features

### The 13 Forbidden Features

1. **Red Rooms 2.0** - WebRTC sacrifice streams with Soul Point donations
2. **Black Mass** - Synchronized 13-player pentagram ritual
3. **Soul Harvest Arena** - Real-time multiplayer snake battle royale
4. **Forbidden Library** - Encrypted knowledge base with confession unlocks
5. **Hex Generator** - Latin curse + chaos magick sigil generator
6. **Microphone Shrine** - Voice recording shrine with ambient playback
7. **Snake Pit** - Anonymous real-time chat
8. **The Abyss** - Encrypted confessional
9. **Dark Oracle** - AI-powered readings (Google Gemini)
10. **Tarot** - Snake-themed tarot readings
11. **Persona Generator** - Cult persona discovery
12. **Rage Meter** - Interactive catharsis tools
13. **Voice Vent** - Audio venting system

### Core Systems

- **Cult Rank System**: Progress from Worm Food → Eternal Viper (7 ranks)
- **Soul Points**: Gamification currency earned through actions
- **P2P Networking**: WebRTC + WebTorrent for decentralized features
- **Real-time Communication**: Socket.IO server for live features
- **Visual Effects**: Multi-layered canvas backgrounds, glitch effects, bleeding cursor
- **Audio Engine**: Ambient drones, procedural sound effects
- **End-to-End Encryption**: All data encrypted client-side

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, custom CSS animations
- **Real-time**: Socket.IO, Simple-Peer, PeerJS
- **P2P**: WebTorrent
- **AI**: Google Gemini 2.0 Flash
- **Storage**: IndexedDB, LocalStorage
- **Animations**: Framer Motion, GSAP
- **AI/ML**: TensorFlow.js (planned)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Firebase project (for database and storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snakesoflife.git
   cd snakesoflife
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Google Gemini AI (for Dark Oracle feature)
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   > **Firebase:** Get these values from your Firebase project settings
   > **Gemini API:** Get your free API key at https://ai.google.dev/

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 🔥 Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database (start in test mode)
3. Enable Firebase Storage (start in test mode)
4. Get your config from Project Settings → Your apps
5. Add config to `.env.local`
6. **IMPORTANT:** Apply the Firestore security rules from `FIREBASE_RULES.md` to allow anonymous writes

---

## 🤖 Google Gemini AI Setup

The Dark Oracle feature is powered by Google Gemini 2.0 Flash for AI-generated responses.

1. Visit https://ai.google.dev/
2. Click "Get API key in Google AI Studio"
3. Create a new API key (free tier available)
4. Add the key to your `.env.local` as `GEMINI_API_KEY`

**Note:** The free tier includes generous quotas suitable for development and moderate usage.

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel dashboard.

**Important:** Add all environment variables (Firebase config and `GEMINI_API_KEY`) to your Vercel project settings under "Environment Variables".

---

## 🔒 Privacy & Security

- **No login required** - Anonymous by default
- **Database-level encryption** - AES-256-GCM encryption protects content in Firestore
- **Public platform** - All users can read all content (shared encryption key)
- **No tracking** - No cookies, no analytics (except optional Firebase Analytics)
- **Content encrypted at rest** - Database and network requests contain only encrypted data

**Note:** This is a public platform. Encryption protects content from database-level access and network sniffing, but all users can decrypt and view all content. Think of it like Reddit with encrypted storage.

---

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Firestore + Storage)
- Google Gemini 2.0 Flash (AI Oracle)
- Framer Motion
- Web Crypto API (AES-256-GCM)

---

## 🚨 Disclaimer

**This is a work of satire and fiction.**

- All archetypes are fictional
- NOT professional mental health advice
- NOT a substitute for therapy
- If you're in crisis, seek professional help

**Crisis Resources:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741

---

## 📄 License

MIT License - See LICENSE file

---

Made with 🐍 and 🖤
