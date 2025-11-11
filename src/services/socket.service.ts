import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_WS_BASE_URL?.trim() ||
  (typeof window !== "undefined" && window.location.origin) ||
  "https://livetech-ventas.up.railway.app";

class SocketService {
  socket = null;

  connect(token) {
    if (this.socket) return this.socket;
    this.socket = io(`${SOCKET_URL}/streaming`, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: { token },
    });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const socketService = new SocketService();
export default socketService;