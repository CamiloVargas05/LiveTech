"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SimplePeer from "simple-peer";
import socketService from "@/services/socket.service";
import { apiPost } from "@/lib/api";
import { Send, XCircle, MessageSquare, Video, UserCheck, Loader2, Check, CheckCheck } from "lucide-react";

export default function MantenimientoPage({ params }) {
  const [id, setId] = useState(null);
  const [usuarioConectado, setUsuarioConectado] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [finalizando, setFinalizando] = useState(false);
  const [iniciando, setIniciando] = useState(true);

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);

  const token = useMemo(() => {
    if (typeof window !== "undefined") return localStorage.getItem("token") || "";
    return "";
  }, []);

  const usuarioEmail = useMemo(() => {
    if (typeof window !== "undefined") return localStorage.getItem("email") || "tecnico";
    return "tecnico";
  }, []);

  useEffect(() => {
    if (typeof params?.then === "function") {
      params.then((resolved) => setId(resolved.id));
    } else if (params?.id) {
      setId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const socket = socketService.connect(token);
    socketRef.current = socket;

    socket.on("usuario-conectado", () => {
      setUsuarioConectado(true);
      iniciarWebRTC();
    });

    socket.on("usuario-desconectado", () => {
      setUsuarioConectado(false);
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      if (peerRef.current) await peerRef.current.signal(answer);
    });

    socket.on("webrtc-ice-candidate", ({ candidate }) => {
      if (peerRef.current) peerRef.current.signal(candidate);
    });

    socket.on("chat-mensaje", (mensaje) => {
      if (mensaje.usuarioEmail === usuarioEmail) {
        setMensajes((prev) =>
          prev.map((m) => (m.timestamp === mensaje.timestamp ? { ...m, entregado: true } : m))
        );
      } else {
        setMensajes((prev) => [...prev, { ...mensaje, entregado: true }]);
      }
    });

    socket.on("disconnect", () => {
      socket.emit("tecnico-desconectado", { mantenimientoId: id });
    });

    (async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = media;
        if (videoRef.current) videoRef.current.srcObject = media;
        setIniciando(false);
        socket.emit("iniciar-stream", { mantenimientoId: id });
      } catch {
        setIniciando(false);
      }
    })();

    return () => {
      socket.emit("tecnico-desconectado", { mantenimientoId: id });
      finalizarLocal();
      socketService.disconnect();
    };
  }, [id, token, usuarioEmail]);

  const iniciarWebRTC = () => {
    const media = streamRef.current;
    const peer = new SimplePeer({
      initiator: true,
      trickle: true,
      stream: media,
      config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
    });

    peer.on("signal", (data) => {
      if (data.type === "offer")
        socketRef.current?.emit("webrtc-offer", { mantenimientoId: id, offer: data });
      else if (data.candidate)
        socketRef.current?.emit("webrtc-ice-candidate", { mantenimientoId: id, candidate: data });
    });

    peerRef.current = peer;
  };

  const enviarMensaje = () => {
    if (!input.trim()) return;
    const nuevoMensaje = {
      mantenimientoId: id,
      mensaje: input.trim(),
      usuarioNombre: "Tú",
      usuarioEmail,
      yo: true,
      entregado: false,
      timestamp: Date.now(),
    };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    socketRef.current?.emit("chat-mensaje", nuevoMensaje);
    setInput("");
  };

  const finalizarLocal = () => {
    socketRef.current?.emit("finalizar-stream", { mantenimientoId: id });
    peerRef.current?.destroy();
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const finalizar = async () => {
    setFinalizando(true);
    try {
      finalizarLocal();
      await apiPost(`/mantenimiento/${id}/finalizar`);
    } finally {
      setFinalizando(false);
    }
  };

  if (!id)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center p-2 lg:p-6">
      <motion.div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div className="lg:col-span-3 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex justify-between px-6 py-3 border-b border-gray-800">
            <div className="flex items-center gap-2 text-green-400 text-lg font-semibold">
              <Video className="w-6 h-6" />
              <span>Mantenimiento #{id}</span>
            </div>
            <div className="flex items-center gap-4">
              <UserCheck className={`w-4 h-4 ${usuarioConectado ? "text-green-400" : "text-gray-500"}`} />
              <button
                onClick={finalizar}
                disabled={finalizando}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                {finalizando ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                Finalizar
              </button>
            </div>
          </div>
          <div className="relative h-[85vh]">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover bg-black" />
            {iniciando && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
                <span className="ml-2">Iniciando cámara...</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl flex flex-col h-[85vh]">
          <div className="px-6 py-3 border-b border-gray-800 text-emerald-400 text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat en línea
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl ${
                  m.yo ? "bg-emerald-600/20 ml-auto text-right" : "bg-gray-800/70"
                }`}
              >
                <div className="text-xs text-gray-400">{m.yo ? "Tú" : m.usuarioNombre}</div>
                <div className="text-sm flex items-center gap-1">
                  <span>{m.mensaje}</span>
                  {m.yo &&
                    (m.entregado ? (
                      <CheckCheck className="w-3 h-3 text-blue-400" />
                    ) : (
                      <Check className="w-3 h-3 text-gray-400" />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-gray-800 rounded-xl px-4 py-2 outline-none text-sm"
              />
              <button onClick={enviarMensaje} className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
