"use client";

import { motion } from "framer-motion";
import {
  UsersIcon,
  WrenchIcon,
  ActivityIcon,
  ServerIcon,
} from "lucide-react";

const Inicio = ({ user }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const statsData = [
    {
      icon: <UsersIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      title: "Total Usuarios",
      value: 150,
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      textColor: "text-blue-800 dark:text-blue-300",
    },
    {
      icon: <WrenchIcon className="w-8 h-8 text-green-500 dark:text-green-400" />,
      title: "Mantenimientos Activos",
      value: 25,
      bgColor: "bg-green-50 dark:bg-green-900/30",
      textColor: "text-green-800 dark:text-green-300",
    },
    {
      icon: <ActivityIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      title: "Técnicos Activos",
      value: 5,
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      textColor: "text-purple-800 dark:text-purple-300",
    },
    {
      icon: <ServerIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />,
      title: "Equipos en Servicio",
      value: 40,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
      textColor: "text-yellow-800 dark:text-yellow-300",
    },
  ];

  const tecnicoStats = [
    {
      nombre: "Carlos Mendoza",
      completadasHoy: 3,
      pendientes: 2,
      enProceso: 1,
    },
    {
      nombre: "María Rodriguez",
      completadasHoy: 2,
      pendientes: 3,
      enProceso: 2,
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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
              },
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-500"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Rendimiento de Técnicos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tecnicoStats.map((tecnico, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700/40 p-5 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-500"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {tecnico.nombre}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400">
                      Completadas Hoy
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {tecnico.completadasHoy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 dark:text-yellow-400">
                      Pendientes
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {tecnico.pendientes}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 dark:text-blue-400">
                      En Proceso
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {tecnico.enProceso}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Inicio;