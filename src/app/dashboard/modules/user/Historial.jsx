"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ClipboardList, Calendar, AlertCircle } from "lucide-react";

// Datos de ejemplo (sustituir con datos reales)
const historialData = [
  {
    id: 1,
    equipo: {
      nombre: "Laptop Dell XPS",
      imagen: "/laptops/dell-xps.jpg",
      marca: "Dell",
    },
    servicio: "Limpieza y mantenimiento preventivo",
    fecha: "10 Ene 2024",
    estado: "Completado",
    tecnico: {
      nombre: "Carlos Mendoza",
      avatar: "/tecnicos/carlos.jpg",
    },
  },
  {
    id: 2,
    equipo: {
      nombre: "Monitor Samsung",
      imagen: "/monitores/samsung.jpg",
      marca: "Samsung",
    },
    servicio: "Reemplazo de pantalla",
    fecha: "05 Feb 2024",
    estado: "Completado",
    tecnico: {
      nombre: "María Rodriguez",
      avatar: "/tecnicos/maria.jpg",
    },
  },
  {
    id: 3,
    equipo: {
      nombre: "Impresora HP LaserJet",
      imagen: "/impresoras/hp-laserjet.jpg",
      marca: "HP",
    },
    servicio: "Reemplazo de rodillo",
    fecha: "22 Ene 2024",
    estado: "Completado",
    tecnico: {
      nombre: "Juan Pérez",
      avatar: "/tecnicos/juan.jpg",
    },
  },
];

const Historial = () => {
  const estadoColores = {
    Completado:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "En Proceso":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Pendiente:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 space-y-6 p-4 md:p-8 transition-colors duration-500"
    >
      {/* Encabezado */}
      <div className="flex items-center space-x-4 mb-8">
        <ClipboardList className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Historial de Mantenimientos
        </h1>
      </div>

      {/* Si no hay datos */}
      {historialData.length === 0 ? (
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-green-100 dark:hover:shadow-green-900/30"
            >
              {/* Imagen del equipo */}
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={item.equipo.imagen}
                  alt={item.equipo.nombre}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Detalle del mantenimiento */}
              <div className="md:w-3/4 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {item.equipo.nombre}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.equipo.marca}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        estadoColores[item.estado]
                      }`}
                    >
                      {item.estado}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200">
                      Servicio Realizado:
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.servicio}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item.tecnico.avatar}
                      alt={item.tecnico.nombre}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.tecnico.nombre}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-5 h-5" />
                    <span>{item.fecha}</span>
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