"use client";
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import dynamic from 'next/dynamic';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

// Importar dinámicamente para evitar problemas de SSR
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: false,
});

function LayoutContent({ children, isDashboardRoute }) {
  return (
    <>
      {!isDashboardRoute && <Header />}
      <main>{children}</main>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error aplicando tema:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutContent isDashboardRoute={isDashboardRoute}>
            {children}
          </LayoutContent>
          
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}