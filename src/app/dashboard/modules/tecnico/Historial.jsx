"use client";

import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  AlertCircleIcon, 
  ClipboardListIcon 
} from 'lucide-react';

const historialData = [
  {
    id: 1,
    equipo: 'MacBook Pro',
    servicio: 'Reemplazo de batería',
    fecha: '10 Ene 2024',
    cliente: 'Carlos Mendoza'
  },
  {
    id: 2,
    equipo: 'PC Gaming',
    servicio: 'Limpieza y mantenimiento',
    fecha: '05 Feb 2024',
    cliente: 'María Rodriguez'
  }
];

const Historial = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <ClipboardListIcon className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">
          Historial de Servicios
        </h1>
      </div>

      {historialData.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <AlertCircleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl text-gray-600">
            No hay historial de servicios
          </h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historialData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.equipo}
                </h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                  Completado
                </span>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Servicio:</strong> {item.servicio}
                </p>
                <p>
                  <strong>Fecha:</strong> {item.fecha}
                </p>
                <p>
                  <strong>Cliente:</strong> {item.cliente}
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