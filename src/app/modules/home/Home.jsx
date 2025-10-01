"use client";

import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  MessageSquare, 
  Video, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap, 
  Shield,
  ArrowRight,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animación automática de los pasos
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Gestión Inteligente",
      description: "Sistema avanzado de tickets con seguimiento en tiempo real y estados dinámicos"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Chat Interactivo",
      description: "Comunicación directa entre usuarios y técnicos con confirmación bilateral"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Transmisión en Vivo",
      description: "Observa el trabajo del técnico mediante cámara corporal en tiempo real"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Transparencia Total",
      description: "Seguimiento completo del proceso desde la creación hasta la finalización"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Entrega tu Equipo",
      description: "Lleva tu equipo a nuestro centro. El administrador crea el ticket de reparación.",
      icon: <Monitor className="w-12 h-12" />
    },
    {
      number: "02",
      title: "Asignación Automática",
      description: "El administrador asigna tu caso al técnico más capacitado disponible.",
      icon: <Users className="w-12 h-12" />
    },
    {
      number: "03",
      title: "Proceso en Vivo",
      description: "Observa en tiempo real cómo el técnico trabaja en tu equipo mediante transmisión.",
      icon: <Video className="w-12 h-12" />
    },
    {
      number: "04",
      title: "Entrega y Reporte",
      description: "Recibe tu equipo reparado con un informe detallado del trabajo realizado.",
      icon: <CheckCircle className="w-12 h-12" />
    }
  ];

  const stats = [
    { number: "99%", label: "Satisfacción", icon: <Sparkles className="w-6 h-6" /> },
    { number: "24/7", label: "Disponibilidad", icon: <Clock className="w-6 h-6" /> },
    { number: "< 48h", label: "Tiempo Promedio", icon: <Zap className="w-6 h-6" /> },
    { number: "100%", label: "Transparencia", icon: <Shield className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section con animaciones */}
      <section 
        id="inicio" 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Elementos decorativos animados de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                ✨ Tecnología 2025 - Soporte del Futuro
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Soporte Técnico
              <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                en Tiempo Real
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Revolucionamos la gestión de tickets con transmisión en vivo, chat interactivo y transparencia total en cada paso del proceso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => router.push('/login')}
                className="group bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border-2 border-gray-200"
              >
                <PlayCircle className="w-5 h-5" />
                Ver Demo
              </button>
            </div>
          </div>

          {/* Stats Cards con animación */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-green-500 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Transformamos el
                <span className="block text-green-500">Soporte Técnico</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                LiveTech nace de la necesidad de modernizar la gestión de tickets de soporte técnico. Somos un equipo de profesionales comprometidos con la transparencia, eficiencia y la mejor experiencia del usuario.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra plataforma combina tecnología de vanguardia con herramientas de comunicación en tiempo real, permitiendo que usuarios, administradores y técnicos trabajen en perfecta sincronía.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Innovación Constante</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Soporte 24/7</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-2xl transform hover:rotate-2 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500 rounded-3xl shadow-2xl transform -rotate-6 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section con cards animadas */}
      <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Servicios que
              <span className="text-green-500"> Marcan la Diferencia</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas innovadoras diseñadas para optimizar cada etapa del proceso de soporte técnico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona Section con pasos interactivos */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo Funciona
              <span className="text-green-400"> LiveTech</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Un proceso simple, transparente y tecnológicamente avanzado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative transform transition-all duration-500 ${
                  activeStep === index 
                    ? 'scale-105' 
                    : 'scale-100 opacity-75'
                }`}
              >
                <div className={`bg-gradient-to-br ${
                  activeStep === index 
                    ? 'from-green-400 to-green-600' 
                    : 'from-gray-800 to-gray-700'
                } p-8 rounded-2xl shadow-2xl h-full transition-all duration-500`}>
                  <div className="text-6xl font-bold text-white/20 mb-4">
                    {step.number}
                  </div>
                  <div className="text-white mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-400"></div>
                )}
              </div>
            ))}
          </div>

          {/* Indicadores de paso */}
          <div className="flex justify-center gap-3 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-green-400 w-12' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-400 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Experimentar el Futuro del Soporte?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Únete a cientos de usuarios que ya confían en LiveTech para la gestión de sus equipos
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Iniciar Sesión Ahora
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* CSS personalizado para animaciones */}
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

export default Home;