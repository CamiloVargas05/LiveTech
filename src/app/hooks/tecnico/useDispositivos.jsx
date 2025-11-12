"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useDispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchDispositivos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/mantenimiento/mis-mantenimientos`, {
        headers: getAuthHeaders(),
      });
      const activos = (res.data?.mantenimientos || []).filter((d) => d.estado !== "finalizado");
      setDispositivos(activos);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar dispositivos");
      setDispositivos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDispositivos();
  }, []);

  const iniciarMantenimiento = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/api/mantenimiento/${id}/iniciar`, {}, { headers: getAuthHeaders() });
      setDispositivos((prev) =>
        prev.map((d) => (d.id === id ? { ...d, estado: "en_proceso" } : d))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar el mantenimiento");
    } finally {
      setIsLoading(false);
    }
  };

  return { dispositivos, isLoading, error, iniciarMantenimiento, fetchDispositivos };
};