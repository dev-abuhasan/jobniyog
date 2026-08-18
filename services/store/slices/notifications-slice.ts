// import { StateCreator } from "zustand";
// import type { RestockNotificationItem } from "@/services/types/notification";
// import { notificationApi } from "@/services/api/web-api";

// export interface NotificationsSlice {
//   notifications: RestockNotificationItem[];
//   /** true once the initial GET /api/notifications has completed (success or failure) */
//   notificationsFetched: boolean;
//   /** true while the fetch is in flight — prevents duplicate requests */
//   notificationsFetching: boolean;
//   /** Fetch all notifications for the logged-in user once and cache in state */
//   fetchNotifications: () => Promise<void>;
//   addNotification: (item: RestockNotificationItem) => void;
//   removeNotification: (id: number) => void;
//   clearNotifications: () => void;
// }

// export const createNotificationsSlice: StateCreator<NotificationsSlice, [], [], NotificationsSlice> = (set, get) => ({
//   notifications: [],
//   notificationsFetched: false,
//   notificationsFetching: false,

//   fetchNotifications: async () => {
//     const { notificationsFetched, notificationsFetching } = get();
//     // Idempotent — only one real fetch per session
//     if (notificationsFetched || notificationsFetching) return;

//     set({ notificationsFetching: true });

//     try {
//       const notifications = await notificationApi.list();
//       set({
//         notifications,
//         notificationsFetched: true,
//         notificationsFetching: false,
//       });
//     } catch {
//       set({ notificationsFetched: true, notificationsFetching: false });
//     }
//   },

//   addNotification: (item) =>
//     set((state) => ({ notifications: [...state.notifications, item] })),

//   removeNotification: (id) =>
//     set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),

//   clearNotifications: () =>
//     set({ notifications: [], notificationsFetched: false, notificationsFetching: false }),
// });
