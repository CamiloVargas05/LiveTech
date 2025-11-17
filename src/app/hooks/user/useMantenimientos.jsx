"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useMantenimientos = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchMantenimientos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/mantenimiento/mis-mantenimientos`, {
        headers: getAuthHeaders(),
      });
      const activos = (res.data?.mantenimientos || []).filter(m => m.estado !== "finalizado");
      setMantenimientos(activos);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar mantenimientos");
      setMantenimientos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMantenimientos();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "mantenimientoFinalizadoUsuario") {
        fetchMantenimientos();
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { mantenimientos, isLoading, error, fetchMantenimientos };
};