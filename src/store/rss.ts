import create from "solid-zustand";
import { persist, devtools } from "zustand/middleware";

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

  remove: (uuid: string) => void;
}

export const useRssStore = create<RssStore>()(
  devtools(
    persist(
      (set, get) => ({
        entities: {},
        state: {} as ReadingState,

        // actions
        updateState: (updater) => {
          const newState = { ...get().state };
          updater(newState);
          set({ state: newState });
        },

        insert: (item) =>
          set((store) => ({
            entities: { ...store.entities, [item.uuid]: item },
          })),

        remove: (uuid) => {
          const newEntities = { ...get().entities };
          delete newEntities[uuid];
          set({ entities: newEntities });
        },
      }),
      { name: "rss", version: 1 }
    )
  )
);
