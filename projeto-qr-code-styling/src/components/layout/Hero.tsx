import { motion } from 'motion/react';

interface HeroProps {
  color?: string;
}

export default function Hero({ color = '#6a1a4c' }: HeroProps) {
  return (
    <section 
      className="py-16 px-6 text-white"
      style={{ 
        background: `linear-gradient(to bottom, #6a1a4c 0%, #ffffff 100%)` 
      }}
      id="hero-section"
    >
      <div className="max-w-7xl mx-auto text-left">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-display font-black mb-6 uppercase tracking-tight"
          id="hero-title"
        >
          QR Code Styling
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1"
          id="hero-description"
        >
          <p className="text-xl font-medium opacity-90">Uma biblioteca JS de código aberto</p>
          <p className="text-lg opacity-70">Para gerar códigos QR estilizados</p>
        </motion.div>
      </div>
    </section>
  );
}
