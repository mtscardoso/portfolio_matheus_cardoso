interface BackgroundOptionsProps {
  color: string;
  setColor: (val: string) => void;
}

export default function BackgroundOptions({ color, setColor }: BackgroundOptionsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300" id="background-options-container">
      {/* Seletor de Cor */}
      <div className="space-y-2 max-w-md">
        <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Cor de Fundo</label>
        <div className="flex items-center gap-3">
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border border-brand-dark/10 bg-white p-1"
          />
          <input 
            type="text" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="flex-grow bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm font-mono outline-none"
          />
        </div>
        <p className="text-[10px] opacity-50 italic">Dica: Use branco (#ffffff) para melhor legibilidade na maioria dos leitores.</p>
      </div>
    </div>
  );
}
