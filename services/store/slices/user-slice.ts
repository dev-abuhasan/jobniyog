// import { StateCreator } from "zustand";
// import type { AuthUser } from "@/services/types/auth";
// import { getGuestAddress, removeGuestAddress } from "@/services/store/guest-address";
// import type { AddressFormValues } from "@/services/types/address";
// import { addressApi } from "@/services/api/web-api";

// export interface UserSlice {
//   user: AuthUser | null;
//   authModalOpen: boolean;
//   setUser: (user: AuthUser) => void;
//   /** Patch only the access token (used after a silent token refresh). No side effects. */
//   setAccessToken: (accessToken: string) => void;
//   clearUser: () => void;
//   setAuthModalOpen: (open: boolean) => void;
// }

// export type UserSliceCreator<T extends object = object> = StateCreator<
//   T & UserSlice,
//   [],
//   [],
//   UserSlice
// >;

// export const createUserSlice: UserSliceCreator = (set) => ({
//   user: null,
//   authModalOpen: false,
//   setUser: (user) => {
//     set({ user });

//     // Migrate any guest-saved address to the authenticated user's saved addresses.
//     (async () => {
//       try {
//         const guest = getGuestAddress();
//         if (!guest) return;

//         const payload: AddressFormValues = {
//           label: guest.label,
//           recipientName: guest.recipientName,
//           phone: guest.phone,
//           locationId: guest.locationId,
//           addressLine: guest.addressLine,
//           instructions: guest.instructions ?? "",
//           isDefault: guest.isDefault ?? false,
//         };

//         await addressApi.create(payload);
//         // Remove local guest address after successful migration
//         removeGuestAddress();
//         // clear in-memory guestAddress slice
//         // @ts-expect-error - partial set across slices
//         set({ guestAddress: null });
//       } catch (err) {
//         // Migration failure should not block login; log for debugging
//         console.error("Failed to migrate guest address:", err);
//       }
//     })();

//     // Migrate guest wishlist (if any) into the authenticated user's wishlist
//     // Guest wishlist migration removed: guests keep wishlist locally.
//   },
//   setAccessToken: (accessToken) =>
//     set((state) => (state.user ? { user: { ...state.user, accessToken } } : {})),
//   clearUser: () => {
//     set({ user: null });
//     // @ts-expect-error - wishlist is on WishlistSlice; cleared here on logout
//     set({ wishlist: [] });
//     // @ts-expect-error - notifications is on NotificationsSlice; cleared here on logout
//     set({ notifications: [], notificationsFetched: false, notificationsFetching: false });
//   },
//   setAuthModalOpen: (open) => set({ authModalOpen: open }),
// });
