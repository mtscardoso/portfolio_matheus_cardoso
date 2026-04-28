import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-8">
      <div 
        className="max-w-7xl mx-auto p-8 text-center transition-all duration-300"
        style={{
          borderRadius: '30px',
          background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          boxShadow: theme === 'dark' 
            ? '15px 15px 40px #0a0a0a, -15px -15px 40px #2a2a2a' 
            : '15px 15px 40px #d9d9d9, -15px -15px 40px #ffffff',
        }}
      >
        <p className={`font-bold uppercase tracking-widest text-xs transition-colors ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Qryo &copy; {currentYear} | Crafted with Vibecoding
        </p>
      </div>
    </footer>
  );
}
