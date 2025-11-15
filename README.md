# 🐍 Snakes of Life

> A dark, brutal satire web application for anonymous venting and catharsis.

**Snakes of Life** is a production-ready Next.js application that provides a safe, anonymous public platform for users to vent about toxic people, share stories, confess dark thoughts, and find solidarity in the darkness. All content is encrypted at the database level, and no login is required.

---

## ✨ Features

### Core Functionality
- 🔒 **Database-level AES-256-GCM encryption** - All content encrypted in database and network requests
- 👤 **Anonymous by design** - No login, no accounts, random IDs generated locally
- 🌍 **Public platform** - Everyone can view and interact with all content
- 🎭 **Satirical snake archetypes** - Fictional personas representing toxic people
- 📖 **Anonymous story sharing** - Share stories with likes and comments
- 🔥 **Frustration Pit** - Vent your rage with visual feedback
- 🕳️ **The Abyss** - Dark confession mode with glitch effects
- 🔮 **Dark Oracle** - Terminal-style AI oracle powered by Google Gemini 2.0 Flash with multiple moods
- 💬 **Snake Pit Chat** - Real-time anonymous encrypted chat with Chaos Mode
- 🃏 **Snake Tarot** - Dark tarot readings with brutal truths
- 🎭 **Persona Generator** - Discover your snake persona through questions
- 🤬 **Rage Meter** - Interactive catharsis tools (break mirror, burn letter, etc.)
- 🎤 **Voice Vent** - Audio-reactive venting with waveform visualization
- 📸 **Snake Filter** - Camera filters with snake overlays
- 📚 **Brutal Lessons** - Blog-like articles about toxic relationships

### Technical Features
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS with custom brutal theme
- 🔥 Firebase (Firestore + Storage)
- 🎬 Framer Motion animations
- 📱 Fully responsive design
- ♿ Accessible components (Headless UI)
- 🔍 SEO optimized (metadata, OG images, sitemap)
- 🚀 Vercel-ready deployment

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
