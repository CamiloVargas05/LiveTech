"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Headphones, Sparkles, Shield, AlertCircle } from 'lucide-react';

const RequestCodeStep = ({ onNext, onBack, isLoading, email, setEmail }) => {
  const [localEmail, setLocalEmail] = useState(email || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(localEmail)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setEmail(localEmail);
    
    // Intentar enviar el código
    try {
      await onNext(localEmail);
    } catch (err) {
      // El error ya se maneja en el componente padre con toast
      // Pero podemos mostrar un mensaje adicional en el componente
      setError('Verifica que el correo esté registrado');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 dark:bg-green-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 dark:bg-green-950 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-6xl relative">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row">
            
            {/* Panel Informativo */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 dark:from-green-600 dark:to-green-900 p-8 md:p-12 text-white w-full md:w-1/2 relative overflow-hidden">
              
              {/* Patrón de fondo */}
              <div className="absolute inset-0 bg-grid-white opacity-10"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Logo y título */}
                <div>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Headphones className="w-8 h-8" />
                    </div>
                    <span className="text-3xl font-bold">
                      Live<span className="text-green-200">Tech</span>
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    ¿Olvidaste tu Contraseña?
                  </h2>
                  <p className="text-green-100 text-base lg:text-lg mb-8">
                    No te preocupes, te enviaremos un código de verificación de 6 dígitos a tu correo electrónico para que puedas recuperar tu cuenta de forma segura.
                  </p>

                  {/* Características de seguridad */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-50">
                      <Shield className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Proceso 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-50">
                      <Mail className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Código válido por 15 minutos</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-50">
                      <Sparkles className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Recuperación instantánea</span>
                    </div>
                  </div>
                </div>

                {/* Decoración inferior */}
                <div className="flex items-center gap-2 text-green-100 mt-8">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs lg:text-sm">Protegemos tu información</span>
                </div>
              </div>

              {/* Círculos decorativos */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Panel de Formulario */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
              
              {/* Logo móvil */}
              <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  Live<span className="text-green-500">Tech</span>
                </span>
              </div>

              {/* Título del formulario */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Recuperar Contraseña
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Ingresa tu correo electrónico y te enviaremos un código de verificación
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 
                      ${error 
                        ? 'text-red-400 dark:text-red-500' 
                        : 'text-gray-400 dark:text-gray-500 group-focus-within:text-green-500'
                      }`} 
                    />
                    <input
                      type="email"
                      value={localEmail}
                      onChange={(e) => {
                        setLocalEmail(e.target.value);
                        setError(''); // Limpiar error al escribir
                      }}
                      className={`w-full pl-12 pr-4 py-2.5 md:py-3 border-2 rounded-xl transition-all outline-none text-sm md:text-base
                        ${error
                          ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900'
                          : 'border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900'
                        }
                        dark:bg-gray-700 dark:text-white
                      `}
                      placeholder="correo@ejemplo.com"
                      required
                      disabled={isLoading}
                    />
                    {error && (
                      <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Mensaje de error */}
                  {error && (
                    <div className="mt-2 flex items-start gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || !localEmail}
                    className={`group w-full text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2
                      ${isLoading || !localEmail
                        ? 'bg-green-500 dark:bg-green-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Código</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isLoading}
                    className="w-full text-gray-700 dark:text-gray-300 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Volver al Login
                  </button>
                </div>
              </form>

              {/* Información adicional */}
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center">
                  <strong className="text-green-600 dark:text-green-400">Consejo:</strong> Revisa tu carpeta de spam si no recibes el correo en unos minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS personalizado */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-white {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default RequestCodeStep;