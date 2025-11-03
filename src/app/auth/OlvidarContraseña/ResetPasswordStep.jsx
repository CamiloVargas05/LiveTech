"use client";

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, Headphones, Sparkles, Shield } from 'lucide-react';

const ResetPasswordStep = ({ onNext, isLoading, email, code }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  // Validar fortaleza de contraseña
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
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
                    Nueva Contraseña
                  </h2>
                  <p className="text-green-100 text-base lg:text-lg mb-8">
                    ¡Casi listo! Crea una nueva contraseña segura para proteger tu cuenta y volver a disfrutar de nuestros servicios.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-50">
                      <Shield className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Contraseña encriptada</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-50">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Mínimo 6 caracteres</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-50">
                      <Sparkles className="w-5 h-5 text-green-300" />
                      <span className="text-sm lg:text-base">Acceso inmediato</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-green-100 mt-8">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs lg:text-sm">Paso final - Último paso</span>
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
                  Restablecer Contraseña
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Crea una contraseña segura y memorable
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nueva Contraseña */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-2.5 md:py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 transition-all outline-none text-sm md:text-base"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Indicadores de fortaleza */}
                {formData.newPassword && (
                  <div className="space-y-2 px-1">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Requisitos de contraseña:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`flex items-center gap-2 text-xs ${passwordStrength.length ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        <CheckCircle className="w-4 h-4" />
                        <span>Mínimo 6 caracteres</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${passwordStrength.number ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        <CheckCircle className="w-4 h-4" />
                        <span>Contiene números</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${passwordStrength.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        <CheckCircle className="w-4 h-4" />
                        <span>Mayúsculas</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${passwordStrength.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        <CheckCircle className="w-4 h-4" />
                        <span>Minúsculas</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmar Contraseña */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-2.5 md:py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 transition-all outline-none text-sm md:text-base"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Validación de coincidencia */}
                {formData.confirmPassword && (
                  <div className={`flex items-center gap-2 text-sm px-1 ${
                    formData.newPassword === formData.confirmPassword
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {formData.newPassword === formData.confirmPassword
                        ? 'Las contraseñas coinciden'
                        : 'Las contraseñas no coinciden'
                      }
                    </span>
                  </div>
                )}

                {/* Botón Submit */}
                <button
                  type="submit"
                  disabled={isLoading || formData.newPassword !== formData.confirmPassword || !passwordStrength.length}
                  className={`group w-full text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mt-6
                    ${isLoading || formData.newPassword !== formData.confirmPassword || !passwordStrength.length
                      ? 'bg-green-300 dark:bg-green-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700'
                    }`}
                >
                  {isLoading ? 'Actualizando...' : 'Restablecer Contraseña'}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center">
                  <strong className="text-green-600 dark:text-green-400">Importante:</strong> Tu contraseña será encriptada y nunca será compartida.
                </p>
              </div>
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

export default ResetPasswordStep;