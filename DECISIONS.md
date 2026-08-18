# Decisions & Architecture Rationale (DECISIONS.md)

---

### 1. Ingestion Strategy Rationale

**Chosen Strategy**: Direct in-memory buffer text extraction via `pdf-parse` combined with single-pass LLM semantic parsing (Google Gemini / OpenAI) and SQLite/PostgreSQL persistence.

**Rejected Alternative**: Multi-stage chunking with vector database embeddings (e.g., Pinecone/pgvector RAG pipeline).

**Why**:
- **Global Context & Quality**: For standard student study materials (10–50 page PDFs, lecture slides, articles), single-pass LLM window context allows the AI to synthesize global relationships, cross-concept definitions, and high-yield Q&A pairs. Chunk-based RAG frequently breaks definitions across chunk boundaries and produces redundant or fragmented flashcards.
- **Low Latency & Simplicity**: Eliminates external vector database dependencies, embedding generation overhead, and complex query orchestration, delivering generated decks in under 3 seconds.

---

### 2. Time-Limit Trade-off & Future Work

**Trade-off Made**: Synchronous text processing with text truncation (up to 50,000 characters) per upload request instead of an asynchronous background job queue.

**With a Real Week**:
- **Async Queue & SSE Streaming**: Migrate PDF ingestion to an asynchronous job queue (e.g., BullMQ + Redis) with Server-Sent Events (SSE) for real-time progress tracking on large documents (100+ pages).
- **OCR Support**: Integrate Tesseract OCR / AWS Textract for scanned handwritten notes and image-based slides.
- **Bounding Box PDF Linking**: Store precise bounding box coordinates for each flashcard to highlight exact PDF regions in the split-screen viewer.

---

### 3. AI Tool Usage & Manual Verification

**Where AI Tools Were Used**:
- Structuring initial UI component layouts and Framer Motion animation presets.
- Crafting system prompts for structured JSON flashcard generation schemas.

**Personal Verification & Changes Made Afterward**:
- **Design & UX Polish**: Fine-tuned glassmorphic backdrop blurs, HSL color tokens (`--chart-1` through `--chart-5`), layout grid breakpoints (`grid-cols-1 md:grid-cols-3`), and responsive typography for high visual impact.
- **Interactive Simulator Logic**: Rewrote interactive state logic in `LandingPage` (`app/page.tsx`) to handle smooth 3D card flips (`rotateY(180deg)`), rating feedback triggers (`Hard`, `Good`, `Easy`), and sample card switching without React hydration warnings.
- **Route & Build Safeguards**: Verified TypeScript types, Next.js 16 App Router constraints, and ensured zero breaking changes to existing auth (`/login`) and dashboard routes.
