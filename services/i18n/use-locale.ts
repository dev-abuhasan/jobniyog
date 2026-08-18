"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/services/i18n/index";

export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname.startsWith("/bn") ? "bn" : "en";
}
