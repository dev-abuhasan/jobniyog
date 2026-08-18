// /**
//  * services/sitemap/config.ts
//  *
//  * Reads sitemap configuration from the settings table.
//  */
// import { getSettingsMapCached } from "@/services/server/settings-cache";

// export interface SitemapConfig {
//   enabled: boolean;
//   productsEnabled: boolean;
//   categoriesEnabled: boolean;
//   pagesEnabled: boolean;
//   cmsPagesEnabled: boolean;
//   imagesEnabled: boolean;
//   maxPerPage: number;
//   customRoutes: string[];
//   excludedRoutes: Set<string>;
// }

// export async function getSitemapConfig(): Promise<SitemapConfig> {
//   const map = await getSettingsMapCached();

//   const bool = (key: string, def: boolean): boolean => {
//     const v = map.get(key);
//     if (v == null) return def;
//     return v === "true" || v === "1";
//   };

//   const num = (key: string, def: number): number => {
//     const v = map.get(key);
//     const n = Number(v);
//     return Number.isFinite(n) && n > 0 ? n : def;
//   };

//   const json = <T>(key: string, def: T): T => {
//     const v = map.get(key);
//     if (!v) return def;
//     try {
//       return JSON.parse(v) as T;
//     } catch {
//       return def;
//     }
//   };

//   return {
//     enabled: bool("sitemap_enabled", true),
//     productsEnabled: bool("sitemap_products_enabled", true),
//     categoriesEnabled: bool("sitemap_categories_enabled", true),
//     pagesEnabled: bool("sitemap_pages_enabled", true),
//     cmsPagesEnabled: bool("sitemap_cms_pages_enabled", true),
//     imagesEnabled: bool("sitemap_images_enabled", true),
//     maxPerPage: num("sitemap_max_per_page", 5000),
//     customRoutes: json<string[]>("sitemap_custom_routes", []),
//     excludedRoutes: new Set<string>(json<string[]>("sitemap_excluded_routes", [])),
//   };
// }
