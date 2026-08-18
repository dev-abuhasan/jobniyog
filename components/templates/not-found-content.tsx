import Link from "next/link";
import type { Locale } from "@/services/i18n";
import { PATHS, localePath } from "@/services/constants/paths";

type Props = {
  locale?: Locale;
};

const COPY = {
  en: {
    heading: "Oops! This page wandered off",
    body: "The page you’re looking for doesn’t exist, may have moved, or the link is broken. Let’s get you back to the good stuff.",
    home: "Back to Home",
    search: "Search products",
  },
  bn: {
    heading: "ওহো! এই পেজটি খুঁজে পাওয়া যাচ্ছে না",
    body: "আপনি যে পেজটি খুঁজছেন সেটি নেই, সরে গেছে, অথবা লিংকটি ভাঙা। চলুন আপনাকে আবার সঠিক জায়গায় ফিরিয়ে নিয়ে যাই।",
    home: "হোমে ফিরে যান",
    search: "পণ্য খুঁজুন",
  },
} as const;

/**
 * Shared 404 visual used by the root `not-found.tsx` and the locale route-group
 * boundaries (`(en)/not-found.tsx`, `bn/not-found.tsx`). Server component — all
 * motion is pure CSS (`tt-*` keyframes in globals.css) and respects
 * `prefers-reduced-motion`.
 */
export default function NotFoundContent({ locale = "en" }: Props) {
  const t = COPY[locale === "bn" ? "bn" : "en"];

  return (
    <main className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden px-4 py-16">
      {/* Decorative animated brand blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-tt-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <span
          className="animate-tt-blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-strong/15 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <span
          className="animate-tt-blob absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        {/* Animated 404 mark */}
        <div className="animate-tt-fade-up">
          <p
            className="animate-tt-float select-none bg-linear-to-br from-brand to-accent-strong bg-clip-text text-[6rem] font-extrabold leading-none tracking-tight text-transparent sm:text-[9rem]"
            aria-hidden="true"
          >
            404
          </p>
        </div>

        <h1
          className="animate-tt-fade-up mt-2 text-2xl font-bold text-foreground sm:text-3xl"
          style={{ animationDelay: "0.1s" }}
        >
          {t.heading}
        </h1>

        <p
          className="animate-tt-fade-up mt-3 max-w-md text-sm text-muted-foreground sm:text-base"
          style={{ animationDelay: "0.2s" }}
        >
          {t.body}
        </p>

        <div
          className="animate-tt-fade-up mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href={localePath(PATHS.HOME, locale)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-(--radius-btn) bg-brand px-7 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t.home}
          </Link>

          <Link
            href={localePath(PATHS.SEARCH, locale)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-(--radius-btn) border border-(--accent-strong)/20 bg-surface px-7 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.4-3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {t.search}
          </Link>
        </div>
      </div>
    </main>
  );
}
