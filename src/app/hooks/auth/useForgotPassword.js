import { useState } from 'react';
import axios from 'axios';

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enviar código de recuperación al email
  const sendResetCode = async (email, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
        { email }
      );
      
      if (callbacks.onSuccess) {
        callbacks.onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al enviar el código';
      setError(errorMessage);
      
      if (callbacks.onError) {
        callbacks.onError(errorMessage);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar código de 6 dígitos
  const verifyCode = async (email, code, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-code`,
        { email, code }
      );
      
      if (callbacks.onSuccess) {
        callbacks.onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Código inválido o expirado';
      setError(errorMessage);
      
      if (callbacks.onError) {
        callbacks.onError(errorMessage);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Resetear contraseña con código verificado
  const resetPassword = async (resetData, callbacks = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validar que las contraseñas coincidan
      if (resetData.newPassword !== resetData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`,
        {
          email: resetData.email,
          code: resetData.code,
          newPassword: resetData.newPassword,
          confirmPassword: resetData.confirmPassword
        }
      );
      
      if (callbacks.onSuccess) {
        callbacks.onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al restablecer la contraseña';
      setError(errorMessage);
      
      if (callbacks.onError) {
        callbacks.onError(errorMessage);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendResetCode,
    verifyCode,
    resetPassword,
    isLoading,
    error
  };
};