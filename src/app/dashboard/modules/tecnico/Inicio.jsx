"use client";

import { motion } from "framer-motion";
import {
  ActivityIcon,
  ClipboardListIcon,
  WrenchIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { useInicio } from "@/app/hooks/useInicio";

const Inicio = ({ user }) => {
  const { data, isLoading } = useInicio();

  const resumen = data?.resumen || {
    total: 0,
    pendientes: 0,
    enRevision: 0,
    finalizados: 0,
    porcentajeFinalizado: "0.0",
  };

  const recientes = data?.recientes || [];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const statsData = [
    {
      icon: <WrenchIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      title: "Total de Mantenimientos",
      value: resumen.total,
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      textColor: "text-blue-800 dark:text-blue-300",
    },
    {
      icon: (
        <ClipboardListIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
      ),
      title: "Finalizados",
      value: resumen.finalizados,
      bgColor: "bg-green-50 dark:bg-green-900/30",
      textColor: "text-green-800 dark:text-green-300",
    },
    {
      icon: <ActivityIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      title: "En Revisión",
      value: resumen.enRevision,
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      textColor: "text-purple-800 dark:text-purple-300",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500"
    >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Panel del Técnico, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gestiona tus mantenimientos, revisa tus equipos asignados 
            y mantén un registro actualizado de tus servicios.
          </p>
        </motion.div>

        {/* Tarjetas estadísticas */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.2, staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className={`${stat.bgColor} p-6 rounded-xl shadow-md relative overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300`}
            >
              <div className="flex justify-between items-center mb-4 relative z-10">
                <div>
                  {stat.icon}
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-2">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <ArrowUpRightIcon
                className={`w-16 h-16 absolute -top-2 -right-2 opacity-20 ${stat.textColor}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mantenimientos recientes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Últimos Servicios Asignados
            </h2>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("changeSection", { detail: "maintenance" }))
              }
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors font-semibold"
            >
              Ver todos
            </button>
          </div>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center animate-pulse">
              Cargando mantenimientos...
            </p>
          ) : recientes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No hay servicios recientes
            </p>
          ) : (
            <div className="space-y-4">
              {recientes.map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={m.fotoUrl}
                      alt={m.nombreEquipo}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {m.nombreEquipo}{" "}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({m.marca} {m.modelo})
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {m.descripcionProblema}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(m.fechaCreacion).toLocaleDateString("es-CO")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      m.estado === "pendiente"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : m.estado === "en_revision"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {m.estado.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Inicio;