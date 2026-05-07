import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useRemoteConfig } from '../../context/RemoteConfigContext';

interface HeroProps {
  dotColor?: string;
}

export default function Hero({ dotColor = '#333333' }: HeroProps) {
  const { theme } = useTheme();
  const { heroTitleSuffix } = useRemoteConfig();

  return (
    <section 
      className="py-24 text-center w-full overflow-hidden transition-all duration-300"
      style={{ 
        borderRadius: '43px',
        background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        boxShadow: theme === 'dark'
          ? 'inset 12px 12px 23px #0a0a0a, inset -12px -12px 23px #2a2a2a'
          : 'inset 12px 12px 23px #d9d9d9, inset -12px -12px 23px #ffffff'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col items-center"
      >
        <div className="p-4">
          <h2 
            className={`text-6xl md:text-8xl font-black mb-8 transition-all duration-500 uppercase tracking-tighter ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Qryo{heroTitleSuffix}
          </h2>
          <div className="space-y-4 flex flex-col items-center">
            <p className={`text-2xl font-black uppercase tracking-[0.2em] leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Sua identidade visual <br /> em cada pixel
            </p>
            <p className={`text-xl font-medium max-w-2xl ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Personalização premium para marcas que buscam destaque através de QR Codes únicos e memoráveis.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
