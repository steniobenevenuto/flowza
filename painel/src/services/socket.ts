import { io, Socket } from "socket.io-client";


const socket: Socket = io(
    "https://flowza-production-9b03.up.railway.app",
    {
        autoConnect: false,
    }
);


export default socket;