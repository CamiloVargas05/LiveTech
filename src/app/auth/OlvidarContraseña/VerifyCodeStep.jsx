"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowRight, ArrowLeft, Headphones, Sparkles, RefreshCw } from 'lucide-react';

const VerifyCodeStep = ({ onNext, onBack, onResend, isLoading, email }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutos en segundos
  const inputRefs = useRef([]);

  // Temporizador de expiración
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Formatear tiempo restante
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Manejar cambio en inputs
  const handleChange = (index, value) => {
    // Solo permitir números
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Manejar tecla de retroceso
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Manejar pegado de código
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  // Enviar código
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    
    if (fullCode.length === 6) {
      onNext(fullCode);
    }
  };

  // Reenviar código
  const handleResend = () => {
    setCode(['', '', '', '', '', '']);
    setTimer(300);
    onResend();
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos */}
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
              <div className="absolute inset-0 bg-grid-white opacity-10"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
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
                    Verifica tu Código
                  </h2>
                  <p className="text-green-100 text-base lg:text-lg mb-8">
                    Hemos enviado un código de 6 dígitos a <strong className="text-white">{email}</strong>. Ingresa el código para continuar con la recuperación de tu contraseña.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-50">
                      <Shield className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Código único y seguro</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-50">
                      <Sparkles className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Válido por {formatTime(timer)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-green-100 mt-8">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs lg:text-sm">Paso 2 de 3</span>
                </div>
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Panel de Formulario */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
              
              <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  Live<span className="text-green-500">Tech</span>
                </span>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Ingresa el Código
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Revisa tu correo e ingresa los 6 dígitos que recibiste
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Inputs de código */}
                <div className="flex justify-center gap-2 md:gap-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 transition-all outline-none"
                      disabled={isLoading}
                    />
                  ))}
                </div>

                {/* Temporizador */}
                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Código válido por: <span className="font-bold text-green-600 dark:text-green-400">{formatTime(timer)}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                      El código ha expirado
                    </p>
                  )}
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || code.join('').length !== 6}
                    className={`group w-full text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2
                      ${isLoading || code.join('').length !== 6
                        ? 'bg-green-300 dark:bg-green-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700'
                      }`}
                  >
                    {isLoading ? 'Verificando...' : 'Verificar Código'}
                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isLoading}
                    className="w-full text-gray-700 dark:text-gray-300 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Volver
                  </button>
                </div>

                {/* Reenviar código */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading || timer > 0}
                    className={`text-sm font-semibold inline-flex items-center gap-2 transition-colors
                      ${timer > 0 
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                        : 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300'
                      }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    ¿No recibiste el código? Reenviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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

export default VerifyCodeStep;