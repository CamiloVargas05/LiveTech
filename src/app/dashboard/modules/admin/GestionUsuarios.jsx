"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Edit,
  Save,
  XCircle,
  ShieldCheck,
  UserPlus,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";
import { useGestionUsuarios } from "@/app/hooks/admin/useGestionUsuarios";

const GestionUsuarios = () => {
  const { usuarios, isLoading, error, crearUsuario, actualizarUsuario } =
    useGestionUsuarios();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return usuarios;
    return usuarios.filter((u) => (u.name || "").toLowerCase().includes(q));
  }, [usuarios, query]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarUsuario(editingId, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        });
        setEditingId(null);
      } else {
        await crearUsuario(formData);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });
      setShowPassword(false);
    } catch (error) {}
  };

  const handleEdit = (usuario) => {
    setEditingId(usuario.id);
    setFormData({
      name: usuario.name,
      email: usuario.email,
      phone: usuario.phone || "",
      role: usuario.role,
      password: "",
    });
    setShowPassword(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });
    setShowPassword(false);
  };

  const openToggleModal = (usuario) => {
    setUserToToggle(usuario);
    setShowModal(true);
  };

  const confirmToggleEstado = async () => {
    if (!userToToggle) return;
    try {
      await actualizarUsuario(userToToggle.id, {
        isActive: !userToToggle.isActive,
      });
    } catch (e) {} finally {
      setShowModal(false);
      setUserToToggle(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-3 mb-8"
      >
        <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Gestión de Usuarios
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-500 border border-gray-100 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
                placeholder="Ejemplo: Juan Perez"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                disabled={!!editingId}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
                placeholder="Ejemplo: 3001234567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="tecnico">Técnico</option>
                <option value="user">Usuario</option>
              </select>
            </div>

            {!editingId && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 pr-10 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none transition"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                  isLoading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 shadow-lg"
                }`}
              >
                {editingId ? (
                  <>
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Crear Usuario
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <XCircle className="w-5 h-5" />
                  Cancelar
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Usuarios Registrados
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Cargando usuarios...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No hay usuarios registrados.</p>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((usuario) => (
                <motion.div
                  key={usuario.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{usuario.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{usuario.email}</p>
                    <p
                      className={`text-xs font-medium ${
                        usuario.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {usuario.isActive ? "ACTIVO" : "INACTIVO"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openToggleModal(usuario)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                        usuario.isActive
                          ? "bg-red-50 dark:bg-red-900/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-800/50"
                          : "bg-green-50 dark:bg-green-900/30 text-green-600 hover:bg-green-100 dark:hover:bg-green-800/50"
                      }`}
                    >
                      {usuario.isActive ? "Desactivar" : "Activar"}
                    </button>
                    <button
                      onClick={() => handleEdit(usuario)}
                      className="text-blue-500 hover:text-blue-400 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {userToToggle?.isActive ? "Desactivar usuario" : "Activar usuario"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {userToToggle?.isActive
                  ? `¿Seguro que deseas desactivar a ${userToToggle?.name}?`
                  : `¿Seguro que deseas activar a ${userToToggle?.name}?`}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setUserToToggle(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmToggleEstado}
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                    userToToggle?.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestionUsuarios;
