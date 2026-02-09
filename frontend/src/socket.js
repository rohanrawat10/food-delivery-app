import {io} from "socket.io-client";
import { serverUrl } from "./config";
const socketInstance = io(serverUrl,{withCredentials:true})

export default socketInstance;