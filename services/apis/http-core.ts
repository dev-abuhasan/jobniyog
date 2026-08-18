// /**
//  * Storefront API client — request core (CLIENT-SIDE).
//  *
//  * Single source of truth for authenticated storefront requests. It:
//  *  1. Injects `Authorization: Bearer <accessToken>` from the Zustand user store.
//  *  2. On a `401`, transparently refreshes the access token via
//  *     `POST /api/auth/refresh` (single-flight), retries the request once, and on
//  *     repeated failure clears the session (logout) + shows a toast.
//  *  3. Serializes JSON / FormData bodies, builds query strings, and parses typed
//  *     responses, throwing `ApiError` on non-2xx.
//  *
//  * Do NOT import this from server components — it reads the browser store. Server
//  * code must use `services/api/server-api.ts` (cached, no auth) or hit the DB
//  * directly.
//  *
//  * Typed endpoint functions live in `web-api.ts`; components call those, never
//  * `request()` directly with stringly-typed shapes.
//  */
// import { useAppStore } from "@/services/store";
// import { DEFAULT_REVALIDATE_SECONDS } from "../constant/constant";

// export class ApiError extends Error {
//   readonly status: number;
//   readonly data: unknown;

//   constructor(message: string, status: number, data?: unknown) {
//     super(message);
//     this.name = "ApiError";
//     this.status = status;
//     this.data = data;
//   }
// }

// export type QueryValue = string | number | boolean | null | undefined;
// export type QueryParams = Record<string, QueryValue | QueryValue[]>;

// /** Builds a `?a=1&b=2` string, skipping null/undefined and expanding arrays. */
// export function buildQuery(params?: QueryParams): string {
//   if (!params) return "";
//   const sp = new URLSearchParams();
//   for (const [key, value] of Object.entries(params)) {
//     if (value == null) continue;
//     if (Array.isArray(value)) {
//       for (const item of value) if (item != null) sp.append(key, String(item));
//     } else {
//       sp.append(key, String(value));
//     }
//   }
//   const qs = sp.toString();
//   return qs ? `?${qs}` : "";
// }

// // ── Single-flight token refresh ───────────────────────────────────────────────
// let refreshPromise: Promise<string | null> | null = null;

// async function refreshAccessToken(): Promise<string | null> {
//   if (refreshPromise) return refreshPromise;

//   const refreshToken = useAppStore.getState().user?.refreshToken;
//   if (!refreshToken) return null;

//   refreshPromise = (async () => {
//     try {
//       const res = await fetch("/api/auth/refresh", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//       });
//       if (!res.ok) return null;
//       const data = (await res.json()) as { accessToken?: string };
//       if (!data.accessToken) return null;
//       useAppStore.getState().setAccessToken(data.accessToken);
//       return data.accessToken;
//     } catch {
//       return null;
//     } finally {
//       refreshPromise = null;
//     }
//   })();

//   return refreshPromise;
// }

// /** Clears the session once and notifies the user. */
// function forceLogout(): void {
//   const store = useAppStore.getState();
//   if (!store.user) return;
//   store.clearUser();
//   try {
//     // toast.error("Your session has expired. Please sign in again.");
//   } catch {
//     // toast is best-effort — never block logout on a UI failure
//   }
// }

// type RequestBody = BodyInit | object | null;

// export interface RequestOptions extends Omit<RequestInit, "body" | "method" | "headers"> {
//   method?: string;
//   body?: RequestBody;
//   params?: QueryParams;
//   headers?: HeadersInit;
//   /**
//    * When false, no Authorization header is attached and 401s are NOT treated as
//    * an expired session (no refresh, no logout). Use for public endpoints.
//    * Defaults to true.
//    */
//   auth?: boolean;
// }

// const isBodyInit = (body: unknown): body is BodyInit =>
//   typeof body === "string" ||
//   (typeof FormData !== "undefined" && body instanceof FormData) ||
//   (typeof Blob !== "undefined" && body instanceof Blob) ||
//   (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) ||
//   (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams);

// /** Normalizes a body into a fetch-compatible value, setting JSON content-type for objects. */
// function prepareBody(body: RequestBody | undefined, headers: Headers): BodyInit | undefined {
//   if (body == null) return undefined;
//   if (isBodyInit(body)) return body;
//   if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
//   return JSON.stringify(body);
// }

// async function parseResponse<T>(res: Response): Promise<T> {
//   if (res.status === 204) return undefined as T;

//   const contentType = res.headers.get("content-type") ?? "";
//   let data: unknown = null;
//   if (contentType.includes("application/json")) {
//     data = await res.json().catch(() => null);
//   } else if (contentType.includes("application/pdf") || contentType.includes("octet-stream")) {
//     data = await res.blob().catch(() => null);
//   } else {
//     data = await res.text().catch(() => null);
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

// /**
//  * Core storefront request. Prefer the typed helpers in `web-api.ts`.
//  *
//  * @throws {ApiError} on any non-2xx response (after a possible refresh+retry).
//  */
// export async function request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
//   const { method = "GET", body, params, auth = true, headers: initHeaders, ...rest } = options;
//   const url = endpoint + buildQuery(params);

//   const exec = (token: string | undefined): Promise<Response> => {
//     const headers = new Headers(initHeaders);
//     if (auth && token) headers.set("Authorization", `Bearer ${token}`);
//     const payload = prepareBody(body, headers);
//     return fetch(url, {
//       ...rest,
//       method,
//       headers,
//       body: payload,
//       next: {
//         revalidate: DEFAULT_REVALIDATE_SECONDS
//       }
//     });
//   };

//   const token = auth ? useAppStore.getState().user?.accessToken : undefined;
//   let res = await exec(token);

//   if (res.status === 401 && auth) {
//     const newToken = await refreshAccessToken();
//     if (!newToken) {
//       forceLogout();
//     } else {
//       res = await exec(newToken);
//       if (res.status === 401) forceLogout();
//     }
//   }

//   return parseResponse<T>(res);
// }

// /**
//  * Lower-level escape hatch returning the raw `Response` (with auth + refresh),
//  * for callers that need headers/streaming. Most code should use `request<T>()`.
//  */
// export async function authFetch(input: string, init?: RequestInit): Promise<Response> {
//   const { method, body, headers, ...rest } = init ?? {};
//   const exec = (token: string | undefined): Promise<Response> => {
//     const h = new Headers(headers);
//     if (token) h.set("Authorization", `Bearer ${token}`);
//     return fetch(input, { ...rest, method, headers: h, body: body as BodyInit | null | undefined });
//   };

//   const token = useAppStore.getState().user?.accessToken;
//   let res = await exec(token);
//   if (res.status === 401) {
//     const newToken = await refreshAccessToken();
//     if (!newToken) {
//       forceLogout();
//     } else {
//       res = await exec(newToken);
//       if (res.status === 401) forceLogout();
//     }
//   }
//   return res;
// }
