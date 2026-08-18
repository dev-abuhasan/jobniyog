import NotFoundContent from "@/components/templates/not-found-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
};

/**
 * Global 404 page (App Router `not-found.tsx`).
 *
 * Catches `notFound()` from routes outside the locale groups. The locale
 * segments have their own `(en)/not-found.tsx` and `bn/not-found.tsx` so 404s
 * there render inside the storefront chrome (header/footer) and within the same
 * layout boundary (which also avoids a cross-layout client re-render). Shared
 * visual lives in `NotFoundContent` (server component, pure-CSS motion).
 */
export default function NotFound() {
  return <NotFoundContent locale="en" />;
}
