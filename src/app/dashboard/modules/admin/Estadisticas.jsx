"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ActivityIcon,
  CheckCircleIcon,
  ClockIcon,
  BarChartIcon,
  ListChecksIcon
} from "lucide-react";
import { useEstadisticasTecnicos } from "@/app/hooks/useEstadisticasTecnicos";

const Estadisticas = () => {
  const { mantenimientos, tecnicos, isLoading, error } = useEstadisticasTecnicos();
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");

  const obtenerEstadisticas = (lista, tecnicoId) => {
    const filtro = lista.filter((m) => m.tecnico.id === tecnicoId);

    return {
      completadas: filtro.filter((m) => m.estado === "finalizado").length,
      enProceso: filtro.filter((m) => m.estado === "en proceso").length,
      pendientes: filtro.filter((m) => m.estado === "pendiente").length,
      total: filtro.length,
    };
  };

  const stats =
    tecnicoSeleccionado !== ""
      ? obtenerEstadisticas(mantenimientos, tecnicoSeleccionado)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-6 md:p-10"
    >
      <div className="flex items-center space-x-4 mb-8">
        <BarChartIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Estadísticas de Técnicos
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Seleccionar Técnico
          </label>

          <select
            value={tecnicoSeleccionado}
            onChange={(e) => setTecnicoSeleccionado(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
          >
            <option value="">Seleccionar Técnico</option>
            {tecnicos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {/* Completadas */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl border border-green-100 dark:border-green-800"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Completadas
                  </h3>
                </div>
                <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                  {stats.completadas}
                </p>
              </motion.div>

              {/* Pendientes */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-xl border border-yellow-100 dark:border-yellow-800"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Pendientes
                  </h3>
                </div>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
                  {stats.pendientes}
                </p>
              </motion.div>

              {/* En Proceso */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl border border-blue-100 dark:border-blue-800"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <ActivityIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    En Proceso
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {stats.enProceso}
                </p>
              </motion.div>

              {/* Total */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-xl border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <ListChecksIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Total Asignados
                  </h3>
                </div>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                  {stats.total}
                </p>
              </motion.div>

            </div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Estadisticas;