import { io } from "socket.io-client";

class SocketService {
  socket = null;

  connect(token) {
    this.socket = io(`${process.env.NEXT_PUBLIC_WS_BASE_URL}/streaming`, {
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

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();