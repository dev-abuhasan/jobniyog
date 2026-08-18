// import { StateCreator } from "zustand";
// import type { CartPricingSummary, CartItem } from "@/services/types/cart";
// import { estimateDeliveryFee } from "@/services/storefront/order-utils";

// /**
//  * Cart Pricing Slice
//  *
//  * Separates client-computed pricing (always available from cart items) from
//  * server-confirmed pricing (may be absent while the /api/cart/summary call is
//  * in-flight or has failed).
//  *
//  * Consumers should always read `cartLocalSummary` for price display so that
//  * the cart drawer never shows ৳0 while waiting for the API.  The server
//  * summary overrides the local one once it arrives and is used as the
//  * authoritative source for `canCheckout` / `placeOrderDisabled`.
//  */
// export interface CartPricingSlice {
//   /** Computed synchronously from Zustand cart items — always has correct subtotals. */
//   cartLocalSummary: CartPricingSummary | null;
//   /** Server-confirmed summary — null while the API is in flight or has failed. */
//   cartServerSummary: CartPricingSummary | null;
//   /** True while POST /api/cart/summary is in flight. */
//   cartPricingLoading: boolean;

//   /**
//    * Recompute the local estimate from cart items + optional delivery district.
//    * Call this before (or instead of) starting an API fetch so the UI always
//    * shows something meaningful.
//    */
//   recomputeLocalSummary: (
//     items: CartItem[],
//     district?: string,
//     locale?: string,
//   ) => void;
//   setCartServerSummary: (summary: CartPricingSummary | null) => void;
//   setCartPricingLoading: (loading: boolean) => void;
// }

// export const createCartPricingSlice: StateCreator<
//   CartPricingSlice,
//   [],
//   [],
//   CartPricingSlice
// > = (set) => ({
//   cartLocalSummary: null,
//   cartServerSummary: null,
//   cartPricingLoading: false,

//   recomputeLocalSummary: (items, district, locale = "en") => {
//     if (items.length === 0) {
//       set({ cartLocalSummary: null });
//       return;
//     }

//     const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
//     const estimate = estimateDeliveryFee(district, subtotal);
//     const total = subtotal + estimate.fee;

//     set({
//       cartLocalSummary: {
//         items: items.map((item) => ({
//           variantId: item.variantId,
//           handle: item.handle,
//           title: item.title,
//           image: item.image,
//           price: item.price,
//           qty: item.qty,
//           sku: item.sku,
//           qtyLabel: item.qtyLabel,
//           variantOptions: item.variantOptions,
//           lineTotal: item.price * item.qty,
//         })),
//         subtotal,
//         deliveryFee: estimate.fee,
//         total,
//         currency: "BDT",
//         district,
//         shippingLabel: estimate.label(locale),
//         // Local estimate never has stock issues — those come from the server
//         issues: [],
//         // canCheckout is intentionally true here; `placeOrderDisabled` in the
//         // hook gates order submission on cartServerSummary?.canCheckout instead.
//         canCheckout: true,
//       },
//     });
//   },

//   setCartServerSummary: (summary) => set({ cartServerSummary: summary }),
//   setCartPricingLoading: (loading) => set({ cartPricingLoading: loading }),
// });
