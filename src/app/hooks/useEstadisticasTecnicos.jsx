"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useEstadisticasTecnicos = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_URL}/api/mantenimiento`, {
          headers: getAuthHeaders(),
        });

        const lista = res.data.mantenimientos || [];

        setMantenimientos(lista);

        const tecnicosUnicos = Array.from(
          new Map(lista.map((m) => [m.tecnico.id, m.tecnico])).values()
        );

        setTecnicos(tecnicosUnicos);
      } catch (err) {
        setError("Error al cargar estadísticas de técnicos");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { mantenimientos, tecnicos, isLoading, error };
};