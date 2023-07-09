import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// 标记状态
export interface ReadingState {
  readingRss?: string;
}

export interface RssStat {
  isReaded?: boolean;
  firstReadAt?: number;
  lastReadAt?: number;
}

export interface RssMeta {
  tags: string[];
  likes: number;
}

export interface Rss {
  uuid: string;
  title: string;
  link: string;
  description: string;
  insertAt: number;
  stat?: RssStat;
  meta?: RssMeta;
}

interface RssStore {
  entities: { [identifier: string]: Rss };

  state: ReadingState;

  updateState: (updater: (state: ReadingState) => void) => void;

  insert: (item: Rss) => void;

  remove: (item: Rss) => void;
}

export const useRssStore = create<RssStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        entities: {},
        state: {} as ReadingState,

        // actions
        updateState: (updater) =>
          set((state) => {
            const newState = { ...state };
            updater(newState);
            return newState;
          }),

        insert: (item) =>
          set((state) => ({
            entities: { ...state.entities, [item.uuid]: item },
          })),

        remove: (item) =>
          set((state) => ({
            entities: { ...state.entities, [item.uuid]: null },
          })),
      })),
      { name: "rss", version: 1 }
    )
  )
);
