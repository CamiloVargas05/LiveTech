"use client";

import { motion } from "framer-motion";
import { UsersIcon, WrenchIcon, ActivityIcon, ServerIcon } from "lucide-react";
import { useInicio } from "@/app/hooks/useInicio";
import { useGestionUsuarios } from "@/app/hooks/admin/useGestionUsuarios";

const Inicio = ({ user }) => {
  const { data, isLoading, error } = useInicio();
  const { usuarios, isLoading: loadingUsuarios } = useGestionUsuarios();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  // 🔹 Calcular técnicos activos
  const tecnicosActivos =
    usuarios?.filter((u) => u.role === "tecnico" && u.isActive)?.length || 0;

  // 🔹 Manejo de estados
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400">
        Error al cargar el dashboard: {error}
      </div>
    );
  }

  if (isLoading || !data || loadingUsuarios) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300 animate-pulse">
        Cargando datos del panel...
      </div>
    );
  }

  // 🔹 Tomar datos reales del endpoint
  const resumen = data.resumen || {};
  const recientes = data.recientes || [];

  // 🔹 Estadísticas principales (basadas en el body real del backend)
  const statsData = [
    {
      icon: <UsersIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      title: "Total Usuarios",
      value: usuarios?.length ?? 0,
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      textColor: "text-blue-800 dark:text-blue-300",
    },
    {
      icon: <WrenchIcon className="w-8 h-8 text-green-500 dark:text-green-400" />,
      title: "Mantenimientos Totales",
      value: resumen.total ?? 0,
      bgColor: "bg-green-50 dark:bg-green-900/30",
      textColor: "text-green-800 dark:text-green-300",
    },
    {
      icon: <ActivityIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      title: "Técnicos Activos",
      value: tecnicosActivos,
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      textColor: "text-purple-800 dark:text-purple-300",
    },
    {
      icon: <ServerIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />,
      title: "En Revisión",
      value: resumen.enRevision ?? 0,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
      textColor: "text-yellow-800 dark:text-yellow-300",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 transition-colors duration-500"
    >
      <div className="container mx-auto">
        {/* Encabezado */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Panel de Administración, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gestiona usuarios, monitorea mantenimientos y supervisa el rendimiento
            de tu equipo técnico.
          </p>
        </motion.div>

        {/* Estadísticas principales */}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className={`${stat.bgColor} p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500`}
            >
              <div className="flex justify-between items-center">
                <div>
                  {stat.icon}
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Últimos mantenimientos recientes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-500"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Mantenimientos Recientes
          </h2>

          {recientes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No hay mantenimientos recientes.
            </p>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recientes.map((m, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {m.nombreEquipo} ({m.marca})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(m.fechaCreacion).toLocaleDateString()} —{" "}
                      {m.estado.replace("_", " ")}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    Técnico: {m.tecnico?.name || "No asignado"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Inicio;