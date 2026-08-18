// import type { StateCreator } from "zustand";
// import { attributesApi } from "@/services/api/web-api";

// export interface GuidelinesSlice {
//   /** HTML content keyed by attribute name (e.g. "Size" → "<div>…</div>"). */
//   guidelines: Record<string, string>;
//   /** Button/modal label keyed by attribute name (e.g. "Size" → "Bangle Size Guide"). */
//   guidelineTitles: Record<string, string>;
//   /** True once the first successful fetch has completed. Resets on page reload. */
//   guidelinesLoaded: boolean;
//   /** True while the fetch is in-flight. Guards against duplicate concurrent calls. */
//   guidelinesLoading: boolean;
//   /**
//    * Fetches all enabled attribute guidelines from the server and caches them in
//    * the store.  Safe to call from multiple components simultaneously — only the
//    * first call fires the request; subsequent calls while loading or after load
//    * are no-ops.
//    */
//   loadGuidelines: () => Promise<void>;
// }

// export function createGuidelinesSlice<T extends object>(
//   ...[set, get]: Parameters<StateCreator<T & GuidelinesSlice, [], [], GuidelinesSlice>>
// ): GuidelinesSlice {
//   return {
//     guidelines: {},
//     guidelineTitles: {},
//     guidelinesLoaded: false,
//     guidelinesLoading: false,

//     loadGuidelines: async () => {
//       const state = get() as GuidelinesSlice;
//       if (state.guidelinesLoaded || state.guidelinesLoading) return;

//       (set as (partial: Partial<GuidelinesSlice>) => void)({ guidelinesLoading: true });

//       try {
//         const data = await attributesApi.guidelines();
//         (set as (partial: Partial<GuidelinesSlice>) => void)({
//           guidelines: data.guidelines ?? {},
//           guidelineTitles: data.guidelineTitles ?? {},
//           guidelinesLoaded: true,
//           guidelinesLoading: false,
//         });
//       } catch {
//         (set as (partial: Partial<GuidelinesSlice>) => void)({ guidelinesLoading: false });
//       }
//     },
//   };
// }
