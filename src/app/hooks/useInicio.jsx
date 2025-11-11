"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useInicio = () => {
  const [data, setData] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Extrae el token y headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  // Decodifica el payload del token JWT para leer el rol
  const getUserRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.role || payload.rol || payload.userType || null;
    } catch (err) {
      console.warn("No se pudo decodificar el token:", err);
      return null;
    }
  };

  // Llama al endpoint de estadísticas
  const fetchDashboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userRole = getUserRoleFromToken();
      setRole(userRole);

      const res = await axios.get(
        `${API_URL}/api/mantenimiento/estadisticas/dashboard`,
        {
          headers: getAuthHeaders(),
        }
      );

      // Estructura genérica del backend (admin, técnico o user)
      const dashboardData = res.data;

      setData({
        resumen: dashboardData.resumen,
        porEquipo: dashboardData.porEquipo,
        porMarca: dashboardData.porMarca,
        recientes: dashboardData.recientes,
        role: userRole,
      });
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError(err.response?.data?.message || "Error al cargar el dashboard");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { data, role, isLoading, error };
};