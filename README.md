# Neuroocards ⚡

Transform PDFs into intelligent flashcards with AI-powered generation and spaced repetition learning.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-blue)
![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## Features

- 📄 **PDF Upload** — Drag & drop PDF upload with text extraction
- 🧠 **AI Flashcard Generation** — GPT-4o-mini generates diverse flashcard types
- 🔁 **Spaced Repetition** — SM-2 algorithm schedules optimal review times
- 📊 **Dashboard** — Track progress, streaks, and mastery stats
- 🗂️ **Deck Management** — Rename, delete, regenerate, add manual cards
- 🔍 **Search & Filter** — Search inside flashcards, filter by difficulty
- ✏️ **Inline Editing** — Edit flashcards directly from the deck view
- 📥 **PDF Export** — Download your flashcard deck as a PDF
- 🌙 **Dark Mode** — System-aware theme with manual toggle
- 🔥 **Study Streaks** — Daily streak tracking
- ⌨️ **Keyboard Navigation** — Arrow keys + Space for study mode

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI | Custom components (shadcn-inspired) |
| Animations | Framer Motion |
| Icons | Lucide React |
| ORM | Prisma 7 |
| Database | Neon DB (PostgreSQL) |
| Auth | NextAuth.js v5 |
| AI | OpenAI GPT-4o-mini |
| PDF | pdf-parse |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon DB](https://neon.tech) account (free tier works)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone & Install

```bash
git clone <repo-url>
cd smartflash-ai
npm install
```

### 2. Set up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Neon DB connection string
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."
```

### 3. Set up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Neon DB
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 5. First Login

Navigate to `/login` and enter any email + password. The app will automatically create an account for you.

## Project Structure

```
├── app/
│   ├── (dashboard)/          # Authenticated pages
│   │   ├── dashboard/        # Dashboard with stats
│   │   ├── upload/           # PDF upload page
│   │   ├── decks/            # Deck listing & details
│   │   ├── study/[id]/       # Flashcard study mode
│   │   └── layout.tsx        # Sidebar layout
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth
│   │   ├── upload-pdf/       # PDF processing
│   │   ├── generate-flashcards/  # AI generation
│   │   ├── dashboard/        # Dashboard stats
│   │   ├── decks/            # Deck CRUD
│   │   ├── flashcards/       # Flashcard CRUD
│   │   └── review-card/      # SM-2 review
│   ├── login/                # Login page
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── providers/            # Theme & Auth providers
│   └── shared/               # Shared components
├── lib/                      # Utilities
│   ├── auth.ts               # NextAuth config
│   ├── prisma.ts             # Database client
│   ├── openai.ts             # AI integration
│   ├── pdf-parser.ts         # PDF text extraction
│   ├── spaced-repetition.ts  # SM-2 algorithm
│   └── utils.ts              # Helpers
├── prisma/
│   └── schema.prisma         # Database schema
└── prisma.config.ts          # Prisma 7 config
```

## Deployment (Vercel)

1. Push to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
npx vercel deploy
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/upload-pdf` | Upload & extract PDF text |
| POST | `/api/generate-flashcards` | Generate AI flashcards |
| GET | `/api/dashboard` | Dashboard stats |
| GET/DELETE/PATCH | `/api/decks` | Deck CRUD |
| GET/POST/PATCH/DELETE | `/api/flashcards/[deckId]` | Flashcard CRUD |
| POST | `/api/review-card` | SM-2 spaced repetition review |

## License

MIT
# NeuroCards
