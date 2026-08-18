// import "server-only";

// /**
//  * Server API — cached fetch core (SERVER-SIDE ONLY).
//  *
//  * Importing `server-only` makes the bundler throw if this module is ever pulled
//  * into a Client Component, guaranteeing the server/client split: the storefront
//  * client core (`http-core.ts`) reads the browser auth store, while this one is
//  * for Server Components / route handlers and leans on Next.js fetch caching.
//  *
//  * Key difference from the client core: GET requests are cached via
//  * `next: { revalidate }` (ISR-style) and there is no auth/refresh — server code
//  * authenticates via cookies or talks to the DB directly.
//  */
// import { ApiError, buildQuery, type QueryParams } from "./http-core";
// import { DEFAULT_REVALIDATE_SECONDS } from "../constant/constant";


// export interface ServerRequestOptions extends Omit<RequestInit, "body" | "method" | "headers"> {
//   method?: string;
//   body?: BodyInit | object | null;
//   params?: QueryParams;
//   headers?: HeadersInit;
//   /**
//    * ISR revalidation window in seconds for GET requests. Set to 0 to opt out of
//    * caching (always fresh). Ignored for non-GET methods.
//    */
//   revalidate?: number;
//   /** Next.js cache tags for on-demand revalidation. */
//   tags?: string[];
// }

// /**
//  * Server-side request with Next.js fetch caching. Throws `ApiError` on non-2xx.
//  *
//  * @example
//  *   const data = await serverRequest<Foo>("https://cdn/x.json", { revalidate: 3600 });
//  */
// export async function serverRequest<T = unknown>(endpoint: string, options: ServerRequestOptions = {}): Promise<T> {
//   const { method = "GET", body, params, headers: initHeaders, revalidate, tags, ...rest } = options;
//   const headers = new Headers(initHeaders);

//   let payload: BodyInit | undefined;
//   if (body != null) {
//     if (typeof body === "string" || body instanceof URLSearchParams) {
//       payload = body;
//     } else {
//       if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
//       payload = JSON.stringify(body);
//     }
//   }

//   const isGet = method.toUpperCase() === "GET";
//   const cacheOpt: { next?: { revalidate?: number; tags?: string[] }; cache?: RequestCache } = {};
//   if (isGet) {
//     const windowSeconds = revalidate ?? DEFAULT_REVALIDATE_SECONDS;
//     if (windowSeconds <= 0) {
//       cacheOpt.cache = "no-store";
//     } else {
//       cacheOpt.next = { revalidate: windowSeconds, ...(tags?.length ? { tags } : {}) };
//     }
//   }

//   const res = await fetch(endpoint + buildQuery(params), {
//     ...rest,
//     ...cacheOpt,
//     method,
//     headers,
//     body: payload,
//   });

//   if (res.status === 204) return undefined as T;

//   const contentType = res.headers.get("content-type") ?? "";
//   const data: unknown = contentType.includes("application/json")
//     ? await res.json().catch(() => null)
//     : await res.text().catch(() => null);

//   if (!res.ok) {
//     const message =
//       data && typeof data === "object" && "error" in data && typeof (data as Record<string, unknown>).error === "string"
//         ? (data as Record<string, string>).error
//         : res.statusText || `Request failed (${res.status})`;
//     throw new ApiError(message, res.status, data);
//   }

//   return data as T;
// }
