import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Section, Settings } from "@/lib/sanity/groq";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

export interface GripStateSection {
  id: string;
  section: Section;
  ref: any;
}

export interface GripState {
  settings?: Settings;
  menuOpen: boolean;
  mobileFormOpen: boolean;
  sections: GripStateSection[];

  current?: string;
  currentIndex?: number;
  setCurrentIndex: (id: number | -1) => void;
  setCurrentSection: (id: string) => void;

  setSettings: (settings: Settings) => void;
  setMenuOpen: () => void;
  setMobileFormOpen: (open: boolean) => void;

  openForm: () => void;
  updateSectionRef: (id: string, ref?: RefObject<HTMLDivElement>) => void;
  insertSection: (id: string, section: Section | null) => void;
}

export const useGripStore = create(
  devtools(
    immer<GripState>((set, get) => ({
      settings: undefined,
      menuOpen: false,
      mobileFormOpen: false,
      sections: [],
      current: null,
      currentIndex: -1,
      setSettings: (settings) => {
        set((state) => {
          state.settings = settings;
        });
      },
      setMenuOpen: () => {
        set((state) => {
          state.menuOpen = !state.menuOpen;
        });
      },
      setMobileFormOpen: (open) => {
        set((state) => {
          state.mobileFormOpen = open;
        });
      },
      setCurrentSection: (id) => {
        set((state) => {
          state.current = id;
        });
      },
      setCurrentIndex: (index) => {
        set((state) => {
          state.currentIndex = index;
        });
      },
      updateSectionRef: (id, ref) => {
        const sections = get().sections;
        const i = sections.findIndex((el) => el.id === id);
        set(({ sections }) => {
          sections[i] = { ...sections[i], ref: null };
        });
      },
      insertSection: (id, section) => {
        set(({ sections }) => {
          sections.push({ id, section: section, ref: null });
        });
      },
      openForm: () => {
        set((state) => {
          state.menuOpen = true;
          state.mobileFormOpen = true;
        });
      },
    }))
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGripStore);
}
