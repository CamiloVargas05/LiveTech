"use client";

import React from 'react';
import { Headphones, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Live<span className="text-green-400">Tech</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Gestión de tickets de soporte técnico en tiempo real. Transparencia, eficiencia y tecnología al servicio de tu equipo.
            </p>
            {/* Redes Sociales */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-green-400 transition-colors text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#quienes-somos" className="hover:text-green-400 transition-colors text-sm">
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-green-400 transition-colors text-sm">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-green-400 transition-colors text-sm">
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-green-400 transition-colors text-sm">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-sm">Soporte Técnico en Tiempo Real</li>
              <li className="text-sm">Gestión de Tickets</li>
              <li className="text-sm">Chat Interactivo</li>
              <li className="text-sm">Transmisión en Vivo</li>
              <li className="text-sm">Seguimiento de Estado</li>
              <li className="text-sm">Reportes de Reparación</li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Calle Principal #123<br />
                  Neiva, Huila, Colombia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm">+57 (300) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm">contacto@livetech.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">
              © {currentYear} LiveTech. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-green-400 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;