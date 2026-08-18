// import { StateCreator } from "zustand";
// import type { SavedAddress } from "@/services/types/address";
// import { getGuestAddress, saveGuestAddress, removeGuestAddress } from "../guest-address";

// export interface GuestAddressSlice {
//   guestAddress: SavedAddress | null;
//   setGuestAddress: (address: SavedAddress | null) => void;
//   hydrateGuestAddress: () => void;
// }

// export type GuestAddressSliceCreator<T extends object = object> = StateCreator<
//   T & GuestAddressSlice,
//   [],
//   [],
//   GuestAddressSlice
// >;

// export const createGuestAddressSlice: GuestAddressSliceCreator = (set) => ({
//   guestAddress: null,

//   setGuestAddress: (address) => {
//     if (address) {
//       saveGuestAddress(address);
//     } else {
//       removeGuestAddress();
//     }
//     set({ guestAddress: address });
//   },

//   hydrateGuestAddress: () => {
//     const address = getGuestAddress();
//     set({ guestAddress: address });
//   },
// });
