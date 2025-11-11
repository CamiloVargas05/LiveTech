"use client";

import { motion } from "framer-motion";
import { Wrench, Clock, AlertCircle, PlayCircle } from "lucide-react";
import { useMantenimientos } from "@/app/hooks/user/useMantenimientos";

const Mantenimientos = () => {
  const { mantenimientos, isLoading, error } = useMantenimientos();

  const estadoColores = {
    en_proceso: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    pendiente: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    finalizado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    en_revision: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 space-y-6 p-4 md:p-8 transition-colors duration-500"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Wrench className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Mantenimientos en Curso
        </h1>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
          Cargando mantenimientos...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-red-400">
          Error al cargar los mantenimientos: {error}
        </p>
      ) : mantenimientos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            No tienes mantenimientos en curso
          </h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mantenimientos.map((mantenimiento) => (
            <motion.div
              key={mantenimiento.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-green-100 dark:hover:shadow-green-900/30"
            >
              {mantenimiento.fotoUrl && (
                <div className="relative h-48 w-full">
                  <motion.img
                    src={mantenimiento.fotoUrl}
                    alt={mantenimiento.nombreEquipo}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              <div className="p-6 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {mantenimiento.nombreEquipo}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {mantenimiento.marca} - {mantenimiento.modelo}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        estadoColores[mantenimiento.estado] ||
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {mantenimiento.estado
                        .replace("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                        {mantenimiento.tecnico?.nombre
                          ? mantenimiento.tecnico.nombre[0].toUpperCase()
                          : "?"}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {mantenimiento.tecnico?.nombre || "Sin técnico asignado"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {new Date(mantenimiento.creadoEn).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width:
                          mantenimiento.estado === "finalizado"
                            ? "100%"
                            : mantenimiento.estado === "en_revision"
                            ? "60%"
                            : "30%",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                    {mantenimiento.estado === "finalizado"
                      ? "Completado"
                      : "En progreso"}
                  </p>
                </div>

                {(mantenimiento.estado === "en_revision" ||
                  mantenimiento.estado === "en_proceso") && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      window.open(
                        `/dashboard/modules/user/mantenimiento/${mantenimiento.id}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Ver transmisión</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Mantenimientos;