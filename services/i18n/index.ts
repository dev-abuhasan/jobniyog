import { dictionaries, type Dictionary } from "@/services/i18n/dictionaries";

export type Locale = "en" | "bn";

export const locales: Locale[] = ["en", "bn"];
export const defaultLocale: Locale = "en";
export type { Dictionary } from "@/services/i18n/dictionaries";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
