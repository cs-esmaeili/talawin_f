// services/socketService.js
import { io } from 'socket.io-client';
import config from "@/config.json";
import { getCookie } from 'cookies-next';

let socket;

export const initializeSocket = () => {
    const token = getCookie('token');
    if (!token) {
        console.error('No token available for socket connection');
        return;
    }

    socket = io(config.api, {
        query: { token }
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        initializeSocket();
    }
    return socket;
};

export const emitEvent = (eventName, data) => {
    if (socket) {
        socket.emit(eventName, data);
    } else {
        console.error('Socket connection not established');
    }
};
