"use client";

import { motion } from "framer-motion";
import { ClipboardList, Calendar, AlertCircle } from "lucide-react";
import { useHistorial } from "@/app/hooks/useHistorial";

const Historial = () => {
  const { data, isLoading, error } = useHistorial();
  const historialData = data?.historial || [];

  const estadoColores = {
    finalizado:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "en proceso":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    pendiente:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 space-y-6 p-4 md:p-8 transition-colors duration-500"
    >
      <div className="flex items-center space-x-4 mb-8">
        <ClipboardList className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Historial de Mantenimientos
        </h1>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Cargando...
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : historialData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            No hay historial de mantenimientos
          </h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {historialData.map((item) => (
  <motion.div
    key={item.id}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-row items-stretch border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-green-100 dark:hover:shadow-green-900/30"
  >
    {/* Columna de la imagen: SIN h-40 */}
    <div className="relative w-56 min-w-56 flex-shrink-0">
      <img
        src={item.fotoUrl}
        alt={item.equipo.nombre}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenido */}
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {item.equipo.nombre}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {item.equipo.marca} {item.equipo.modelo}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {item.estado}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-200">
            Servicio Realizado:
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {item.problema}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs font-semibold text-green-800 dark:text-green-300">
            {item.tecnico.nombre
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <span>{item.tecnico.nombre}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <Calendar className="w-5 h-5" />
          <span>
            {new Date(item.fechas.creacion).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
))}
        </div>
      )}
    </motion.div>
  );
};

export default Historial;