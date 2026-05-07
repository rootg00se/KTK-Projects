import { io } from "socket.io-client";

export const createSocket = (userId: string) => {
    return io('http://localhost:3001', {
        query: { userId },
        transports: ["websocket"],
    });
};
