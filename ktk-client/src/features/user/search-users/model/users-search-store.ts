import { create } from "zustand";

interface IUsersSearchStore {
    nicknameQuery: string;
    setNicknameQuery: (query: string) => void;
}

export const useUsersSearchStore = create<IUsersSearchStore>((set) => ({
    nicknameQuery: "",
    setNicknameQuery: (query: string) => set(() => ({ nicknameQuery: query })),
}));
