// useGestionEquipos.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export const useGestionEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchEquipos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/mantenimiento`, {
        headers: getAuthHeaders(),
      });
      setEquipos(response.data?.mantenimientos || []);
    } catch (error) {
      setError(error.response?.data?.message || "Error al cargar equipos");
      setEquipos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const crearEquipo = async (equipo) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(equipo).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post(`${API_URL}/api/mantenimiento`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchEquipos();
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrar equipo");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarEquipo = async (id, data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Crear FormData solo si hay foto nueva
      let payload;
      let headers = getAuthHeaders();

      if (data.foto) {
        payload = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          payload.append(key, value);
        });
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = data;
      }

      await axios.patch(`${API_URL}/api/mantenimiento/${id}`, payload, {
        headers,
      });

      await fetchEquipos();
    } catch (error) {
      setError(error.response?.data?.message || "Error al actualizar equipo");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarEquipo = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/api/mantenimiento/${id}`, {
        headers: getAuthHeaders(),
      });
      await fetchEquipos();
    } catch (error) {
      setError(error.response?.data?.message || "Error al eliminar equipo");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  return {
    equipos,
    isLoading,
    error,
    fetchEquipos,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo,
  };
};