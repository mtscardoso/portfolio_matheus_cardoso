interface ImageOptionsProps {
  hideBackgroundDots: boolean;
  setHideBackgroundDots: (val: boolean) => void;
  imageMargin: number;
  setImageMargin: (val: number) => void;
}

export default function ImageOptions({ 
  hideBackgroundDots, setHideBackgroundDots, 
  imageMargin, setImageMargin 
}: ImageOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-300" id="image-options-container">
      {/* Esconder pontos atrás da imagem */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Interação com Pontos</label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-12 h-6 bg-brand-dark/10 rounded-full transition-colors group-hover:bg-brand-dark/20">
            <input 
              type="checkbox" 
              checked={hideBackgroundDots}
              onChange={(e) => setHideBackgroundDots(e.target.checked)}
              className="sr-only"
            />
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${hideBackgroundDots ? 'translate-x-6 bg-brand-dark' : ''}`}></div>
          </div>
          <span className="text-sm font-medium">Esconder pontos atrás da imagem</span>
        </label>
      </div>

      {/* Margem da Imagem */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Margem da Imagem (px)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={imageMargin}
            onChange={(e) => setImageMargin(Number(e.target.value))}
            className="flex-grow accent-brand-dark"
          />
          <span className="text-sm font-mono bg-white border border-brand-dark/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
            {imageMargin}
          </span>
        </div>
        <p className="text-[10px] opacity-50 italic">Controla o espaço vazio ao redor do logo central.</p>
      </div>
    </div>
  );
}
