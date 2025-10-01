"use client";

import React, { useState } from 'react';
import { Menu, X, Headphones } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Live<span className="text-green-500">Tech</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-500 hover:to-green-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left px-4"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('quienes-somos')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left px-4"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left px-4"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="text-gray-700 hover:text-green-500 transition-colors font-medium text-left px-4"
              >
                Cómo Funciona
              </button>
              <button
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-500 hover:to-green-700 transition-all font-medium mx-4"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;