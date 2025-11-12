"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SimplePeer from "simple-peer";
import socketService from "@/services/socket.service";
import { MessageSquare, Loader2, Video, AlertTriangle, Check, CheckCheck, Lock, Play } from "lucide-react";

export default function UsuarioStream({ params }) {
  const [id, setId] = useState(null);
  const [tecnicoDisponible, setTecnicoDisponible] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [iniciando, setIniciando] = useState(true);
  const [videoReady, setVideoReady] = useState(false); // ← NUEVO

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);

  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""), []);
  const usuarioEmail = useMemo(() => {
    if (typeof window !== "undefined") return (localStorage.getItem("email") || "usuario").toLowerCase();
    return "usuario";
  }, []);

  useEffect(() => {
    if (params?.id) setId(params.id);
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const socket = socketService.connect(token);
    socketRef.current = socket;

    socket.on("stream-disponible", () => {
      console.log("✅ Stream disponible del técnico");
      setTecnicoDisponible(true);
      setIniciando(false);
    });

    socket.on("webrtc-offer", async ({ offer }) => {
      console.log("📞 Offer recibida del técnico");
      if (!offer) {
        console.error("❌ Offer inválida");
        return;
      }
      iniciarWebRTC(offer);
    });

    socket.on("webrtc-ice-candidate", ({ candidate }) => {
      console.log("🧊 ICE candidate recibido");
      if (peerRef.current && candidate) {
        try {
          peerRef.current.signal(candidate);
        } catch (err) {
          console.error("❌ Error al procesar ICE candidate:", err);
        }
      }
    });

    socket.on("chat-mensaje", (mensaje) => {
      console.log("💬 Mensaje recibido:", mensaje);
      const from = (mensaje.usuarioEmail || "").toLowerCase();
      setMensajes((prev) => {
        if (from === usuarioEmail) {
          const idx = prev.findIndex(
            (m) =>
              (mensaje.clientId && m.clientId === mensaje.clientId) ||
              (mensaje.timestamp && m.timestamp === mensaje.timestamp)
          );
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], entregado: true, yo: true };
            return copy;
          }
          return [...prev, { ...mensaje, yo: true, entregado: true }];
        } else {
          return [...prev, { ...mensaje, yo: false, entregado: true }];
        }
      });
    });

    socket.on("stream-finalizado", () => {
      console.log("🏁 Stream finalizado");
      setTecnicoDisponible(false);
      setFinalizado(true);
      if (videoRef.current) videoRef.current.srcObject = null;
      window.opener?.location.reload();
      setTimeout(() => window.close(), 1500);
    });

    socket.on("tecnico-desconectado", () => {
      console.log("⚠️ Técnico desconectado");
      setTecnicoDisponible(false);
      if (videoRef.current) videoRef.current.srcObject = null;
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    });

    console.log("📡 Uniéndose al stream...");
    socket.emit("unirse-stream", { mantenimientoId: id });

    return () => {
      if (peerRef.current) peerRef.current.destroy();
      socketService.disconnect();
    };
  }, [id, token, usuarioEmail]);

  const iniciarWebRTC = (offer) => {
    if (peerRef.current) {
      console.log("⚠️ Ya existe un peer, destruyendo el anterior");
      peerRef.current.destroy();
    }

    console.log("🚀 Creando peer como receptor...");
    
    const peer = new SimplePeer({
      initiator: false,
      trickle: true,
      config: { 
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ] 
      },
    });

    peer.on("signal", (data) => {
      if (data.type === "answer") {
        console.log("📤 Enviando answer al técnico");
        socketRef.current?.emit("webrtc-answer", { 
          mantenimientoId: id, 
          answer: data 
        });
      } else if (data.candidate) {
        console.log("📤 Enviando ICE candidate");
        socketRef.current?.emit("webrtc-ice-candidate", { 
          mantenimientoId: id, 
          candidate: data 
        });
      }
    });

    peer.on("stream", async (stream) => {
      console.log("🎥 Stream recibido del técnico!");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // ✅ FORZAR REPRODUCCIÓN
        try {
          await videoRef.current.play();
          console.log("▶️ Video reproduciendo automáticamente");
          setVideoReady(true);
          setTecnicoDisponible(true);
        } catch (err) {
          console.warn("⚠️ No se pudo reproducir automáticamente, requiere interacción del usuario");
          setVideoReady(false);
          setTecnicoDisponible(true);
        }
      }
    });

    peer.on("connect", () => {
      console.log("✅ Peer conectado exitosamente");
    });

    peer.on("error", (err) => {
      console.error("❌ Error en peer:", err);
    });

    try {
      peer.signal(offer);
      peerRef.current = peer;
      console.log("✅ Offer procesada, esperando stream...");
    } catch (err) {
      console.error("❌ Error al procesar offer:", err);
    }
  };

  // ✅ FUNCIÓN PARA REPRODUCIR MANUALMENTE
  const reproducirVideo = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        await videoRef.current.play();
        setVideoReady(true);
        console.log("▶️ Video reproducido manualmente");
      } catch (err) {
        console.error("❌ Error al reproducir:", err);
      }
    }
  };

  const enviarMensaje = () => {
    if (!input.trim() || !tecnicoDisponible) return;
    const clientId =
      (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const nuevoMensaje = {
      clientId,
      mantenimientoId: id,
      mensaje: input.trim(),
      usuarioNombre: "Tú",
      usuarioEmail,
      yo: true,
      entregado: false,
      timestamp: Date.now(),
    };

    console.log("📤 Enviando mensaje:", nuevoMensaje);
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
              <span>Mantenimiento #{id.slice(0, 8)}</span>
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
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover" 
                />
                {/* ✅ BOTÓN DE PLAY SI NO SE REPRODUCE */}
                {!videoReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                    <button
                      onClick={reproducirVideo}
                      className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold"
                    >
                      <Play className="w-6 h-6" />
                      Reproducir video
                    </button>
                    <span className="mt-4 text-sm text-gray-400">Haz clic para ver el stream del técnico</span>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center">
                {iniciando ? (
                  <>
                    <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                    <span className="mt-2 text-gray-300">Conectando con el técnico...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-10 h-10 text-yellow-400" />
                    <span className="mt-2 text-gray-300">El técnico no se encuentra disponible</span>
                    <span className="text-sm text-gray-400">Esperando reconexión...</span>
                  </>
                )}
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
              <span className="text-sm text-gray-400">El chat estará disponible cuando el técnico se reconecte.</span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {mensajes.map((m, i) => (
              <div 
                key={m.clientId || m.timestamp || i} 
                className={`max-w-[85%] px-3 py-2 rounded-xl ${m.yo ? "bg-emerald-600/20 ml-auto text-right" : "bg-gray-800/70"}`}
              >
                <div className="text-xs text-gray-400">{m.yo ? "Tú" : (m.usuarioNombre || m.usuarioEmail)}</div>
                <div className="text-sm flex items-center gap-1 justify-end">
                  <span>{m.mensaje}</span>
                  {m.yo && (m.entregado ? <CheckCheck className="w-3 h-3 text-blue-400" /> : <Check className="w-3 h-3 text-gray-400" />)}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviarMensaje()}
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