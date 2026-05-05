import { create } from "zustand";

interface IProjectsFilterStore {
    query: string;
    tags: string[];
    setQuery: (query: string) => void;
    setTags: (tags: string[]) => void;
    toggleTag: (tag: string) => void;
}

export const useProjectsFilterStore = create<IProjectsFilterStore>((set) => ({
    query: "",
    tags: [],
    setQuery: (query: string) => set(() => ({ query })),
    setTags: (tags: string[]) => set(() => ({ tags })),
    toggleTag: (tag: string) =>
        set((store) => ({
            tags: store.tags.includes(tag) ? store.tags.filter((t) => t !== tag) : [...store.tags, tag],
        })),
}));