"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  AlertCircleIcon,
  ClipboardListIcon,
} from "lucide-react";

const historialData = [
  {
    id: 1,
    equipo: "MacBook Pro",
    servicio: "Reemplazo de batería",
    fecha: "10 Ene 2024",
    cliente: "Carlos Mendoza",
  },
  {
    id: 2,
    equipo: "PC Gaming",
    servicio: "Limpieza y mantenimiento",
    fecha: "05 Feb 2024",
    cliente: "María Rodriguez",
  },
];

const Historial = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 space-y-6 p-4 md:p-8 transition-colors duration-500"
    >
      {/* Encabezado */}
      <div className="flex items-center space-x-4 mb-8">
        <ClipboardListIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Historial de Servicios
        </h1>
      </div>

      {/* Sin datos */}
      {historialData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <AlertCircleIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            No hay historial de servicios
          </h2>
        </motion.div>
      ) : (
        /* Con datos */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historialData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-green-100 dark:hover:shadow-green-900/30"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {item.equipo}
                </h2>
                <span className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircleIcon className="w-4 h-4" /> Completado
                </span>
              </div>

              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    Servicio:
                  </strong>{" "}
                  {item.servicio}
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    Fecha:
                  </strong>{" "}
                  {item.fecha}
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    Cliente:
                  </strong>{" "}
                  {item.cliente}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Historial;