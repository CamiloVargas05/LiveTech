"use client";

import { motion } from 'framer-motion';
import { 
  ActivityIcon, 
  ClipboardListIcon, 
  WrenchIcon, 
  ArrowUpRightIcon 
} from 'lucide-react';

const Inicio = ({ user }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }
    }
  };

  const statsData = [
    {
      icon: <ActivityIcon className="w-8 h-8 text-blue-500" />,
      title: "Mantenimientos Actuales",
      value: 2,
      bgColor: "bg-blue-50",
      textColor: "text-blue-800"
    },
    {
      icon: <ClipboardListIcon className="w-8 h-8 text-green-500" />,
      title: "Servicios Completados",
      value: 10,
      bgColor: "bg-green-50",
      textColor: "text-green-800"
    },
    {
      icon: <WrenchIcon className="w-8 h-8 text-purple-500" />,
      title: "Equipos en Servicio",
      value: 3,
      bgColor: "bg-purple-50",
      textColor: "text-purple-800"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 md:p-8"
    >
      <div className="container mx-auto">
        {/* Encabezado de Bienvenida */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido, {user?.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Gestiona tus equipos, monitorea mantenimientos y mantén un historial 
            detallado de todos tus servicios con LiveTech.
          </p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                delayChildren: 0.2,
                staggerChildren: 0.2 
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className={`${stat.bgColor} p-6 rounded-xl shadow-md relative overflow-hidden`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="z-10">
                  {stat.icon}
                  <h3 className="text-sm font-semibold text-gray-700 mt-2">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <ArrowUpRightIcon className={`w-16 h-16 absolute -top-2 -right-2 opacity-20 ${stat.textColor}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de Últimos Servicios */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Últimos Servicios
            </h2>
            <button className="text-green-600 hover:text-green-800 transition-colors">
              Ver todos
            </button>
          </div>
          
          {/* Aquí puedes agregar una lista de últimos servicios */}
          <p className="text-gray-500 text-center">
            No hay servicios recientes
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Inicio;