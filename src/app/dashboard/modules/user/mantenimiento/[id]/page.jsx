"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SimplePeer from "simple-peer";
import socketService from "@/services/socket.service";
import { MessageSquare, Loader2, Video, AlertTriangle, Check, CheckCheck, Lock } from "lucide-react";

export default function UsuarioStream({ params }) {
  const [id, setId] = useState(null);
  const [tecnicoDisponible, setTecnicoDisponible] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [iniciando, setIniciando] = useState(true);

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);

  const token = useMemo(() => {
    if (typeof window !== "undefined") return localStorage.getItem("token") || "";
    return "";
  }, []);

  const usuarioEmail = useMemo(() => {
    if (typeof window !== "undefined") return localStorage.getItem("email") || "usuario";
    return "usuario";
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

    socket.on("stream-disponible", () => {
      setTecnicoDisponible(true);
      setIniciando(false);
    });

    socket.on("webrtc-offer", async ({ offer }) => {
      iniciarWebRTC(offer);
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

    socket.on("stream-finalizado", () => {
      setTecnicoDisponible(false);
      setFinalizado(true);
      if (videoRef.current) videoRef.current.srcObject = null;
    });

    socket.on("tecnico-desconectado", () => {
      setTecnicoDisponible(false);
      if (videoRef.current) videoRef.current.srcObject = null;
    });

    socket.emit("unirse-stream", { mantenimientoId: id });

    return () => {
      if (peerRef.current) peerRef.current.destroy();
      socketService.disconnect();
    };
  }, [id, token, usuarioEmail]);

  const iniciarWebRTC = (offer) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: true,
      config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
    });

    peer.on("signal", (data) => {
      if (data.type === "answer")
        socketRef.current.emit("webrtc-answer", { mantenimientoId: id, answer: data });
    });

    peer.on("stream", (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setTecnicoDisponible(true);
      }
    });

    peer.signal(offer);
    peerRef.current = peer;
  };

  const enviarMensaje = () => {
    if (!input.trim() || !tecnicoDisponible) return;
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
          </div>
          <div className="relative h-[85vh] flex items-center justify-center bg-black">
            {finalizado ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
                <span className="mt-2 text-lg font-semibold text-gray-200">El mantenimiento ha finalizado</span>
                <span className="text-sm text-gray-400">Gracias por tu paciencia.</span>
              </div>
            ) : tecnicoDisponible ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center">
                <AlertTriangle className="w-10 h-10 text-yellow-400" />
                <span className="mt-2 text-gray-300">El técnico no se encuentra disponible</span>
                <span className="text-sm text-gray-400">Esperando reconexión...</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl flex flex-col h-[85vh] relative overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-800 text-emerald-400 text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat con el técnico
          </div>

          {!tecnicoDisponible && !finalizado && (
            <div className="absolute inset-0 z-10 bg-black/70 flex flex-col items-center justify-center text-center p-6">
              <Lock className="w-10 h-10 text-yellow-400 mb-2" />
              <span className="text-lg text-gray-200 font-semibold">Chat bloqueado temporalmente</span>
              <span className="text-sm text-gray-400">
                El chat estará disponible cuando el técnico se reconecte.
              </span>
            </div>
          )}

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
                disabled={!tecnicoDisponible || finalizado}
              />
              <button
                onClick={enviarMensaje}
                disabled={!tecnicoDisponible || finalizado}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 px-4 py-2 rounded-xl"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}