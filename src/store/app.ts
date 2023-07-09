import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface AppData {
  title: string;
  theme: Theme;
}

export enum Theme {
  Auto = "auto",
  Light = "light",
  Dark = "dark",
}

const DEFAULT_APP_DATA: AppData = {
  title: "Rss Reader",
  theme: Theme.Auto,
};

interface AppStore {
  data: AppData;

  resetConfig(): void;

  updateAppConfig: (updater: (config: AppData) => void) => void;
}

const LOCAL_KEY = "app-store";

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set, _) => ({
        data: { ...DEFAULT_APP_DATA },

        resetConfig: () =>
          set({
            data: DEFAULT_APP_DATA,
          }),

        updateAppConfig: (updater) =>
          set((state) => {
            const data = { ...state.data };
            updater(data);
            return { data: data };
          }),

        // end
      })),
      { name: LOCAL_KEY, version: 1 }
    )
  )
);
