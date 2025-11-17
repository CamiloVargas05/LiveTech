"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import SimplePeer from "simple-peer";
import socketService from "@/services/socket.service";
import { apiPost } from "@/lib/api";
import {
  Send,
  XCircle,
  MessageSquare,
  Video,
  UserCheck,
  Loader2,
  Check,
  CheckCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function MantenimientoPage({ params }) {
  const resolvedParams = React.use(params);
  const [id, setId] = useState(null);
  const [usuarioConectado, setUsuarioConectado] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [finalizando, setFinalizando] = useState(false);
  const [iniciando, setIniciando] = useState(true);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);

  const token = useMemo(
    () =>
      typeof window !== "undefined"
        ? localStorage.getItem("token") || ""
        : "",
    []
  );

  const usuarioEmail = useMemo(() => {
    if (typeof window !== "undefined")
      return (localStorage.getItem("email") || "tecnico").toLowerCase();
    return "tecnico";
  }, []);

  useEffect(() => {
    if (resolvedParams?.id) setId(resolvedParams.id);
  }, [resolvedParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!id) return;
    const socket = socketService.connect(token);
    socketRef.current = socket;

    socket.on("usuario-conectado", () => {
      setUsuarioConectado(true);
      setTimeout(() => iniciarWebRTC(), 500);
    });

    socket.on("usuario-desconectado", () => {
      setUsuarioConectado(false);
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      if (peerRef.current) {
        try {
          await peerRef.current.signal(answer);
        } catch (err) {}
      }
    });

    socket.on("webrtc-ice-candidate", ({ candidate }) => {
      if (peerRef.current && candidate) {
        try {
          peerRef.current.signal(candidate);
        } catch (err) {}
      }
    });

    socket.on("chat-mensaje", (mensaje) => {
      setMensajes((prev) => {
        const idx = prev.findIndex((m) => m.clientId === mensaje.clientId);
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], ...mensaje, yo: true, entregado: true };
          return updated;
        } else {
          return [...prev, { ...mensaje, yo: false, entregado: true }];
        }
      });
    });

    socket.on("disconnect", () =>
      socket.emit("tecnico-desconectado", { mantenimientoId: id })
    );

    (async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        streamRef.current = media;
        if (videoRef.current) {
          videoRef.current.srcObject = media;
        }
        setIniciando(false);
        socket.emit("iniciar-stream", { mantenimientoId: id });
      } catch (err) {
        setIniciando(false);
      }
    })();

    return () => {
      socket.emit("tecnico-desconectado", { mantenimientoId: id });
      finalizarLocal();
      socketService.disconnect();
    };
  }, [id, token]);

  useEffect(() => {
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isMobile]);

  const iniciarWebRTC = () => {
    if (!streamRef.current) return;

    if (peerRef.current) {
      peerRef.current.destroy();
    }

    const peer = new SimplePeer({
      initiator: true,
      trickle: true,
      stream: streamRef.current,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
    });

    peer.on("signal", (data) => {
      if (data.type === "offer") {
        socketRef.current?.emit("webrtc-offer", {
          mantenimientoId: id,
          offer: data,
        });
      } else if (data.candidate) {
        socketRef.current?.emit("webrtc-ice-candidate", {
          mantenimientoId: id,
          candidate: data,
        });
      }
    });

    peer.on("connect", () => {});
    peer.on("error", () => {});

    peerRef.current = peer;
  };

  const enviarMensaje = () => {
    if (!input.trim()) return;
    const clientId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

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

    setMensajes((prev) => [...prev, nuevoMensaje]);
    socketRef.current?.emit("chat-mensaje", nuevoMensaje);
    setInput("");
  };

  const finalizarLocal = () => {
    socketRef.current?.emit("finalizar-stream", { mantenimientoId: id });
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

const finalizar = async () => {
  setFinalizando(true);
  try {
    finalizarLocal();
    await apiPost(`/api/mantenimiento/${id}/finalizar`);

    localStorage.setItem("mantenimientoFinalizado", id + "-" + Date.now());

    if (typeof window !== "undefined") {
      localStorage.removeItem("mantenimientoActivo");
      window.opener?.location.reload();
      setTimeout(() => {
        window.close();
      }, 1200);
    }
  } finally {
    setFinalizando(false);
  }
};

  if (!id || isMobile === null)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-[1920px] mx-auto">
        {!isMobile && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <motion.div className="lg:col-span-3 bg-gray-900 rounded-xl lg:rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center px-4 lg:px-6 py-2 lg:py-3 border-b border-gray-800">
                <div className="flex items-center gap-2 text-green-400 text-base lg:text-lg font-semibold">
                  <Video className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="truncate">Mantenimiento #{id.slice(0, 8)}</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-4">
                  <div className="hidden sm:flex items-center gap-2">
                    <UserCheck
                      className={`w-4 h-4 lg:w-5 lg:h-5 ${
                        usuarioConectado ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    <span className="text-xs lg:text-sm text-gray-400">
                      {usuarioConectado
                        ? "Usuario conectado"
                        : "Esperando usuario..."}
                    </span>
                  </div>
                  <button
                    onClick={finalizar}
                    disabled={finalizando}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold flex items-center gap-1 lg:gap-2"
                  >
                    {finalizando ? (
                      <Loader2 className="w-3 h-3 lg:w-4 lg:h-4 animate-spin" />
                    ) : (
                      <XCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                    <span className="hidden sm:inline">Finalizar</span>
                  </button>
                </div>
              </div>
              <div className="relative h-[60vh] lg:h-[85vh]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover bg-black"
                />
                {iniciando && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                    <Loader2 className="w-6 h-6 lg:w-8 lg:h-8 animate-spin text-gray-200" />
                    <span className="ml-2 mt-2 text-sm lg:text-base text-gray-200">
                      Iniciando cámara...
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div className="bg-gray-900 rounded-xl lg:rounded-2xl border border-gray-800 shadow-2xl flex flex-col h-[60vh] lg:h-[85vh]">
              <div className="px-4 lg:px-6 py-2 lg:py-3 border-b border-gray-800 text-emerald-400 text-base lg:text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat en línea
              </div>
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2">
                {mensajes.map((m, i) => (
                  <div
                    key={m.clientId || m.timestamp || i}
                    className={`max-w-[85%] px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg lg:rounded-xl ${
                      m.yo
                        ? "bg-emerald-600/20 ml-auto text-right"
                        : "bg-gray-800/70"
                    }`}
                  >
                    <div className="text-xs text-gray-400">
                      {m.yo ? "Tú" : (m.usuarioEmail || "Técnico")}
                    </div>
                    <div className="text-xs lg:text-sm flex items-center gap-1 justify-end">
                      <span>{m.mensaje}</span>
                      {m.yo &&
                        (m.entregado ? (
                          <CheckCheck className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 lg:p-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && enviarMensaje()
                    }
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-gray-800 rounded-lg lg:rounded-xl px-3 lg:px-4 py-1.5 lg:py-2 outline-none text-xs lg:text-sm"
                  />
                  <button
                    onClick={enviarMensaje}
                    className="bg-emerald-600 hover:bg-emerald-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {isMobile && (
          <div className="flex flex-col gap-3">
            <motion.div className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden">
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-800">
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <Video className="w-4 h-4" />
                  <span>#{id.slice(0, 6)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {usuarioConectado && (
                    <UserCheck className="w-4 h-4 text-green-400" />
                  )}
                  <button
                    onClick={finalizar}
                    disabled={finalizando}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    {finalizando ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    <span>Finalizar</span>
                  </button>
                </div>
              </div>
              <div className="relative h-[40vh]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover bg-black"
                />
                {iniciando && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
                    <span className="ml-2 mt-2 text-xs text-gray-200">
                      Iniciando cámara...
                    </span>
                  </div>
                )}
                {!usuarioConectado && !iniciando && (
                  <div className="absolute bottom-2 left-2 right-2 bg-yellow-600/90 px-2 py-1 rounded-lg">
                    <span className="text-xs text-white">
                      Esperando conexión del usuario...
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
              <div
                onClick={() => setChatCollapsed(!chatCollapsed)}
                className="px-3 py-2 border-b border-gray-800 text-emerald-400 text-sm font-semibold flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat en línea
                  {mensajes.length > 0 && !chatCollapsed && (
                    <span className="bg-emerald-600/30 px-1.5 py-0.5 rounded-full text-xs">
                      {mensajes.length}
                    </span>
                  )}
                </div>
                {chatCollapsed ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>

              {!chatCollapsed && (
                <>
                  <div className="h-[35vh] overflow-y-auto p-3 space-y-1.5">
                    {mensajes.map((m, i) => (
                      <div
                        key={m.clientId || m.timestamp || i}
                        className={`max-w-[85%] px-2 py-1 rounded-lg text-xs ${
                          m.yo
                            ? "bg-emerald-600/20 ml-auto text-right"
                            : "bg-gray-800/70"
                        }`}
                      >
                        <div className="text-[10px] text-gray-400">
                          {m.yo
                            ? "Tú"
                            : m.usuarioEmail
                            ? m.usuarioEmail.split("@")[0]
                            : "Usuario"}
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <span>{m.mensaje}</span>
                          {m.yo &&
                            (m.entregado ? (
                              <CheckCheck className="w-2.5 h-2.5" />
                            ) : (
                              <Check className="w-2.5 h-2.5" />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-800">
                    <div className="flex gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && !e.shiftKey && enviarMensaje()
                        }
                        placeholder="Mensaje..."
                        className="flex-1 bg-gray-800 rounded-lg px-3 py-1.5 outline-none text-xs"
                      />
                      <button
                        onClick={enviarMensaje}
                        className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}