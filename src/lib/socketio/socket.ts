import ioClient from 'socket.io-client';

export const socket = ioClient(import.meta.env.VITE_SOCKET_SERVER_URL);
