# Next.js EPUB Reader & AI Literature Platform Architecture

## Goal

Build a modern literature platform using Next.js 16 App Router where users can read books chapter by chapter without exposing the original EPUB file. The platform should support AI features, excellent performance, SEO, and scalability.

---

## Core Principles

- Never expose the original EPUB publicly.
- Treat EPUB as the source file only.
- Parse the EPUB once after upload.
- Store chapter data separately.
- Render one chapter per request.
- Support AI features on a per-chapter basis.
- Keep storage and frontend separated.

---

## Architecture

                        Upload EPUB
                             │
                             ▼
                   Private Object Storage
               (Cloudflare R2 / S3 / Local)
                             │
                             ▼
                  Background Parsing Service
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
     Extract Metadata                  Extract Chapters
            ▼                                 ▼
      PostgreSQL Database          Chapter HTML + Plain Text
            ▼                                 ▼
            └────────────────┬────────────────┘
                             ▼
                     Next.js App Router
                             ▼
                 Render One Chapter at a Time

---

## Storage Strategy

Never place EPUB files inside:

/public/books

Instead store them in:

- Cloudflare R2
- Amazon S3
- Google Cloud Storage
- Local private storage (development)

Database stores only:

Book
- id
- title
- author
- slug
- cover
- epub_url
- total_chapters

Chapter
- id
- book_id
- chapter_number
- title
- html
- plain_text

---

## Reading Flow

User opens:

/books/[slug]/chapter/1

↓

Next.js fetches only Chapter 1

↓

Server renders HTML

↓

Browser receives only that chapter

↓

Background prefetch loads Chapter 2

↓

User clicks Next

↓

Chapter 2 appears instantly

---

## Why Chapter-Based Rendering?

Instead of sending:

Entire Book (3MB)

Send:

Chapter 1 (20KB)
Chapter 2 (18KB)
Chapter 3 (22KB)

Benefits:

✓ Faster loading
✓ Lower bandwidth
✓ Better caching
✓ Better SEO
✓ Easier AI processing
✓ Better reading experience
✓ Original EPUB stays private

---

## AI Pipeline

Upload EPUB
↓

Extract Chapters
↓

Generate:

- Summary
- Keywords
- Character List
- Timeline
- Flashcards
- Quiz
- Difficult Words
- Embeddings

↓

Store AI output

↓

Display alongside each chapter

---

## Security

Goal:
Allow reading while making downloading significantly harder.

Do NOT:

- Put EPUB in /public
- Expose direct EPUB URLs
- Serve original XHTML files

Instead:

- Keep EPUB private
- Serve rendered HTML only
- Authenticate users if needed
- Apply rate limiting
- Optionally watermark content
- Use signed URLs if downloads are ever required

Important:

No web application can completely prevent copying once text is displayed in a browser. The objective is to discourage downloading and large-scale scraping, not to guarantee perfect protection.

---

## Next.js Routing

/books
/books/[slug]
/books/[slug]/chapter/[number]

Each chapter is its own Server Component.

---

## Future Features

✓ Reading Progress
✓ Bookmarks
✓ Highlights
✓ Notes
✓ Dark Mode
✓ Font Size
✓ Reading Time
✓ Recently Read
✓ Search Inside Book
✓ Cross-Book Search
✓ AI Chat
✓ AI Summary
✓ AI Explain Paragraph
✓ Vocabulary Builder
✓ Text-to-Speech
✓ Offline Reading (PWA)
✓ Recommendation Engine

---

## Recommended Tech Stack

Frontend
- Next.js 16
- React 19
- Tailwind CSS

Backend
- Next.js Route Handlers
- Server Actions

Database
- PostgreSQL

Storage
- Cloudflare R2 (preferred)
- Amazon S3

Parsing
- adm-zip
- unzipper
- cheerio
- fast-xml-parser

AI
- OpenAI
- Embeddings
- Vector Database (optional)

---

## Development Workflow

1. Upload EPUB.
2. Store original EPUB privately.
3. Parse EPUB once.
4. Save metadata.
5. Save chapters.
6. Generate AI data.
7. Cache chapter output.
8. Render chapters individually.
9. Prefetch the next chapter.
10. Track reading progress.

---

## Design Philosophy

The EPUB file is the source asset, not the runtime content.

The runtime application serves structured chapter data from the database, allowing fast rendering, AI integration, strong performance, scalable architecture, and keeping the original EPUB private.

This architecture is designed to support thousands of books while maintaining a smooth reading experience and providing advanced AI-powered features.