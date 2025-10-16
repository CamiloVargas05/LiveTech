"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  WrenchIcon, 
  AlertCircleIcon,
  PlayCircleIcon
} from 'lucide-react';

const dispositivosData = [
  {
    id: 1,
    equipo: 'Laptop Dell XPS',
    estado: 'Recibido',
    fechaRecepcion: '15 Feb 2024',
    descripcion: 'Problema con pantalla',
    cliente: 'Juan Pérez'
  },
  {
    id: 2,
    equipo: 'Impresora HP LaserJet',
    estado: 'Recibido',
    fechaRecepcion: '20 Feb 2024',
    descripcion: 'Error de impresión',
    cliente: 'María Rodriguez'
  }
];

const Dispositivos = () => {
  const [dispositivos, setDispositivos] = useState(dispositivosData);

  const handleIniciarMantenimiento = (id) => {
    const updatedDispositivos = dispositivos.map(dispositivo => 
      dispositivo.id === id 
        ? { ...dispositivo, estado: 'En Proceso' } 
        : dispositivo
    );
    setDispositivos(updatedDispositivos);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <WrenchIcon className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">
          Dispositivos Asignados
        </h1>
      </div>

      {dispositivos.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <AlertCircleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl text-gray-600">
            No tienes dispositivos asignados
          </h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dispositivos.map((dispositivo) => (
            <motion.div
              key={dispositivo.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {dispositivo.equipo}
                  </h2>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${dispositivo.estado === 'Recibido' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }
                  `}>
                    {dispositivo.estado}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <strong>Descripción:</strong> {dispositivo.descripcion}
                  </p>
                  <p className="text-gray-600">
                    <strong>Cliente:</strong> {dispositivo.cliente}
                  </p>
                  <p className="text-gray-600">
                    <strong>Fecha de Recepción:</strong> {dispositivo.fechaRecepcion}
                  </p>
                </div>
              </div>
              
              {dispositivo.estado === 'Recibido' && (
                <button
                  onClick={() => handleIniciarMantenimiento(dispositivo.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  <span>Iniciar Mantenimiento</span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Dispositivos;