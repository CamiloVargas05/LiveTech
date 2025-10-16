import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja el registro de nuevos usuarios
  const register = async (datosUsuario, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validación básica de contraseñas
      if (datosUsuario.password !== datosUsuario.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Eliminar campo de confirmación antes de enviar
      const { confirmPassword, ...datosRegistro } = datosUsuario;

      // Llamada a endpoint de registro
      const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, datosRegistro);
      
      // Ejecutar callback de éxito si está definido
      if (callbacks.onSuccess) {
        callbacks.onSuccess(respuesta.data);
      }

      return respuesta.data;
    } catch (error) {
      // Extraer mensaje de error de la respuesta
      const mensajeError = error.response?.data?.message || error.message || 'Error al registrar usuario';
      setError(mensajeError);
      
      // Notificar error mediante callback
      if (callbacks.onError) {
        callbacks.onError(mensajeError);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja el inicio de sesión de usuarios
  const login = async (credenciales, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Autenticar usuario
      const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credenciales);
      
      // Almacenar credenciales de sesión
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('user', JSON.stringify(respuesta.data.user));

      // Ejecutar callback de éxito
      if (callbacks.onSuccess) {
        callbacks.onSuccess(respuesta.data);
      }

      // Redirigir al dashboard
      router.push('/dashboard');

      return respuesta.data;
    } catch (error) {
      // Manejar errores de autenticación
      const mensajeError = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      setError(mensajeError);
      
      // Notificar error mediante callback
      if (callbacks.onError) {
        callbacks.onError(mensajeError);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cierra la sesión actual del usuario
  const logout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirigir al login
    router.push('/login');
  };

  return {
    register,
    login,
    logout,
    isLoading,
    error
  };
};