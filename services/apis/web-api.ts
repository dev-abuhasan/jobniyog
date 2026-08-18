// /**
//  * Storefront Web API — typed endpoint functions (CLIENT-SIDE).
//  *
//  * Every authenticated storefront network call goes through `request()` in
//  * `http-core.ts`, which handles the Bearer token + 401 auto-refresh + logout.
//  * Components and store slices should import these helpers instead of calling
//  * `fetch` directly, so request behaviour stays consistent in one place.
//  *
//  * Server components must NOT import this module — use `server-api.ts` (cached)
//  * or the DB layer.
//  */
// import { request, type QueryParams } from "./http-core";
// import type { AuthUser } from "@/services/types/auth";
// import type { Order, OrderPlacement } from "@/services/types/order";
// import type { SavedAddress, AddressFormValues, AddressMetaResponse } from "@/services/types/address";
// import type { CartPricingInputItem, CartPricingSummary } from "@/services/types/cart";
// import type { RestockNotificationItem, RestockNotificationPayload, RestockNotificationWithProduct } from "@/services/types/notification";
// import type { StorefrontItem } from "@/services/types/storefront-item";
// import type { ReviewSubmission } from "@/services/types/review";
// import type { AuthSettings, SocialProvider } from "@/services/server/site-content";
// import type { StorefrontFilters } from "@/services/storefront/storefront-query";

// // ── Shared response shapes ────────────────────────────────────────────────────
// export type AuthSession = { user: AuthUser; accessToken: string; refreshToken: string };

// export type SignupResponse =
//   | { user: AuthUser; otpRequired?: false }
//   | { otpRequired: true; method: "phone" | "email"; identifier: string; expiresIn: number; user?: undefined };

// export type OtpSendResponse = {
//   sent: boolean;
//   method?: "phone" | "email";
//   identifier?: string;
//   expiresIn?: number;
//   error?: string;
//   retryAfter?: number;
// };

// export type ForgotPasswordResponse = {
//   identifier?: string;
//   method?: "phone" | "email";
//   expiresIn?: number;
//   error?: string;
//   retryAfter?: number;
// };

// export type PaginatedItems<T> = {
//   items: T[];
//   page: number;
//   perPage: number;
//   totalItems: number;
//   totalPages: number;
//   hasNextPage: boolean;
// };

// export type WishlistSyncRow = { handle: string; variantId: string | number };

// // ─────────────────────────────────────────────────────────────────────────────
// // Auth (public — no Authorization header)
// // ─────────────────────────────────────────────────────────────────────────────
// export const authApi = {
//   login: (body: { identifier: string; password: string }) =>
//     request<AuthSession>("/api/auth/login", { method: "POST", body, auth: false }),

//   signup: (body: { name: string; phone?: string; email?: string; password: string }) =>
//     request<SignupResponse>("/api/auth/signup", { method: "POST", body, auth: false }),

//   sendOtp: (identifier: string, purpose: "signup") =>
//     request<OtpSendResponse>("/api/auth/otp/send", { method: "POST", body: { identifier, purpose }, auth: false }),

//   verifyOtp: (body: { identifier: string; otp: string; purpose: "signup" }) =>
//     request<{ user: AuthUser }>("/api/auth/otp/verify", { method: "POST", body, auth: false }),

//   forgotPassword: (identifier: string) =>
//     request<ForgotPasswordResponse>("/api/auth/forgot-password", { method: "POST", body: { identifier }, auth: false }),

//   resetPassword: (body: { identifier: string; otp: string; newPassword: string }) =>
//     request<{ user: AuthUser }>("/api/auth/reset-password", { method: "POST", body, auth: false }),

//   social: (body: { provider: string; accessToken: string }) =>
//     request<{ user: AuthUser }>("/api/auth/social", { method: "POST", body, auth: false }),

//   refresh: (refreshToken: string) =>
//     request<{ accessToken: string }>("/api/auth/refresh", { method: "POST", body: { refresh_token: refreshToken }, auth: false }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Addresses (authenticated)
// // ─────────────────────────────────────────────────────────────────────────────
// export const addressApi = {
//   list: () => request<{ addresses: SavedAddress[] }>("/api/addresses").then((d) => d.addresses ?? []),

//   create: (body: AddressFormValues) =>
//     request<SavedAddress>("/api/addresses", { method: "POST", body }),

//   update: (id: number, body: Partial<AddressFormValues>) =>
//     request<SavedAddress>(`/api/addresses/${id}`, { method: "PATCH", body }),

//   setDefault: (id: number) =>
//     request<SavedAddress>(`/api/addresses/${id}`, { method: "PATCH", body: { isDefault: true } }),

//   remove: (id: number) =>
//     request<{ ok: boolean }>(`/api/addresses/${id}`, { method: "DELETE" }),

//   meta: () => request<AddressMetaResponse>("/api/addresses/meta"),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Orders (authenticated; placement also supports guests)
// // ─────────────────────────────────────────────────────────────────────────────
// export const orderApi = {
//   list: () => request<{ orders: Order[] }>("/api/orders").then((d) => d.orders ?? []),

//   get: (id: string | number) => request<Order>(`/api/orders/${id}`),

//   /** Place an order. Authenticated users send `addressId`; guests send `guestAddress`. */
//   place: (body: OrderPlacement) => request<Order>("/api/orders", { method: "POST", body }),

//   /** Public order tracking. Auth users skip the phone check; guests must pass `phone`. */
//   track: (orderId: string, phone?: string) =>
//     request<{ order?: Order; error?: string }>("/api/orders/track", { params: { orderId, phone } }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Wishlist (authenticated)
// // ─────────────────────────────────────────────────────────────────────────────
// export const wishlistApi = {
//   sync: () => request<{ items: WishlistSyncRow[] }>("/api/wishlist", { params: { sync: 1 } }).then((d) => d.items ?? []),

//   list: (page: number, perPage = 20) =>
//     request<PaginatedItems<StorefrontItem>>("/api/wishlist", { params: { page, perPage } }),

//   add: (handle: string, variantId: number) =>
//     request<unknown>("/api/wishlist", { method: "POST", body: { handle, variantId } }),

//   remove: (variantId: number) =>
//     request<unknown>("/api/wishlist", { method: "DELETE", body: { variantId } }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Restock notifications (authenticated)
// // ─────────────────────────────────────────────────────────────────────────────
// export const notificationApi = {
//   list: () =>
//     request<{ notifications: RestockNotificationWithProduct[] }>("/api/notifications").then((d) => d.notifications ?? []),

//   create: (body: RestockNotificationPayload) =>
//     request<RestockNotificationItem>("/api/notifications", { method: "POST", body }),

//   remove: (id: number) =>
//     request<{ ok: boolean }>(`/api/notifications/${id}`, { method: "DELETE" }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Cart (public — token attached when present)
// // ─────────────────────────────────────────────────────────────────────────────
// export const cartApi = {
//   summary: (items: CartPricingInputItem[], district?: string) =>
//     request<CartPricingSummary>("/api/cart/summary", { method: "POST", body: { items, district } }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Locations (public)
// // ─────────────────────────────────────────────────────────────────────────────
// export type LocationTreeNode = {
//   label: string;
//   value: string | number;
//   children?: LocationTreeNode[];
// };

// export const locationApi = {
//   tree: () =>
//     request<{ tree: LocationTreeNode[] }>("/api/locations/tree", { auth: false }).then((d) => d.tree ?? []),

//   subareas: (upazilaId: number) =>
//     request<{ subareas: { id: number; name: string }[] }>("/api/locations/subareas", {
//       params: { upazilaId },
//       auth: false,
//     }).then((d) => d.subareas ?? []),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Public site settings (public — auth config, order channels, social providers)
// // ─────────────────────────────────────────────────────────────────────────────
// export type OrderChannelStatus = { key: string; active: boolean };

// export type PublicSettingsResponse = {
//   authSettings: AuthSettings;
//   channels: OrderChannelStatus[];
//   guestOrderingEnabled: boolean;
//   socialProviders: SocialProvider[];
// };

// export const settingsApi = {
//   public: () => request<PublicSettingsResponse>("/api/settings/public", { auth: false }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Attribute guidelines (public — size/colour guide HTML keyed by attribute name)
// // ─────────────────────────────────────────────────────────────────────────────
// export type GuidelinesResponse = {
//   guidelines: Record<string, string>;
//   guidelineTitles: Record<string, string>;
// };

// export const attributesApi = {
//   guidelines: () => request<GuidelinesResponse>("/api/attributes/guidelines", { auth: false }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Product reviews (public submission)
// // ─────────────────────────────────────────────────────────────────────────────
// export const reviewApi = {
//   submit: (handle: string, body: ReviewSubmission) =>
//     request<unknown>(`/api/products/${handle}/reviews`, { method: "POST", body, auth: false }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Contact form (public — emails the message to admin notification recipients)
// // ─────────────────────────────────────────────────────────────────────────────
// export type ContactMessagePayload = {
//   name: string;
//   email: string;
//   phone?: string;
//   subject: string;
//   message: string;
//   /** Honeypot — leave empty; bots fill it and the server drops the request. */
//   company?: string;
// };

// export const contactApi = {
//   send: (body: ContactMessagePayload) =>
//     request<{ ok: boolean; delivered?: boolean }>("/api/contact", { method: "POST", body, auth: false }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Paginated lists (public — backs the infinite-scroll product grids)
// // ─────────────────────────────────────────────────────────────────────────────
// export type ListPageResponse<T> = {
//   items?: T[];
//   data?: T[];
//   filters?: StorefrontFilters;
//   hasNextPage?: boolean;
//   totalPages?: number;
//   totalItems?: number;
// };

// export const listApi = {
//   /** Generic paginated GET used by `InfiniteScrollList` (page/perPage + filters). */
//   page: <T>(endpoint: string, params?: QueryParams) =>
//     request<ListPageResponse<T>>(endpoint, { params, auth: false }),
// };

// /** Convenience namespace mirroring the demo's grouped export. */
// export const webApi = {
//   auth: authApi,
//   address: addressApi,
//   order: orderApi,
//   wishlist: wishlistApi,
//   notification: notificationApi,
//   cart: cartApi,
//   location: locationApi,
//   settings: settingsApi,
//   attributes: attributesApi,
//   review: reviewApi,
//   contact: contactApi,
//   list: listApi,
// };

// export type { QueryParams };
// export { ApiError } from "./http-core";
