"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { darkMode, toggleDarkMode, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (mounted) {
      console.log('🔵 Dark mode:', darkMode);
      console.log('🔵 HTML classes:', document.documentElement.className);
    }
  }, [darkMode, mounted]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    console.log('🎨 Toggle tema');
    toggleDarkMode();
    setIsOpen(false);
  };

  // No renderizar hasta que esté montado
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 border border-gray-200 w-10 h-10"></div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
        aria-label="Cambiar tema"
        type="button"
      >
        <div className="text-gray-700 dark:text-gray-200">
          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[9999]">
          <button
            onClick={handleToggle}
            type="button"
            className="w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" />
                <span className="font-medium text-sm">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="font-medium text-sm">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;