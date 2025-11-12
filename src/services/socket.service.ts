import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";

class SocketService {
  socket = null;

  connect(token) {
    if (this.socket?.connected) return this.socket;
    
    console.log("🔌 Conectando a:", `${SOCKET_URL}/streaming`);
    
    this.socket = io(`${SOCKET_URL}/streaming`, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket conectado:", this.socket.id);
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Error de conexión:", error.message);
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