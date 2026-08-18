// /**
//  * services/sitemap/xml.ts
//  *
//  * XML generation utilities for sitemaps.
//  */

// export const BASE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.trendytalesbd.com";

// export function xmlEscape(s: string): string {
//   return s
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&apos;");
// }

// export interface UrlEntryOptions {
//   loc: string;
//   lastmod?: string;
//   changefreq?: string;
//   priority?: string;
//   images?: Array<{ loc: string; caption?: string }>;
//   alternates?: Array<{ hreflang: string; href: string }>;
// }

// export function buildUrlEntry(opts: UrlEntryOptions): string {
//   const { loc, lastmod, changefreq, priority, images = [], alternates = [] } =
//     opts;
//   const lines: string[] = ["  <url>"];
//   lines.push(`    <loc>${xmlEscape(loc)}</loc>`);
//   if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
//   if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
//   if (priority) lines.push(`    <priority>${priority}</priority>`);
//   for (const img of images) {
//     lines.push(`    <image:image>`);
//     lines.push(`      <image:loc>${xmlEscape(img.loc)}</image:loc>`);
//     if (img.caption)
//       lines.push(
//         `      <image:caption>${xmlEscape(img.caption)}</image:caption>`,
//       );
//     lines.push(`    </image:image>`);
//   }
//   for (const alt of alternates) {
//     lines.push(
//       `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alt.hreflang)}" href="${xmlEscape(alt.href)}"/>`,
//     );
//   }
//   lines.push(`  </url>`);
//   return lines.join("\n");
// }

// export function buildSitemapXml(
//   urlEntries: string[],
//   opts: { withImages?: boolean; withAlternates?: boolean } = {},
// ): string {
//   const ns: string[] = [`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`];
//   if (opts.withImages)
//     ns.push(`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`);
//   if (opts.withAlternates)
//     ns.push(`xmlns:xhtml="http://www.w3.org/1999/xhtml"`);
//   return [
//     `<?xml version="1.0" encoding="UTF-8"?>`,
//     `<urlset ${ns.join("\n       ")}>`,
//     ...urlEntries,
//     `</urlset>`,
//   ].join("\n");
// }

// export function buildSitemapIndexXml(
//   sitemaps: Array<{ loc: string; lastmod?: string }>,
// ): string {
//   const entries = sitemaps.map(({ loc, lastmod }) => {
//     const lines = [`  <sitemap>`, `    <loc>${xmlEscape(loc)}</loc>`];
//     if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
//     lines.push(`  </sitemap>`);
//     return lines.join("\n");
//   });
//   return [
//     `<?xml version="1.0" encoding="UTF-8"?>`,
//     `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
//     ...entries,
//     `</sitemapindex>`,
//   ].join("\n");
// }

// export function xmlResponse(xml: string, revalidateSeconds = 3600): Response {
//   return new Response(xml, {
//     headers: {
//       "Content-Type": "application/xml; charset=utf-8",
//       "Cache-Control": `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=${revalidateSeconds * 2}`,
//     },
//   });
// }
