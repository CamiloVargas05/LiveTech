"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Save,
  Trash2,
  Edit,
  Monitor,
  Image as ImageIcon,
  Search,
  XCircle,
  Loader2,
} from "lucide-react";
import { useGestionEquipos } from "@/app/hooks/admin/useGestionEquipos";
import axios from "axios";
import { toast } from "react-toastify";

const GestionEquipos = () => {
  const {
    equipos,
    isLoading,
    error,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo,
  } = useGestionEquipos();

  const [formData, setFormData] = useState({
    nombreEquipo: "",
    marca: "",
    modelo: "",
    descripcionProblema: "",
    usuarioId: "",
    tecnicoId: "",
    foto: null,
  });

  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState([]);
  const [queryUsuario, setQueryUsuario] = useState("");
  const [queryTecnico, setQueryTecnico] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [buscar, setBuscar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [equipoAEliminar, setEquipoAEliminar] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(res.data?.users || []);
      } catch {}
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    setFilteredUsuarios(
      usuarios.filter(
        (u) =>
          u.role === "user" &&
          (u.name.toLowerCase().includes(queryUsuario.toLowerCase()) ||
            u.email.toLowerCase().includes(queryUsuario.toLowerCase()))
      )
    );
  }, [queryUsuario, usuarios]);

  useEffect(() => {
    setFilteredTecnicos(
      usuarios.filter(
        (u) =>
          u.role === "tecnico" &&
          (u.name.toLowerCase().includes(queryTecnico.toLowerCase()) ||
            u.email.toLowerCase().includes(queryTecnico.toLowerCase()))
      )
    );
  }, [queryTecnico, usuarios]);

  const equiposFiltrados = useMemo(() => {
    return equipos.filter((e) =>
      e.nombreEquipo.toLowerCase().includes(buscar.toLowerCase())
    );
  }, [equipos, buscar]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      if (editingId) {
        await actualizarEquipo(editingId, formData);
        toast.success("Equipo actualizado exitosamente");
      } else {
        await crearEquipo(formData);
        toast.success("Equipo registrado exitosamente");
      }
      resetForm();
    } finally {
      setLoadingAction(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreEquipo: "",
      marca: "",
      modelo: "",
      descripcionProblema: "",
      usuarioId: "",
      tecnicoId: "",
      foto: null,
    });
    setPreview(null);
    setEditingId(null);
    setQueryUsuario("");
    setQueryTecnico("");
  };

  const handleEdit = (equipo) => {
    setEditingId(equipo.id);
    setFormData({
      nombreEquipo: equipo.nombreEquipo,
      marca: equipo.marca,
      modelo: equipo.modelo,
      descripcionProblema: equipo.descripcionProblema,
      usuarioId: equipo.usuarioId,
      tecnicoId: equipo.tecnicoId,
      foto: null,
    });
    setPreview(equipo.fotoUrl || null);
  };

  const handleDelete = (equipo) => {
    setEquipoAEliminar(equipo);
    setShowModal(true);
  };

  const confirmarEliminacion = async () => {
    if (!equipoAEliminar) return;
    setLoadingAction(true);
    try {
      await eliminarEquipo(equipoAEliminar.id);
      toast.success("Equipo eliminado correctamente");
      setShowModal(false);
      setEquipoAEliminar(null);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFormData({ ...formData, foto: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 transition-colors duration-500 relative">
      
      {loadingAction && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="w-12 h-12 animate-spin text-green-600" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 mb-8"
      >
        <Wrench className="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Gestión de Equipos
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nombre para el mantenimiento
              </label>
              <input
                type="text"
                name="nombreEquipo"
                value={formData.nombreEquipo}
                onChange={handleChange}
                placeholder="Ej: Laptop Dell"
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Ej: Dell"
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  placeholder="Ej: Inspiron 15"
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Descripción del Problema
              </label>
              <textarea
                name="descripcionProblema"
                value={formData.descripcionProblema}
                onChange={handleChange}
                rows="3"
                placeholder="Ej: No enciende, posible daño de batería"
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={queryUsuario}
                onChange={(e) => setQueryUsuario(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <select
                name="usuarioId"
                value={formData.usuarioId}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                required
              >
                <option value="">Seleccionar Usuario</option>
                {filteredUsuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Técnico
              </label>
              <input
                type="text"
                placeholder="Buscar técnico..."
                value={queryTecnico}
                onChange={(e) => setQueryTecnico(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <select
                name="tecnicoId"
                value={formData.tecnicoId}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 focus:border-green-500 outline-none"
                required
              >
                <option value="">Seleccionar Técnico</option>
                {filteredTecnicos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Foto del Equipo
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                  <ImageIcon className="w-5 h-5" />
                  <span>{preview ? "Cambiar" : "Seleccionar"}</span>
                  <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
                {preview && (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-16 h-16 rounded-lg object-cover border dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? "Actualizar Equipo" : "Registrar Equipo"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-green-500" />
              Equipos Registrados
            </h2>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar equipo..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
          ) : equiposFiltrados.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No hay equipos registrados.
            </p>
          ) : (
            <div className="space-y-4">
              {equiposFiltrados.map((equipo) => (
                <motion.div
                  key={equipo.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center gap-4">
                    {equipo.fotoUrl && (
                      <img
                        src={equipo.fotoUrl}
                        alt={equipo.nombreEquipo}
                        className="w-14 h-14 object-cover rounded-lg border dark:border-gray-600"
                      />
                    )}

                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {equipo.nombreEquipo}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {equipo.marca} - {equipo.modelo}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {equipo.descripcionProblema}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(equipo)}
                      className="text-blue-500 hover:text-blue-400 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(equipo)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-5 h-5" />
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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm text-center relative"
            >
              {loadingAction && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                  <Loader2 className="w-10 h-10 animate-spin text-white" />
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                ¿Eliminar mantenimiento?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Esta acción no se puede deshacer.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmarEliminacion}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GestionEquipos;