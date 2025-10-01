"use client";

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Headphones,
  CheckCircle,
  Sparkles,
  Phone,
  Building
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  // Animación de cambio entre login y registro
  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirmPassword: ''
      });
      setAcceptTerms(false);
    }, 400);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar términos en registro
    if (!isLogin && !acceptTerms) {
      alert('Debes aceptar los términos y condiciones para continuar');
      return;
    }
    
    console.log('Form submitted:', formData);
    router.push('/dashboard');
  };

  const features = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Seguimiento en tiempo real"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Chat con técnicos"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Transmisión en vivo"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Historial completo"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-6xl relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row relative">
            
            {/* Panel Informativo */}
            <div 
              className={`bg-gradient-to-br from-green-500 to-green-700 p-8 md:p-12 text-white overflow-hidden transition-all duration-700 ease-in-out
                hidden md:flex md:flex-col md:justify-between
                md:w-1/2 w-full md:absolute md:h-full z-10
              `}
              style={{
                transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
              }}
            >
              {/* Patrón de fondo */}
              <div className="absolute inset-0 bg-grid-white opacity-10"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Logo y bienvenida */}
                <div>
                  <div 
                    className="flex items-center space-x-3 mb-8 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => router.push('/')}
                  >
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Headphones className="w-8 h-8" />
                    </div>
                    <span className="text-3xl font-bold">
                      Live<span className="text-green-200">Tech</span>
                    </span>
                  </div>

                  <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {isLogin ? '¡Bienvenido de Nuevo!' : '¡Únete a LiveTech!'}
                    </h2>
                    <p className="text-green-100 text-base lg:text-lg mb-8">
                      {isLogin 
                        ? 'Accede a tu panel y gestiona tus tickets de soporte técnico en tiempo real'
                        : 'Crea tu cuenta y comienza a disfrutar de nuestro servicio de soporte innovador'
                      }
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 text-green-50 transform hover:translate-x-2 transition-transform duration-300"
                        >
                          <div className="text-green-300">
                            {feature.icon}
                          </div>
                          <span className="text-sm lg:text-base">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decoración inferior */}
                <div className="flex items-center gap-2 text-green-100 mt-8">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs lg:text-sm">Tecnología 2025 - Soporte del Futuro</span>
                </div>
              </div>

              {/* Círculos decorativos */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Panel de Formulario */}
            <div 
              className={`w-full md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out relative z-20 bg-white
                ${isLogin ? 'md:ml-auto' : 'md:mr-auto'}
              `}
            >
              {/* Logo móvil */}
              <div 
                className="md:hidden flex items-center justify-center space-x-2 mb-6 cursor-pointer"
                onClick={() => router.push('/')}
              >
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  Live<span className="text-green-500">Tech</span>
                </span>
              </div>

              {/* Título del formulario */}
              <div className={`mb-6 md:mb-8 transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm translate-x-8' : 'opacity-100 blur-0 translate-x-0'}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {isLogin 
                    ? 'Ingresa tus credenciales para acceder' 
                    : 'Completa el formulario para registrarte'
                  }
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className={`space-y-4 transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm translate-x-8' : 'opacity-100 blur-0 translate-x-0'}`}>
                
                {/* Nombre (solo registro) */}
                {!isLogin && (
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-sm md:text-base text-gray-900"
                        placeholder="Juan Pérez"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-sm md:text-base text-gray-900"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                {/* Teléfono (solo registro) */}
                {!isLogin && (
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-sm md:text-base text-gray-900"
                        placeholder="+57 300 123 4567"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Contraseña */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-sm md:text-base text-gray-900"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Contraseña (solo registro) */}
                {!isLogin && (
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-sm md:text-base text-gray-900"
                        placeholder="••••••••"
                        required={!isLogin}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Términos y Condiciones (solo registro) */}
                {!isLogin && (
                  <div className="flex items-start gap-3 py-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 mt-1 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                      required={!isLogin}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                      Acepto los{' '}
                      <a href="#" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                        Términos y Condiciones
                      </a>
                      {' '}y la{' '}
                      <a href="#" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                        Política de Privacidad
                      </a>
                    </label>
                  </div>
                )}

                {/* Recordar / Olvidé contraseña */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                        Recordarme
                      </span>
                    </label>
                    <a href="#" className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                )}

                {/* Botón Submit */}
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Toggle entre Login y Registro */}
              <div className={`mt-6 md:mt-8 text-center transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                <p className="text-gray-600 text-sm md:text-base">
                  {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                  <button
                    onClick={toggleMode}
                    className="ml-2 text-green-600 hover:text-green-700 font-bold transition-colors"
                  >
                    {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                  </button>
                </p>
              </div>

              {/* Divider */}
              <div className={`relative my-6 md:my-8 transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              {/* Botones sociales */}
              <div className={`grid grid-cols-2 gap-3 md:gap-4 transition-all duration-500 ${isAnimating ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium text-sm md:text-base">Google</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all group">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-gray-700 font-medium text-sm md:text-base">Facebook</span>
                </button>
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

export default Login;