import { io } from "socket.io-client";

export const createSocket = (userId: string) => {
    return io(import.meta.env.VITE_API_BASE_URL, {
        query: { userId },
        transports: ["websocket"],
    });
};
