import ioClient from "socket.io-client"
const ENDPOINT = "http://localhost:3000"



export const socket = ioClient(import.meta.env.VITE_SOCKET_SERVER_URL)