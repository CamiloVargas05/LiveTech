"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  WrenchIcon, 
  SaveIcon, 
  UsersIcon 
} from 'lucide-react';

const GestionEquipos = () => {
  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    descripcionProblema: '',
    tecnicoAsignado: ''
  });

  const [tecnicos, setTecnicos] = useState([
    { id: 1, nombre: 'Carlos Mendoza' },
    { id: 2, nombre: 'María Rodriguez' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEquipo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el equipo
    console.log('Equipo a registrar:', nuevoEquipo);
    // Resetear formulario
    setNuevoEquipo({
      nombre: '',
      marca: '',
      modelo: '',
      descripcionProblema: '',
      tecnicoAsignado: ''
    });
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
          Registro de Equipos
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulario de Registro de Equipo */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Equipo
              </label>
              <input
                type="text"
                name="nombre"
                value={nuevoEquipo.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: Laptop Dell"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={nuevoEquipo.marca}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: Dell"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modelo
              </label>
              <input
                type="text"
                name="modelo"
                value={nuevoEquipo.modelo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: XPS 15"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción del Problema
              </label>
              <textarea
                name="descripcionProblema"
                value={nuevoEquipo.descripcionProblema}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describa el problema del equipo"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Técnico Asignado
              </label>
              <select
                name="tecnicoAsignado"
                value={nuevoEquipo.tecnicoAsignado}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Seleccionar Técnico</option>
                {tecnicos.map((tecnico) => (
                  <option key={tecnico.id} value={tecnico.nombre}>
                    {tecnico.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
            >
              <SaveIcon className="mr-2" />
              Guardar Equipo
            </button>
          </form>
        </motion.div>

        {/* Lista de Equipos Registrados */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Equipos Registrados</h2>
          <p className="text-gray-500 text-center">
            No hay equipos registrados aún
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GestionEquipos;