"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wrench, AlertCircle, PlayCircle, RotateCcw } from "lucide-react";
import { useDispositivos } from "@/app/hooks/tecnico/useDispositivos";

const Dispositivos = () => {
  const { dispositivos, isLoading, error, iniciarMantenimiento } = useDispositivos();
  const mantenimientoActivo =
    typeof window !== "undefined" ? localStorage.getItem("mantenimientoActivo") : null;

  const formatEstado = (estado) => {
    if (!estado) return "";
    return estado
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "en_proceso":
      case "en_revision":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "finalizado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 mb-8"
      >
        <Wrench className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dispositivos Asignados
        </h1>
      </motion.div>

      {isLoading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
          Cargando dispositivos...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 dark:text-red-400">{error}</div>
      ) : dispositivos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl text-gray-600 dark:text-gray-300">No tienes dispositivos asignados</h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {dispositivos.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {d.fotoUrl && (
                  <motion.img
                    src={d.fotoUrl}
                    alt={d.nombreEquipo}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                <div className="p-6 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {d.nombreEquipo}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(
                          d.estado
                        )}`}
                      >
                        {formatEstado(d.estado)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong className="text-gray-700 dark:text-gray-400">Marca:</strong> {d.marca}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong className="text-gray-700 dark:text-gray-400">Modelo:</strong> {d.modelo}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong className="text-gray-700 dark:text-gray-400">Descripción:</strong>{" "}
                      {d.descripcionProblema}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong className="text-gray-700 dark:text-gray-400">Cliente:</strong>{" "}
                      {d.usuario?.nombre}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong className="text-gray-700 dark:text-gray-400">Fecha de Recepción:</strong>{" "}
                      {new Date(d.creadoEn).toLocaleDateString()}
                    </p>
                  </div>

                  {d.estado === "pendiente" && (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        localStorage.setItem("mantenimientoActivo", d.id);
                        iniciarMantenimiento(d.id);
                        window.open(
                          `/dashboard/modules/tecnico/mantenimiento/${d.id}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>Iniciar Mantenimiento</span>
                    </motion.button>
                  )}

                  {mantenimientoActivo === d.id &&
                    (d.estado === "en_revision" || d.estado === "en_proceso") && (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          window.open(
                            `/dashboard/modules/tecnico/mantenimiento/${d.id}`,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg"
                      >
                        <RotateCcw className="w-5 h-5" />
                        <span>Reanudar Mantenimiento</span>
                      </motion.button>
                    )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dispositivos;