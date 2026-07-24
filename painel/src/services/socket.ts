import { io } from "socket.io-client";


const socket = io(
    "https://flowza-production-9b03.up.railway.app",
    {
        auth:{
            token: localStorage.getItem("token")
        }
    }
);


export default socket;