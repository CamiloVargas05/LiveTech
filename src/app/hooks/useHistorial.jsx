"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useHistorial = () => {
  const [data, setData] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const getUserRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.role || payload.rol || payload.userType || null;
    } catch {
      return null;
    }
  };

  const fetchHistorial = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userRole = getUserRoleFromToken();
      setRole(userRole);

      const res = await axios.get(
        `${API_URL}/api/mantenimiento/historial/completados`,
        {
          headers: getAuthHeaders(),
        }
      );

      const historialData = res.data;

      setData({
        estadisticas: historialData.estadisticas,
        historial: historialData.historial,
        role: userRole,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar el historial");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return { data, role, isLoading, error };
};