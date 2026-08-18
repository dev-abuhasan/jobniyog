// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import type { PersistOptions } from "zustand/middleware";

// import { createThemeSlice, ThemeSlice } from "./slices/theme-slice";
// import { createUserSlice, UserSlice } from "./slices/user-slice";
// import { createCartSlice, CartSlice } from "./slices/cart-slice";
// import { createWishlistSlice, WishlistSlice } from "./slices/wishlist-slice";
// import { createGuestAddressSlice, GuestAddressSlice } from "./slices/guest-address-slice";
// import { createNotificationsSlice, NotificationsSlice } from "./slices/notifications-slice";
// import { createCartPricingSlice, CartPricingSlice } from "./slices/cart-pricing-slice";
// import { createGuidelinesSlice, GuidelinesSlice } from "./slices/guidelines-slice";
// import { migratePersistedCart, getProductVariant } from "@/services/product/utils";
// import type { Product } from "@/services/types/product";

// export type AppStore = ThemeSlice & UserSlice & CartSlice & WishlistSlice & GuestAddressSlice & NotificationsSlice & CartPricingSlice & GuidelinesSlice;

// export const useAppStore = create<AppStore>()(
//   persist(
//     (...a) => ({
//       ...createThemeSlice(...a),
//       ...createUserSlice(...a),
//       ...createCartSlice(...a),
//       ...createWishlistSlice(...a),
//       ...createGuestAddressSlice(...a),
//       ...createNotificationsSlice(...a),
//       ...createCartPricingSlice(...a),
//       ...createGuidelinesSlice(...a),
//     }),
//     {
//       name: "tt-store",
//       // Use direct localStorage access for persistence (no debug instrumentation)
//       storage: typeof window === "undefined" ? undefined : createJSONStorage(() => window.localStorage),
//       version: 4,
//       migrate: (persistedState) => {
//         const state = (persistedState ?? {}) as Partial<AppStore> & {
//           cart?: unknown;
//         };

//         return {
//           ...state,
//           cart: migratePersistedCart(state.cart),
//           // wishlist is now server-side only — drop any localStorage residue
//           wishlist: [],
//         } as AppStore;
//       },
//       // After the persisted state is rehydrated on the client, attempt to
//       // populate missing `externalId` values for legacy cart entries by
//       // fetching product metadata and matching variants. Runs only in the
//       // browser and is intentionally best-effort (no failures are fatal).
//       onRehydrateStorage: () => () => {
//         if (typeof window === "undefined") return;
//         // Defer to next tick so the store reference is available.
//         setTimeout(async () => {
//           try {
//             const store = useAppStore.getState();
//             const cart = store.cart ?? [];
//             const itemsToEnrich = cart.filter((c) => !c.externalId && c.handle);
//             if (itemsToEnrich.length === 0) return;

//             const handles = Array.from(new Set(itemsToEnrich.map((i) => i.handle)));
//             const productsByHandle: Record<string, unknown> = {};

//             for (const handle of handles) {
//               try {
//                 const res = await fetch(`/api/products/${encodeURIComponent(handle)}`, { method: "GET" });
//                 if (!res.ok) continue;
//                 const product = await res.json();
//                 productsByHandle[handle] = product;
//               } catch {
//                 // ignore network errors for individual products
//               }
//             }

//             // Update the cart with any discovered externalIds
//             useAppStore.setState((prev) => {
//               let changed = false;

//               type FetchedVariant = Record<string, unknown> & { externalId?: string; sku?: string; options?: Record<string, string> };
//               type FetchedProduct = { variants?: FetchedVariant[] };

//               const nextCart = prev.cart.map((c) => {
//                 if (c.externalId) return c;
//                 const prod = productsByHandle[c.handle] as FetchedProduct | undefined;
//                 if (!prod || !Array.isArray(prod.variants)) return c;

//                 let matched: FetchedVariant | undefined;

//                 // Prefer SKU match when present
//                 if (c.sku) {
//                   matched = prod.variants.find((v) => typeof v?.sku === "string" && v.sku === c.sku);
//                 }

//                 // Next try to match by variantOptions (shallow equality)
//                 if (!matched && c.variantOptions && Object.keys(c.variantOptions).length > 0) {
//                   matched = prod.variants.find((v) => {
//                     if (!v || !v.options) return false;
//                     const vopts = v.options as Record<string, string>;
//                     const keysA = Object.keys(vopts);
//                     const keysB = Object.keys(c.variantOptions);
//                     if (keysA.length !== keysB.length) return false;
//                     for (const k of keysA) {
//                       if ((vopts[k] || "") !== (c.variantOptions[k] || "")) return false;
//                     }
//                     return true;
//                   });
//                 }

//                 // Fallback: try numeric/id matching via `getProductVariant`
//                 if (!matched) {
//                   try {
//                     const candidate = getProductVariant(prod as unknown as Product, c.variantId) as unknown as FetchedVariant | undefined;
//                     if (candidate && typeof candidate.externalId === "string" && candidate.externalId) {
//                       matched = candidate;
//                     }
//                   } catch {
//                     // ignore
//                   }
//                 }

//                 if (matched && typeof matched.externalId === "string" && matched.externalId) {
//                   changed = true;
//                   return { ...c, externalId: String(matched.externalId) };
//                 }

//                 return c;
//               });

//               return changed ? { cart: nextCart } : prev;
//             });
//           } catch {
//             // Swallow any unexpected errors — this is a best-effort enhancement.
//           }
//         }, 0);
//       },
//       // Persist cart, theme, and user only — wishlist is server-side, not localStorage
//       partialize: (state) => ({
//         cart: state.cart,
//         theme: state.theme,
//         user: state.user,
//       }),
//     } as PersistOptions<AppStore, Partial<AppStore>>
//   )
// );
