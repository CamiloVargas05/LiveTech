"use client";
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  // Asegúrate de que detecte correctamente las rutas de dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {!isDashboardRoute && <Header />}
        
        <main>{children}</main>
        
        {!isDashboardRoute && <Footer />}
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}