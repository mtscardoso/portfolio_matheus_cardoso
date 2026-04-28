import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import { useTheme } from '../../context/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
  dotColor?: string;
}

export default function MainLayout({ children, dotColor }: MainLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-[#ffffff] text-gray-900'
    }`}>
      <Header />
      <Hero dotColor={dotColor} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
