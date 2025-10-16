"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ActivityIcon, 
  CheckCircleIcon, 
  ClockIcon,
  BarChartIcon
} from 'lucide-react';

const Estadisticas = () => {
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('');

  const tecnicos = [
    { id: 1, nombre: 'Carlos Mendoza' },
    { id: 2, nombre: 'María Rodriguez' }
  ];

  const estadisticasTecnicos = {
    'Carlos Mendoza': {
      completadasHoy: 5,
      pendientes: 2,
      enProceso: 1,
      tiempoPromedioReparacion: '3.5 horas'
    },
    'María Rodriguez': {
      completadasHoy: 3,
      pendientes: 4,
      enProceso: 2,
      tiempoPromedioReparacion: '4.2 horas'
    }
  };

  const datosSeleccionados = tecnicoSeleccionado 
    ? estadisticasTecnicos[tecnicoSeleccionado] 
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <BarChartIcon className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">
          Estadísticas de Técnicos
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Seleccionar Técnico
          </label>
          <select
            value={tecnicoSeleccionado}
            onChange={(e) => setTecnicoSeleccionado(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccionar Técnico</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.nombre}>
                {tecnico.nombre}
              </option>
            ))}
          </select>
        </div>

        {datosSeleccionados && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Completadas Hoy
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-800">
                {datosSeleccionados.completadasHoy}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Pendientes
                </h3>
              </div>
              <p className="text-2xl font-bold text-yellow-800">
                {datosSeleccionados.pendientes}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <ActivityIcon className="w-6 h-6 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  En Proceso
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-800">
                {datosSeleccionados.enProceso}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-purple-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <ClockIcon className="w-6 h-6 text-purple-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Tiempo Promedio
                </h3>
              </div>
              <p className="text-2xl font-bold text-purple-800">
                {datosSeleccionados.tiempoPromedioReparacion}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Estadisticas;