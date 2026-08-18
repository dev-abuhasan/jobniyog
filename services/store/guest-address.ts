// import type { SavedAddress } from "@/services/types/address";

// const GUEST_ADDRESS_KEY = "tt-guest-address";

// export function saveGuestAddress(address: SavedAddress): void {
//   if (typeof window === "undefined") return;
//   try {
//     window.localStorage.setItem(GUEST_ADDRESS_KEY, JSON.stringify(address));
//   } catch (error) {
//     console.error("Failed to save guest address:", error);
//   }
// }

// export function getGuestAddress(): SavedAddress | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const stored = window.localStorage.getItem(GUEST_ADDRESS_KEY);
//     if (!stored) return null;
//     return JSON.parse(stored) as SavedAddress;
//   } catch (error) {
//     console.error("Failed to get guest address:", error);
//     return null;
//   }
// }

// export function removeGuestAddress(): void {
//   if (typeof window === "undefined") return;
//   try {
//     window.localStorage.removeItem(GUEST_ADDRESS_KEY);
//   } catch (error) {
//     console.error("Failed to remove guest address:", error);
//   }
// }
