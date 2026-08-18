// /**
//  * Admin API — typed endpoint functions (CLIENT-SIDE, admin panel only).
//  *
//  * Admin auth is a separate concern from the storefront: it uses the httpOnly
//  * `admin_token` cookie, so every request is sent with `credentials: "include"`
//  * and there is NO Bearer token / refresh dance here. The React Admin
//  * `authProvider` handles session expiry (redirect to admin login) via
//  * `checkError`, so this core simply throws `ApiError` on non-2xx.
//  *
//  * This centralizes the several ad-hoc `apiFetch` helpers that were copy-pasted
//  * across admin pages (roles, analytics, locations, product import).
//  *
//  * Note: most CRUD goes through React Admin's `dataProvider`; these helpers cover
//  * the custom (non-resource) endpoints called directly by admin UI.
//  */
// import { ApiError, buildQuery, type QueryParams } from "./http-core";
// type AdminBody = BodyInit | object | null;

// export interface AdminRequestOptions extends Omit<RequestInit, "body" | "method" | "headers"> {
//   method?: string;
//   body?: AdminBody;
//   params?: QueryParams;
//   headers?: HeadersInit;
// }

// const isBodyInit = (body: unknown): body is BodyInit =>
//   typeof body === "string" ||
//   (typeof FormData !== "undefined" && body instanceof FormData) ||
//   (typeof Blob !== "undefined" && body instanceof Blob) ||
//   (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams);

// /**
//  * Core admin request — cookie-authenticated, throws `ApiError` on failure.
//  * Prefer the typed helpers below; use this directly only for one-off endpoints.
//  */
// export async function adminRequest<T = unknown>(endpoint: string, options: AdminRequestOptions = {}): Promise<T> {
//   const { method = "GET", body, params, headers: initHeaders, ...rest } = options;
//   const headers = new Headers(initHeaders);

//   let payload: BodyInit | undefined;
//   if (body != null) {
//     if (isBodyInit(body)) {
//       payload = body; // FormData/string — let the browser set the content-type
//     } else {
//       if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
//       payload = JSON.stringify(body);
//     }
//   }

//   const res = await fetch(endpoint + buildQuery(params), {
//     ...rest,
//     method,
//     credentials: "include",
//     headers,
//     body: payload,
//   });

//   if (res.status === 204) return undefined as T;

//   const text = await res.text();
//   let data: unknown = null;
//   if (text) {
//     try {
//       data = JSON.parse(text);
//     } catch {
//       data = text;
//     }
//   }

//   if (!res.ok) {
//     const message =
//       data && typeof data === "object" && "error" in data && typeof (data as Record<string, unknown>).error === "string"
//         ? (data as Record<string, string>).error
//         : res.statusText || `Request failed (${res.status})`;
//     throw new ApiError(message, res.status, data);
//   }

//   return data as T;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Auth / session
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminAuthApi = {
//   me: () => adminRequest<{ username?: string; role?: string; permissions?: string[] }>("/api/admin/auth/me"),
//   login: (identifier: string, password: string) =>
//     adminRequest<{ username?: string; role?: string; error?: string }>("/api/admin/auth/login", {
//       method: "POST",
//       body: { identifier, password },
//     }),
//   logout: () => adminRequest<{ ok?: boolean }>("/api/admin/auth/logout", { method: "POST" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Uploads (Cloudinary)
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminUploadApi = {
//   upload: (form: FormData) =>
//     adminRequest<{ url: string; publicId: string }>("/api/admin/uploads", { method: "POST", body: form }),
//   remove: (publicId: string) =>
//     adminRequest<{ ok?: boolean }>(`/api/admin/uploads/${encodeURIComponent(publicId)}`, { method: "DELETE" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Misc admin endpoints used directly by custom UI
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminMiscApi = {
//   translate: (text: string, target = "bn") =>
//     adminRequest<{ translated?: string }>("/api/admin/translate", { method: "POST", body: { text, target } }),

//   analytics: (params?: QueryParams) =>
//     adminRequest<Record<string, unknown>>("/api/admin/analytics", { params }),

//   roles: () => adminRequest<Record<string, unknown>>("/api/admin/roles"),

//   categories: () => adminRequest<Record<string, unknown>>("/api/admin/categories"),

//   createCategory: (body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>("/api/admin/categories", { method: "POST", body }),

//   /** Send a test transactional email to verify SMTP settings. */
//   testEmail: (to: string) =>
//     adminRequest<{ success?: boolean; message?: string; error?: string }>("/api/admin/test-email", {
//       method: "POST",
//       body: { to },
//     }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Dashboard
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminDashboardApi = {
//   get: <T = Record<string, unknown>>() =>
//     adminRequest<T>("/api/admin/dashboard", { cache: "no-store" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Settings (key/value store)
// // ─────────────────────────────────────────────────────────────────────────────
// export type AdminSettingRow = { key: string; value: string; system?: boolean; description?: string };

// export const adminSettingsApi = {
//   list: () => adminRequest<{ settings?: AdminSettingRow[] }>("/api/admin/settings"),
//   upsert: (key: string, value: string) =>
//     adminRequest<Record<string, unknown>>("/api/admin/settings", { method: "PATCH", body: { key, value } }),
//   remove: (key: string) =>
//     adminRequest<{ ok?: boolean }>("/api/admin/settings", { method: "DELETE", body: { key } }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Roles & permissions
// // ─────────────────────────────────────────────────────────────────────────────
// export type AdminRolePayload = { label: string; description: string; permissions: string[] };

// export const adminRoleApi = {
//   list: () => adminRequest<Record<string, unknown>>("/api/admin/roles"),
//   create: (body: AdminRolePayload) =>
//     adminRequest<Record<string, unknown>>("/api/admin/roles", { method: "POST", body }),
//   update: (id: number | string, body: AdminRolePayload) =>
//     adminRequest<Record<string, unknown>>(`/api/admin/roles/${id}`, { method: "PATCH", body }),
//   remove: (id: number | string) =>
//     adminRequest<Record<string, unknown>>(`/api/admin/roles/${id}`, { method: "DELETE" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Cache / ISR revalidation
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminRevalidateApi = {
//   /** Revalidate specific paths (token-protected `/api/revalidate`). */
//   paths: (secret: string, paths: string[]) => {
//     const form = new URLSearchParams();
//     form.set("secret", secret);
//     paths.forEach((path, index) => form.set(`paths[${index}]`, path));
//     return adminRequest<{ message?: string; error?: string }>("/api/revalidate", { method: "POST", body: form });
//   },
//   /** Revalidate the entire site cache (token-protected `/api/revalidate/all`). */
//   all: (secret: string) => {
//     const form = new URLSearchParams();
//     form.set("secret", secret);
//     return adminRequest<{ message?: string; error?: string }>("/api/revalidate/all", { method: "POST", body: form });
//   },
//   /** Admin-cookie cache invalidation (`/api/admin/cache/revalidate`). */
//   cache: (body: { invalidateSettings?: boolean; paths?: string[] }) =>
//     adminRequest<{ error?: string; revalidatedPaths?: string[] }>("/api/admin/cache/revalidate", {
//       method: "POST",
//       body,
//     }),
// };


// // ─────────────────────────────────────────────────────────────────────────────
// // Locations
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminLocationApi = {
//   list: (params?: QueryParams) => adminRequest<Record<string, unknown>>("/api/admin/locations", { params }),
//   get: (id: number | string) => adminRequest<Record<string, unknown>>(`/api/admin/locations/${id}`),
//   create: (body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>("/api/admin/locations", { method: "POST", body }),
//   update: (id: number | string, body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>(`/api/admin/locations/${id}`, { method: "PATCH", body }),
//   remove: (id: number | string) =>
//     adminRequest<Record<string, unknown>>(`/api/admin/locations/${id}`, { method: "DELETE" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Products (used by the bulk import pipeline)
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminProductApi = {
//   list: (params?: QueryParams) => adminRequest<Record<string, unknown>>("/api/admin/products", { params }),
//   create: (body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>("/api/admin/products", { method: "POST", body }),
//   update: (id: number | string, body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>(`/api/admin/products/${id}`, { method: "PATCH", body }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Cron / scheduled jobs
// // ─────────────────────────────────────────────────────────────────────────────
// export const adminCronApi = {
//   get: () => adminRequest<Record<string, unknown>>("/api/admin/cron"),
//   update: (body: Record<string, unknown>) =>
//     adminRequest<Record<string, unknown>>("/api/admin/cron", { method: "PUT", body }),
//   run: (job: string) =>
//     adminRequest<Record<string, unknown>>("/api/admin/cron/run", { method: "POST", body: { job } }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // External Product Catalog (remote JSON discovery feeds)
// // ─────────────────────────────────────────────────────────────────────────────
// export type ExternalCatalogStats = {
//   enabled: boolean;
//   configured: boolean;
//   productCount: number;
//   categoryCount: number;
//   refreshStrategy: string;
//   productUrlCount: number;
//   categoryUrlCount: number;
//   lastBuiltAt: number | null;
//   errors: string[];
//   lazyMode: boolean;
//   chunkCount: number;
//   totalHandleCount: number;
// };

// /** A compact catalog row for the admin External Catalog browse table. */
// export type ExternalCatalogRow = {
//   id: string;
//   handle: string;
//   title: string;
//   image: string | null;
//   price: number;
//   priceMax: number;
//   compareAtPrice: number | null;
//   inStock: boolean;
//   totalStock: number;
//   variantCount: number;
//   category: string | null;
//   vendor: string | null;
// };

// /** Full external product detail (storefront Product shape) for the View dialog. */
// export const adminApi = {
//   auth: adminAuthApi,
//   upload: adminUploadApi,
//   misc: adminMiscApi,
//   location: adminLocationApi,
//   product: adminProductApi,
//   cron: adminCronApi,
//   dashboard: adminDashboardApi,
//   settings: adminSettingsApi,
//   role: adminRoleApi,
//   revalidate: adminRevalidateApi,
// };
