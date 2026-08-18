import { StateCreator } from "zustand";

export type Theme = "light" | "dark";

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export type ThemeSliceCreator<T extends object = object> = StateCreator<
  T & ThemeSlice,
  [],
  [],
  ThemeSlice
>;

export const createThemeSlice: ThemeSliceCreator = (set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });

    if (typeof window !== "undefined") {
      window.localStorage.setItem("tt-theme", theme);
    }
  },
  toggleTheme: () => {
    set((state: ThemeSlice) => {
      const nextTheme: Theme = state.theme === "light" ? "dark" : "light";

      if (typeof window !== "undefined") {
        window.localStorage.setItem("tt-theme", nextTheme);
      }

      return { theme: nextTheme };
    });
  },
  initializeTheme: () => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem("tt-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      set({ theme: storedTheme });
      return;
    }

    set({ theme: "light" });
    window.localStorage.setItem("tt-theme", "light");
  },
});
