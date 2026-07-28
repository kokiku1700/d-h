import { create } from "zustand";

export type Theme = "dark" | "light";

type ThemeStore = {
    currentTheme: Theme;
    setCurrentTheme: (mode: Theme) => void;
};

export const useThemeStore = create<ThemeStore>(set => ({
    currentTheme: "light",
    setCurrentTheme: theme => set({ currentTheme: theme })
}));