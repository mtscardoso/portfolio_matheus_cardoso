import { X, Upload } from 'lucide-react';
import React from 'react';

interface MainOptionsProps {
  data: string;
  setData: (val: string) => void;
  width: number;
  setWidth: (val: number) => void;
  height: number;
  setHeight: (val: number) => void;
  margin: number;
  setMargin: (val: number) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileCancel: () => void;
  fileName: string | null;
}

export default function MainOptions({
  data, setData,
  width, setWidth,
  height, setHeight,
  margin, setMargin,
  onFileChange, onFileCancel,
  fileName
}: MainOptionsProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300" id="main-options-container">
      {/* Dados do QR Code */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Dados (URL ou Texto)</label>
        <input 
          type="text" 
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-dark/20 outline-none transition-all"
          id="input-qr-data"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Escolha de Arquivo (Logo/Imagem) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Logo / Imagem Central</label>
          <div className="flex items-center gap-2">
            <label className="flex-grow flex items-center justify-center gap-2 bg-white border border-brand-dark/10 border-dashed rounded-lg px-4 py-2 cursor-pointer hover:bg-brand-dark/5 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm truncate">{fileName || 'Escolher arquivo'}</span>
              <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
            </label>
            {fileName && (
              <button 
                onClick={onFileCancel}
                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                title="Cancelar escolha"
                id="btn-cancel-file"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dimensões e Margem */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Largura</label>
            <input 
              type="number" 
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-dark/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Altura</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-dark/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Margem</label>
            <input 
              type="number" 
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-dark/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
