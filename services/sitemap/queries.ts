// /**
//  * services/sitemap/queries.ts
//  *
//  * DB queries specifically for sitemap generation.
//  */
// import { db } from "@/services/db/client";
// import { products } from "@/services/db/schema";
// import { and, asc, eq, sql } from "drizzle-orm";

// export interface SitemapProductRow {
//   handle: string;
//   updatedAt: Date;
//   title: string;
//   images: Array<{ src: string; alt?: string }>;
// }

// function parseImages(raw: unknown): Array<{ src: string; alt?: string }> {
//   if (!Array.isArray(raw)) return [];
//   return (raw as unknown[]).filter(
//     (img): img is { src: string; alt?: string } =>
//       typeof (img as { src?: unknown }).src === "string",
//   );
// }

// /** Returns total count of active published products. */
// export async function getActiveProductCount(): Promise<number> {
//   const [row] = await db
//     .select({ count: sql<number>`cast(count(*) as int)` })
//     .from(products)
//     .where(and(eq(products.published, true), eq(products.status, "active")));
//   return Number(row?.count ?? 0);
// }

// /**
//  * Returns the set of active published product handles. Used to de-duplicate the
//  * external-catalog sitemap so a product migrated into the database is not listed
//  * twice (the database copy wins; the URL is identical so indexing is unaffected).
//  */
// export async function getActiveProductHandleSet(): Promise<Set<string>> {
//   const rows = await db
//     .select({ handle: products.handle })
//     .from(products)
//     .where(and(eq(products.published, true), eq(products.status, "active")));
//   return new Set(rows.map((r) => r.handle));
// }

// /**
//  * Returns a page of active published products for sitemap generation.
//  * @param page 1-indexed page number
//  * @param perPage number of products per page
//  */
// export async function getProductsForSitemap(
//   page: number,
//   perPage: number,
// ): Promise<SitemapProductRow[]> {
//   const safePage = Math.max(1, page);
//   const safePerPage = Math.max(1, Math.min(10000, perPage));
//   const offset = (safePage - 1) * safePerPage;

//   const rows = await db
//     .select({
//       handle: products.handle,
//       updatedAt: products.updatedAt,
//       title: products.title,
//       images: products.images,
//     })
//     .from(products)
//     .where(and(eq(products.published, true), eq(products.status, "active")))
//     .orderBy(asc(products.id))
//     .limit(safePerPage)
//     .offset(offset);

//   return rows.map((r) => ({
//     handle: r.handle,
//     updatedAt: r.updatedAt,
//     title: r.title,
//     images: parseImages(r.images),
//   }));
// }
