import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "../const";

export const useDarkModeStore = create(persist(
  (set) => ({
    darkMode: false,
    toggleDarkMode: (newValue) => set(() => {
      if (!newValue) {
        document.querySelector("body").classList.remove("dark");
        return {darkMode: newValue};
      }

      document.querySelector("body").classList.add("dark");
      return {darkMode: newValue};
    }),
  }),

  {
    name: STORAGE_KEYS.DARK_MODE
  }
));