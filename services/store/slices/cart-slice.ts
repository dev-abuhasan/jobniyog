// import { StateCreator } from "zustand";
// import { getCartItemIdentity, migratePersistedCart } from "@/services/product/utils";
// import type { CartItem } from "@/services/types/cart";

// export interface CartSlice {
//   cart: CartItem[];
//   cartOpen: boolean;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (variantId: number | string) => void;
//   updateQty: (variantId: number | string, qty: number) => void;
//   clearCart: () => void;
//   setCartOpen: (open: boolean) => void;
//   hydrateCart: (items: unknown) => void;
// }

// function variantKey(item: CartItem): string {
//   return getCartItemIdentity(item);
// }

// function clampQty(item: CartItem, qty: number): number {
//   if (qty <= 0) {
//     return 0;
//   }

//   return Math.min(item.maxQty, Math.max(item.minQty, qty));
// }

// export type CartSliceCreator<T extends object = object> = StateCreator<
//   T & CartSlice,
//   [],
//   [],
//   CartSlice
// >;

// export const createCartSlice: CartSliceCreator = (set) => ({
//   cart: [],
//   cartOpen: false,

//   addToCart: (item) =>
//     set((state) => {
//       // no-op: debug logging removed
//       const key = variantKey(item);
//       const existing = state.cart.find((c) =>
//         variantKey(c) === key || (c.variantId === item.variantId && c.handle === item.handle)
//       );
//       if (existing) {
//         return {
//           cart: state.cart.map((c) => {
//             const exactMatch = variantKey(c) === key;
//             const looseMatch = !exactMatch && c.variantId === item.variantId && c.handle === item.handle;
//             if (!exactMatch && !looseMatch) return c;
//             if (exactMatch) {
//               // Same variant, same options — only bump qty
//               return { ...c, qty: c.qty + item.qty };
//             }
//             // Loose match only (different variantOptions, e.g. stale localStorage entry).
//             // Replace with fresh item data so variant info is correct; accumulate qty.
//             return { ...item, qty: c.qty + item.qty };
//           }),
//         };
//       }
//       return { cart: [...state.cart, item] };
//     }),

//   removeFromCart: (variantId) =>
//     set((state) => ({
//       cart: state.cart.filter((c) => variantKey(c) !== String(variantId)),
//     })),

//   updateQty: (variantId, qty) =>
//     set((state) => ({
//       // updateQty debug removed
//       cart: state.cart
//         .map((c) =>
//           variantKey(c) === String(variantId) ? { ...c, qty: clampQty(c, qty) } : c
//         )
//         .filter((c) => c.qty > 0),
//     })),

//   clearCart: () => set({ cart: [] }),

//   setCartOpen: (open) => set({ cartOpen: open }),

//   hydrateCart: (items) => {
//     // hydrateCart debug removed
//     return set({ cart: migratePersistedCart(items) });
//   },
// });
