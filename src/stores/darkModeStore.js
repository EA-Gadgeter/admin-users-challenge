import { create } from "zustand";

export const useDarkModeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const { darkMode } = state;

    if (darkMode) {
      document.querySelector("body").classList.remove("dark");
      return {darkMode: false};
    }

    document.querySelector("body").classList.add("dark");
    return {darkMode: true};
  }),
}));