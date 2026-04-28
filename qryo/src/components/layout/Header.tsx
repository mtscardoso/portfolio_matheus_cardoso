import React from 'react';
import Logo from './Logo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, LogIn, LogOut, User as UserIcon } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <header className="py-6 px-8">
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between p-6 transition-all duration-300"
        style={{
          borderRadius: '30px',
          background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          boxShadow: theme === 'dark' 
            ? '15px 15px 40px #0a0a0a, -15px -15px 40px #2a2a2a' 
            : '15px 15px 40px #d9d9d9, -15px -15px 40px #ffffff',
        }}
      >
        <Logo className="h-10" />
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-500">
            <a 
              href="https://www.npmjs.com/package/qr-code-styling" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}
            >
              npm v1.8.3
            </a>
            <span className="opacity-30">|</span>
            <a 
              href="https://github.com/denysvitali/qr-code-styling" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}
            >
              github
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.displayName}
                  </span>
                  <button 
                    onClick={() => logout()}
                    className="text-[8px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <LogOut size={10} /> Sair
                  </button>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full border-2 border-white/10 shadow-sm" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <UserIcon size={20} />
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => login()}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                  theme === 'dark' 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <LogIn size={14} /> Entrar
              </button>
            )}

            <button
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all duration-300 shadow-sm ${
                theme === 'dark' 
                  ? 'bg-white/5 text-yellow-400 hover:bg-white/10' 
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
