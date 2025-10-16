"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon,
  SaveIcon 
} from 'lucide-react';

const GestionUsuarios = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: '',
    password: ''
  });

  const [usuarios, setUsuarios] = useState([
    { 
      id: 1, 
      nombre: 'Admin Principal', 
      email: 'admin@livetech.com', 
      rol: 'admin', 
      estado: 'activo' 
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear usuario
    console.log('Nuevo usuario:', nuevoUsuario);
    // Resetear formulario
    setNuevoUsuario({
      nombre: '',
      email: '',
      rol: '',
      password: ''
    });
  };

  const toggleEstadoUsuario = (id) => {
    setUsuarios(prev => 
      prev.map(usuario => 
        usuario.id === id 
          ? { ...usuario, estado: usuario.estado === 'activo' ? 'inactivo' : 'activo' }
          : usuario
      )
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <UsersIcon className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Usuarios
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulario de Registro de Usuario */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                value={nuevoUsuario.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nombre completo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={nuevoUsuario.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rol
              </label>
              <select
                name="rol"
                value={nuevoUsuario.rol}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Seleccionar Rol</option>
                <option value="admin">Administrador</option>
                <option value="tecnico">Técnico</option>
                <option value="user">Usuario</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={nuevoUsuario.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
            >
              <SaveIcon className="mr-2" />
              Crear Usuario
            </button>
          </form>
        </motion.div>

        {/* Lista de Usuarios */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
          
          {usuarios.map((usuario) => (
            <div 
              key={usuario.id} 
              className="flex justify-between items-center border-b py-3 last:border-b-0"
            >
              <div>
                <p className="font-semibold">{usuario.nombre}</p>
                <p className="text-sm text-gray-500">{usuario.email}</p>
                <p className={`text-xs font-medium ${
                  usuario.estado === 'activo' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {usuario.estado.toUpperCase()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleEstadoUsuario(usuario.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    usuario.estado === 'activo'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {usuario.estado === 'activo' ? 'Desactivar' : 'Activar'}
                </button>
                <button className="text-blue-500 hover:text-blue-700">
                  <EditIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GestionUsuarios;