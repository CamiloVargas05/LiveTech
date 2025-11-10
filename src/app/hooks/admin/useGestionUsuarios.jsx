import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Obtener token desde localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };

  // 🔹 Obtener todos los usuarios
  const fetchUsuarios = async (callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const respuesta = await axios.get(`${API_URL}/api/users`, getAuthHeaders());
      setUsuarios(respuesta.data.users || []);

      if (callbacks.onSuccess) callbacks.onSuccess(respuesta.data);
      return respuesta.data;
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || error.message || 'Error al obtener usuarios';
      setError(mensajeError);
      if (callbacks.onError) callbacks.onError(mensajeError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Crear nuevo usuario
  const crearUsuario = async (nuevoUsuario, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const respuesta = await axios.post(
        `${API_URL}/api/users`,
        nuevoUsuario,
        getAuthHeaders()
      );
      await fetchUsuarios();

      if (callbacks.onSuccess) callbacks.onSuccess(respuesta.data);
      return respuesta.data;
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || error.message || 'Error al crear usuario';
      setError(mensajeError);
      if (callbacks.onError) callbacks.onError(mensajeError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Actualizar usuario (editar o cambiar estado)
  const actualizarUsuario = async (id, data, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const respuesta = await axios.patch(
        `${API_URL}/api/users/${id}`,
        data,
        getAuthHeaders()
      );
      await fetchUsuarios();

      if (callbacks.onSuccess) callbacks.onSuccess(respuesta.data);
      return respuesta.data;
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || error.message || 'Error al actualizar usuario';
      setError(mensajeError);
      if (callbacks.onError) callbacks.onError(mensajeError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    isLoading,
    error,
    fetchUsuarios,
    crearUsuario,
    actualizarUsuario,
  };
};