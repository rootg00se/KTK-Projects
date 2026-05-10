import { createSocket } from "@/shared/api/socket";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { registerChatHandlers } from "./chat-handlerts";

interface IChatStore {
    socket: Socket | null;
    activeChatId: string | null;
    activeChatPartherName: string | null;
    isConnected: boolean;
    initSocket: (userId: string) => void;
    disconnect: () => void;
    sendMessage: (chatId: string, content: string) => void;
    joinChat: (chatId: string) => void;
    leaveChat: (chatId: string) => void;
    setActiveChat: (chatId: string | null) => void;
    setActiveChatPartherName: (name: string) => void;
    deleteMessage: (messageId: string) => void;
    editMessage: (messageId: string, content: string) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
    socket: null,
    activeChatId: null,
    isConnected: false,
    activeChatPartherName: null,
    setActiveChatPartherName: (name) => set({ activeChatPartherName: name }),
    setActiveChat: (chatId) => {
        const resolved = chatId ?? null;
        set({
            activeChatId: resolved,
            ...(resolved === null ? { activeChatPartherName: null } : {}),
        });
    },
    initSocket: (userId) => {
        if (get().socket?.connected) return;

        const socket = createSocket(userId);

        socket.on("connect", () => set({ isConnected: true }));
        socket.on("disconnect", () => set({ isConnected: false }));

        registerChatHandlers(socket);

        set({ socket });
    },
    disconnect: () => {
        const { socket } = get();

        if (socket) {
            socket.disconnect();
            set({ socket: null, isConnected: false });
        }
    },
    sendMessage: (chatId, content) => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.emit("sendMessage", { chatId, content });
        }
    },
    joinChat: (chatId) => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.emit("joinChat", { chatId });
        }
    },
    leaveChat: (chatId) => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.emit("leaveChat", { chatId });
        }
    },
    deleteMessage: (messageId) => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.emit("deleteMessage", { messageId });
        }
    },
    editMessage: (messageId, content) => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.emit("editMessage", { messageId, content });
        }
    },
}));
