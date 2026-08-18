// import { StateCreator } from "zustand";
// import type { AppStore } from "@/services/store";
// import { wishlistApi } from "@/services/api/web-api";

// export interface WishlistItem {
//   handle: string;
//   variantId: number;
// }

// export interface WishlistSlice {
//   wishlist: WishlistItem[];
//   /** Toggle a variant in/out of the server-side wishlist. Opens auth modal if not logged in. */
//   toggleWishlist: (item: WishlistItem) => Promise<void>;
//   isWishlisted: (item: WishlistItem) => boolean;
//   /** Fetch wishlist from server and sync local state. No-op if not logged in. */
//   loadWishlist: () => Promise<void>;
//   /** Clear all wishlist state (called on logout). */
//   clearWishlist: () => void;
//   /** @deprecated No-op: wishlist is server-side only. */
//   hydrateWishlist: (items: unknown) => void;
// }

// export type WishlistSliceCreator<T extends object = object> = StateCreator<
//   T & WishlistSlice,
//   [],
//   [],
//   WishlistSlice
// >;

// export const createWishlistSlice: WishlistSliceCreator = (set, get) => ({
//   wishlist: [],

//   toggleWishlist: async (item) => {
//     const store = get() as unknown as AppStore;
//     const user = store.user;

//     // Not authenticated — open login modal, do not save locally
//     if (!user) {
//       store.setAuthModalOpen(true);
//       return;
//     }

//     const variantId = Number(item.variantId);
//     if (!Number.isFinite(variantId)) return;

//     const exists = get().wishlist.some((e) => e.handle === item.handle && e.variantId === variantId);
//     const previous = get().wishlist;

//     // Optimistic update
//     if (exists) {
//       set({ wishlist: get().wishlist.filter((e) => !(e.handle === item.handle && e.variantId === variantId)) });
//     } else {
//       set({ wishlist: [...get().wishlist, { handle: item.handle, variantId }] });
//     }

//     try {
//       if (exists) {
//         await wishlistApi.remove(variantId);
//       } else {
//         await wishlistApi.add(item.handle, variantId);
//       }
//     } catch (err) {
//       // Rollback optimistic update
//       set({ wishlist: previous });
//       console.error("Wishlist toggle failed:", err);
//     }
//   },

//   isWishlisted: (item) => {
//     const vid = Number(item.variantId);
//     return Number.isFinite(vid) && get().wishlist.some((e) => e.handle === item.handle && e.variantId === vid);
//   },

//   loadWishlist: async () => {
//     const store = get() as unknown as AppStore;
//     const user = store.user;
//     if (!user) {
//       set({ wishlist: [] });
//       return;
//     }
//     try {
//       const items = await wishlistApi.sync();
//       set({
//         wishlist: items
//           .map((r) => ({ handle: r.handle, variantId: Number(r.variantId) }))
//           .filter((r) => Number.isFinite(r.variantId)),
//       });
//     } catch (err) {
//       console.error("loadWishlist failed:", err);
//     }
//   },

//   clearWishlist: () => set({ wishlist: [] }),

//   // No-op: wishlist is now server-side only, loaded via loadWishlist()
//   hydrateWishlist: () => undefined,
// });

