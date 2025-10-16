"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ClipboardList, 
  Calendar, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

// Datos de ejemplo (sustituir con datos reales)
const historialData = [
  {
    id: 1,
    equipo: {
      nombre: 'Laptop Dell XPS',
      imagen: '/laptops/dell-xps.jpg',
      marca: 'Dell'
    },
    servicio: 'Limpieza y mantenimiento preventivo',
    fecha: '10 Ene 2024',
    estado: 'Completado',
    tecnico: {
      nombre: 'Carlos Mendoza',
      avatar: '/tecnicos/carlos.jpg'
    }
  },
  {
    id: 2,
    equipo: {
      nombre: 'Monitor Samsung',
      imagen: '/monitores/samsung.jpg',
      marca: 'Samsung'
    },
    servicio: 'Reemplazo de pantalla',
    fecha: '05 Feb 2024',
    estado: 'Completado',
    tecnico: {
      nombre: 'María Rodriguez',
      avatar: '/tecnicos/maria.jpg'
    }
  },
  {
    id: 3,
    equipo: {
      nombre: 'Impresora HP LaserJet',
      imagen: '/impresoras/hp-laserjet.jpg',
      marca: 'HP'
    },
    servicio: 'Reemplazo de rodillo',
    fecha: '22 Ene 2024',
    estado: 'Completado',
    tecnico: {
      nombre: 'Juan Pérez',
      avatar: '/tecnicos/juan.jpg'
    }
  }
];

const Historial = () => {
  const estadoColores = {
    'Completado': 'bg-green-100 text-green-800',
    'En Proceso': 'bg-yellow-100 text-yellow-800',
    'Pendiente': 'bg-blue-100 text-blue-800'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <ClipboardList className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">Historial de Mantenimientos</h1>
      </div>

      {historialData.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl text-gray-600">
            No hay historial de mantenimientos
          </h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {historialData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-transform duration-300"
            >
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image 
                  src={item.equipo.imagen} 
                  alt={item.equipo.nombre}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <div className="md:w-3/4 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.equipo.nombre}
                      </h2>
                      <p className="text-gray-500">{item.equipo.marca}</p>
                    </div>
                    
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${estadoColores[item.estado]}
                    `}>
                      {item.estado}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700">Servicio Realizado:</h3>
                    <p className="text-gray-600">{item.servicio}</p>
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
                    <span className="text-gray-600">{item.tecnico.nombre}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-500">
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