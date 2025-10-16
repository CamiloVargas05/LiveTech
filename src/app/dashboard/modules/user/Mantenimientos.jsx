"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

// Datos de ejemplo (sustituir con datos reales)
const mantenimientosData = [
  {
    id: 1,
    equipo: {
      nombre: 'Laptop Dell XPS',
      imagen: '/laptops/dell-xps.jpg',
      marca: 'Dell'
    },
    estado: 'En Proceso',
    fechaInicio: '15 Feb 2024',
    tecnico: {
      nombre: 'Carlos Mendoza',
      avatar: '/tecnicos/carlos.jpg'
    },
    progreso: 60
  },
  {
    id: 2,
    equipo: {
      nombre: 'Impresora HP LaserJet',
      imagen: '/impresoras/hp-laserjet.jpg',
      marca: 'HP'
    },
    estado: 'Recibido',
    fechaInicio: '20 Feb 2024',
    tecnico: {
      nombre: 'María Rodriguez',
      avatar: '/tecnicos/maria.jpg'
    },
    progreso: 20
  }
];

const Mantenimientos = () => {
  const estadoColores = {
    'En Proceso': 'bg-yellow-100 text-yellow-800',
    'Recibido': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Wrench className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">Mantenimientos en Curso</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mantenimientosData.map((mantenimiento) => (
          <motion.div
            key={mantenimiento.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300"
          >
            <div className="relative h-48 w-full">
              <Image 
                src={mantenimiento.equipo.imagen} 
                alt={mantenimiento.equipo.nombre}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mantenimiento.equipo.nombre}
                  </h2>
                  <p className="text-gray-500">{mantenimiento.equipo.marca}</p>
                </div>
                
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${estadoColores[mantenimiento.estado]}
                `}>
                  {mantenimiento.estado}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Image 
                    src={mantenimiento.tecnico.avatar}
                    alt={mantenimiento.tecnico.nombre}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-gray-600">{mantenimiento.tecnico.nombre}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{mantenimiento.fechaInicio}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${mantenimiento.progreso}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 text-right">
                Progreso: {mantenimiento.progreso}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {mantenimientosData.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl text-gray-600">
            No tienes mantenimientos en curso
          </h2>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Mantenimientos;