import { create } from "zustand";

type Section = "hero" | "portfolio" | "study" | "trouble";

type SectionStore = {
    currentSection: Section;
    setCurrentSection: (section: Section) => void;
};

export const useSectionStore = create<SectionStore>(set => ({
    currentSection: "hero",
    setCurrentSection: (section) => set({ currentSection: section }),
}))