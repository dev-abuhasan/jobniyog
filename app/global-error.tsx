"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Global error boundary (App Router `global-error.tsx`).
 *
 * This replaces the **root layout** when a render error reaches the top level,
 * so it must render its own `<html>` / `<body>`. It imports `globals.css` for the
 * theme tokens and restores the saved light/dark preference before paint (same
 * inline script the root layout uses) to avoid a flash. Motion is pure CSS.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Restore the saved light/dark preference (the fresh <html> this boundary
    // renders has no theme attribute yet). Done here instead of a raw inline
    // <script>, which triggers a React "script tag while rendering" warning.
    try {
      const stored = localStorage.getItem("tt-theme");
      const theme = stored === "light" || stored === "dark" ? stored : "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = theme;
    } catch {
      // ignore — non-critical theme restoration
    }
    // Surface the error for diagnostics without leaking details to the UI.
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning className="h-full w-full antialiased">
      <body className="min-h-full w-full bg-background text-foreground">
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16">
          {/* Decorative animated blobs (danger-tinted) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="animate-tt-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-danger/15 blur-3xl" />
            <span
              className="animate-tt-blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
              style={{ animationDelay: "-6s" }}
            />
          </div>

          <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
            <div className="animate-tt-fade-up">
              <span className="animate-tt-float flex h-24 w-24 items-center justify-center rounded-3xl bg-danger/10 text-danger ring-1 ring-inset ring-danger/20 sm:h-28 sm:w-28">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 8v5m0 3.5h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <h1
              className="animate-tt-fade-up mt-6 text-2xl font-bold text-foreground sm:text-3xl"
              style={{ animationDelay: "0.1s" }}
            >
              Something went wrong
            </h1>

            <p
              className="animate-tt-fade-up mt-3 max-w-md text-sm text-muted-foreground sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              An unexpected error occurred while loading this page. You can try again, or head back
              to the homepage.
            </p>

            {error?.digest ? (
              <p
                className="animate-tt-fade-up mt-2 font-mono text-xs text-muted-foreground/70"
                style={{ animationDelay: "0.25s" }}
              >
                Error ref: {error.digest}
              </p>
            ) : null}

            <div
              className="animate-tt-fade-up mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-(--radius-btn) bg-brand px-7 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 12a9 9 0 1 1-2.64-6.36M21 3v5h-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Try again
              </button>

              {/* Hard navigation (not next/link) is intentional: the React tree is in a
                  broken state, so a full document load gives the cleanest recovery. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-(--radius-btn) border border-(--accent-strong)/20 bg-surface px-7 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
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
                Back to Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
