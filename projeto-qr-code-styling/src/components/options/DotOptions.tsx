interface DotOptionsProps {
  color: string;
  setColor: (val: string) => void;
  type: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  setType: (val: any) => void;
  colorType: 'single' | 'gradient';
  setColorType: (val: 'single' | 'gradient') => void;
  gradientColor1: string;
  setGradientColor1: (val: string) => void;
  gradientColor2: string;
  setGradientColor2: (val: string) => void;
}

export default function DotOptions({ 
  color, setColor, 
  type, setType,
  colorType, setColorType,
  gradientColor1, setGradientColor1,
  gradientColor2, setGradientColor2
}: DotOptionsProps) {
  const dotTypes = [
    { id: 'square', label: 'Quadrado' },
    { id: 'dots', label: 'Pontos' },
    { id: 'rounded', label: 'Arredondado' },
    { id: 'extra-rounded', label: 'Extra Arredondado' },
    { id: 'classy', label: 'Elegante' },
    { id: 'classy-rounded', label: 'Elegante Arredondado' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300" id="dot-options-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seletor de Estilo */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Estilo de Pontos</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-dark/20 appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
          >
            {dotTypes.map(dt => (
              <option key={dt.id} value={dt.id}>{dt.label}</option>
            ))}
          </select>
        </div>

        {/* Tipo de Cor */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Tipo de Cor</label>
          <div className="flex flex-col gap-3 py-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="colorType"
                  checked={colorType === 'single'}
                  onChange={() => setColorType('single')}
                  className="peer appearance-none w-5 h-5 border-2 border-brand-dark/20 rounded-full checked:border-brand-dark transition-all cursor-pointer"
                />
                <div className="absolute w-2.5 h-2.5 bg-brand-dark rounded-full transform scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">COR ÚNICA</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="colorType"
                  checked={colorType === 'gradient'}
                  onChange={() => setColorType('gradient')}
                  className="peer appearance-none w-5 h-5 border-2 border-brand-dark/20 rounded-full checked:border-brand-dark transition-all cursor-pointer"
                />
                <div className="absolute w-2.5 h-2.5 bg-brand-dark rounded-full transform scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">GRADIENTE</span>
            </label>
          </div>
        </div>
      </div>

      {/* Seletores de Cores */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Pontos Coloridos</label>
        
        {colorType === 'single' ? (
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border border-brand-dark/10 bg-white p-1 shadow-sm"
            />
            <input 
              type="text" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-grow bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase opacity-40 font-bold">Início</span>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-brand-dark/10 bg-white p-1"
                />
                <input 
                  type="text" 
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="w-full bg-white border border-brand-dark/10 rounded-lg px-3 py-1.5 text-xs font-mono outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase opacity-40 font-bold">Fim</span>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-brand-dark/10 bg-white p-1"
                />
                <input 
                  type="text" 
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="w-full bg-white border border-brand-dark/10 rounded-lg px-3 py-1.5 text-xs font-mono outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
