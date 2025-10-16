"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  LayoutGrid, 
  Wrench, 
  ClipboardList, 
  LogOut, 
  ChevronDown,
  Users
} from 'lucide-react';

// Importaciones dinámicas para usuario
const UserInicio = dynamic(() => import('./modules/user/Inicio'));
const UserMantenimientos = dynamic(() => import('./modules/user/Mantenimientos'));
const UserHistorial = dynamic(() => import('./modules/user/Historial'));

// Importaciones dinámicas para técnico
const TecnicoInicio = dynamic(() => import('./modules/tecnico/Inicio'));
const TecnicoDispositivos = dynamic(() => import('./modules/tecnico/Dispositivos'));
const TecnicoHistorial = dynamic(() => import('./modules/tecnico/Historial'));

// Importaciones dinámicas para admin
const AdminInicio = dynamic(() => import('./modules/admin/Inicio'));
const AdminGestionEquipos = dynamic(() => import('./modules/admin/GestionEquipos'));
const AdminGestionUsuarios = dynamic(() => import('./modules/admin/GestionUsuarios'));
const AdminEstadisticas = dynamic(() => import('./modules/admin/Estadisticas'));

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const NavigationMenu = () => {
    const menuItemsByRole = {
      'user': [
        { icon: <LayoutGrid />, label: 'Inicio', section: 'dashboard' },
        { icon: <Wrench />, label: 'Mantenimientos', section: 'maintenance' },
        { icon: <ClipboardList />, label: 'Historial', section: 'history' }
      ],
      'tecnico': [
        { icon: <LayoutGrid />, label: 'Inicio', section: 'dashboard' },
        { icon: <Wrench />, label: 'Dispositivos', section: 'maintenance' },
        { icon: <ClipboardList />, label: 'Historial', section: 'history' }
      ],
      'admin': [
        { icon: <LayoutGrid />, label: 'Inicio', section: 'dashboard' },
        { icon: <Wrench />, label: 'Equipos', section: 'equipment' },
        { icon: <Users />, label: 'Usuarios', section: 'users' },
        { icon: <ClipboardList />, label: 'Estadísticas', section: 'history' }
      ]
    };

    const menuItems = menuItemsByRole[user?.role] || [];

    return (
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-2 md:space-x-6 items-center bg-white shadow-sm rounded-full px-2 md:px-6 py-2"
      >
        {menuItems.map((item) => (
          <motion.button
            key={item.section}
            onClick={() => setActiveSection(item.section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center space-x-2 px-2 md:px-3 py-2 rounded-full transition-all
              ${activeSection === item.section 
                ? 'bg-green-500 text-white' 
                : 'hover:bg-gray-100 text-gray-600'
              }
            `}
          >
            {item.icon}
            <span className="hidden md:block text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </motion.nav>
    );
  };

  const UserProfile = () => {
    if (!user) return null;

    return (
      <div className="relative">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-full transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold shadow-md">
            {user.name[0].toUpperCase()}
          </div>
          <div className="text-left hidden md:block">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.button>

        {isProfileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-50 text-left text-red-500 hover:text-red-600 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50"
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-4">
          <div className="text-xl md:text-2xl font-bold text-green-600">LiveTech</div>
          <NavigationMenu />
          <UserProfile />
        </div>
      </motion.header>

      <main className="pt-24 px-4 md:px-6 container mx-auto">
        {user?.role === 'user' && (
          <>
            {activeSection === 'dashboard' && <UserInicio user={user} />}
            {activeSection === 'maintenance' && <UserMantenimientos />}
            {activeSection === 'history' && <UserHistorial />}
          </>
        )}

        {user?.role === 'tecnico' && (
          <>
            {activeSection === 'dashboard' && <TecnicoInicio user={user} />}
            {activeSection === 'maintenance' && <TecnicoDispositivos />}
            {activeSection === 'history' && <TecnicoHistorial />}
          </>
        )}

        {user?.role === 'admin' && (
          <>
            {activeSection === 'dashboard' && <AdminInicio user={user} />}
            {activeSection === 'equipment' && <AdminGestionEquipos />}
            {activeSection === 'users' && <AdminGestionUsuarios />}
            {activeSection === 'history' && <AdminEstadisticas />}
          </>
        )}
      </main>
    </div>
  );
}