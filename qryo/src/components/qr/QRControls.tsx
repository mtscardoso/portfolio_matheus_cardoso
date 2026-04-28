import React, { useState } from 'react';
import { QRStylingOptions, DotType, CornerSquareType, CornerDotType } from '../../types/qr';
import { ChevronDown, ChevronUp, Image as ImageIcon, Palette, Settings, Square, Circle, LayoutGrid, ShieldCheck, Lock, EyeOff, Save, Trash2, Plus, FileText, Zap, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePresets } from '../../hooks/usePresets';
import { useRemoteConfig } from '../../context/RemoteConfigContext';
import JSZip from 'jszip';
import QRCodeStyling, { Options } from 'qr-code-styling';

interface QRControlsProps {
  options: QRStylingOptions;
  updateOptions: (newOptions: Partial<QRStylingOptions>) => void;
  updateDotsOptions: (newDotsOptions: Partial<QRStylingOptions['dotsOptions']>) => void;
  updateBackgroundOptions: (newBackgroundOptions: Partial<QRStylingOptions['backgroundOptions']>) => void;
  updateCornersSquareOptions: (newCornersSquareOptions: Partial<QRStylingOptions['cornersSquareOptions']>) => void;
  updateCornersDotOptions: (newCornersDotOptions: Partial<QRStylingOptions['cornersDotOptions']>) => void;
  updateImageOptions: (newImageOptions: Partial<QRStylingOptions['imageOptions']>) => void;
  privacyMode: boolean;
  setPrivacyMode: (mode: boolean) => void;
}

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
}

const AccordionItem = ({ title, icon, children, isOpen, onToggle, theme }: AccordionItemProps) => (
  <div 
    className="overflow-hidden mb-10 transition-all duration-300"
    style={{
      borderRadius: '43px',
      background: '#000000',
      boxShadow: theme === 'dark'
        ? '22px 22px 67px #0a0a0a, -22px -22px 67px #1a1a1a'
        : '22px 22px 67px #d9d9d9, -22px -22px 67px #ffffff',
    }}
  >
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-7 text-white hover:opacity-90 transition-opacity"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-white/10 rounded-xl">
          {icon}
        </div>
        <span className="text-sm font-black uppercase tracking-[0.2em]">{title}</span>
      </div>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div className="p-8 pt-0 space-y-6">
        {children}
      </div>
    )}
  </div>
);

export default function QRControls({
  options,
  updateOptions,
  updateDotsOptions,
  updateBackgroundOptions,
  updateCornersSquareOptions,
  updateCornersDotOptions,
  updateImageOptions,
  privacyMode,
  setPrivacyMode,
}: QRControlsProps) {
  const { theme } = useTheme();
  const { presets, savePreset, deletePreset } = usePresets();
  const { enableBatchGeneration } = useRemoteConfig();
  const [openSection, setOpenSection] = useState<string | null>('main');
  const [presetName, setPresetName] = useState('');
  const [batchData, setBatchData] = useState('');
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      savePreset(presetName, options);
      setPresetName('');
    }
  };

  const handleBatchGenerate = async () => {
    const urls = batchData.split('\n').map(u => u.trim()).filter(u => u !== '');
    if (urls.length === 0) return;

    setIsGeneratingBatch(true);
    const zip = new JSZip();
    
    try {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const qr = new QRCodeStyling({
          ...options,
          data: url,
        } as Options);
        
        const blob = await qr.getRawData('png');
        if (blob) {
          const fileName = `qr_${i + 1}_${url.replace(/[^a-z0-9]/gi, '_').substring(0, 20)}.png`;
          zip.file(fileName, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.download = `qryo_batch_${Date.now()}.zip`;
      downloadLink.click();
    } catch (error) {
      console.error('Batch generation failed', error);
    } finally {
      setIsGeneratingBatch(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateOptions({ image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Opções Principais */}
      <AccordionItem 
        title="Opções Principais" 
        icon={<Settings size={18} />} 
        isOpen={openSection === 'main'} 
        onToggle={() => toggleSection('main')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Conteúdo do QR Code</label>
            <input 
              type="text" 
              value={options.data}
              onChange={(e) => updateOptions({ data: e.target.value })}
              placeholder="https://exemplo.com"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Logotipo</label>
            <div className="flex flex-col gap-3">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
              />
              {options.image && (
                <button 
                  onClick={() => updateOptions({ image: undefined })}
                  className="w-fit px-4 py-2 bg-red-500/20 text-red-200 text-[10px] font-bold uppercase rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  Remover Arquivo
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Largura</label>
            <input 
              type="number" 
              value={options.width}
              onChange={(e) => updateOptions({ width: parseInt(e.target.value) })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Altura</label>
            <input 
              type="number" 
              value={options.height}
              onChange={(e) => updateOptions({ height: parseInt(e.target.value) })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Margem</label>
            <input 
              type="number" 
              value={options.margin}
              onChange={(e) => updateOptions({ margin: parseInt(e.target.value) })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
        </div>
      </AccordionItem>

      {/* Proteção de Privacidade */}
      <AccordionItem 
        title="Proteção de Privacidade" 
        icon={<ShieldCheck size={18} />} 
        isOpen={openSection === 'privacy'} 
        onToggle={() => toggleSection('privacy')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-start gap-3">
              <Lock className="text-green-400 mt-1" size={16} />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Processamento Local</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  Seus dados nunca saem do seu navegador. A geração do QR Code é feita 100% localmente, garantindo que URLs e informações sensíveis permaneçam privadas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <EyeOff size={16} className="text-gray-400" />
                <div>
                  <span className="block text-[10px] font-bold text-white uppercase">Modo Incógnito</span>
                  <span className="block text-[9px] text-gray-500">Limpa os dados após o download</span>
                </div>
              </div>
              <button 
                onClick={() => setPrivacyMode(!privacyMode)}
                className={`w-10 h-5 rounded-full transition-all relative ${privacyMode ? 'bg-green-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${privacyMode ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <p className="text-[9px] text-blue-200 leading-relaxed italic">
              "Privacidade não é um recurso, é um direito. O Qryo não armazena, rastreia ou compartilha nenhum dado inserido."
            </p>
          </div>
        </div>
      </AccordionItem>

      {/* Opções de Pontos */}
      <AccordionItem 
        title="Opções de Pontos" 
        icon={<LayoutGrid size={18} />} 
        isOpen={openSection === 'dots'} 
        onToggle={() => toggleSection('dots')}
        theme={theme}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Estilo de Pontos</label>
            <select 
              value={options.dotsOptions.type}
              onChange={(e) => updateDotsOptions({ type: e.target.value as DotType })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="square" className="bg-black text-white">Quadrado</option>
              <option value="dots" className="bg-black text-white">Pontos</option>
              <option value="rounded" className="bg-black text-white">Arredondado</option>
              <option value="extra-rounded" className="bg-black text-white">Extra Arredondado</option>
              <option value="classy" className="bg-black text-white">Elegante</option>
              <option value="classy-rounded" className="bg-black text-white">Elegante Arredondado</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Tipo de Cor</label>
            <div className="flex gap-6 py-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-300">
                <input 
                  type="radio" 
                  name="colorType" 
                  checked={!options.dotsOptions.gradient}
                  onChange={() => updateDotsOptions({ gradient: undefined })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                Cor Única
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-300">
                <input 
                  type="radio" 
                  name="colorType" 
                  checked={!!options.dotsOptions.gradient}
                  onChange={() => updateDotsOptions({ 
                    gradient: { 
                      type: 'linear', 
                      rotation: 0, 
                      colorStops: [
                        { offset: 0, color: options.dotsOptions.color || '#333333' },
                        { offset: 1, color: '#6a1a4c' }
                      ] 
                     } 
                  })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                Cor Gradiente
              </label>
            </div>
          </div>

          {!options.dotsOptions.gradient ? (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Pontos Coloridos</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={options.dotsOptions.color}
                  onChange={(e) => updateDotsOptions({ color: e.target.value })}
                  className="w-12 h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                />
                <input 
                  type="text" 
                  value={options.dotsOptions.color}
                  onChange={(e) => updateDotsOptions({ color: e.target.value })}
                  className="flex-grow p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 border-l-2 border-white/20 pl-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Tipo de Gradiente</label>
                <select 
                  value={options.dotsOptions.gradient.type}
                  onChange={(e) => updateDotsOptions({ 
                    gradient: { ...options.dotsOptions.gradient!, type: e.target.value as 'linear' | 'radial' } 
                  })}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                >
                  <option value="linear" className="bg-black text-white">Linear</option>
                  <option value="radial" className="bg-black text-white">Radial</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Cor 1</label>
                  <input 
                    type="color" 
                    value={options.dotsOptions.gradient.colorStops[0].color}
                    onChange={(e) => {
                      const newStops = [...options.dotsOptions.gradient!.colorStops];
                      newStops[0].color = e.target.value;
                      updateDotsOptions({ gradient: { ...options.dotsOptions.gradient!, colorStops: newStops } });
                    }}
                    className="w-full h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Cor 2</label>
                  <input 
                    type="color" 
                    value={options.dotsOptions.gradient.colorStops[1].color}
                    onChange={(e) => {
                      const newStops = [...options.dotsOptions.gradient!.colorStops];
                      newStops[1].color = e.target.value;
                      updateDotsOptions({ gradient: { ...options.dotsOptions.gradient!, colorStops: newStops } });
                    }}
                    className="w-full h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                  />
                </div>
              </div>

              {options.dotsOptions.gradient.type === 'linear' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Rotação ({options.dotsOptions.gradient.rotation}°)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={options.dotsOptions.gradient.rotation}
                    onChange={(e) => updateDotsOptions({ 
                      gradient: { ...options.dotsOptions.gradient!, rotation: parseInt(e.target.value) } 
                    })}
                    className="w-full accent-white"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </AccordionItem>

      {/* Opções de Cantos Quadrados */}
      <AccordionItem 
        title="Cantos Quadrados" 
        icon={<Square size={18} />} 
        isOpen={openSection === 'cornersSquare'} 
        onToggle={() => toggleSection('cornersSquare')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Estilo de Cantos Quadrados</label>
            <select 
              value={options.cornersSquareOptions.type}
              onChange={(e) => updateCornersSquareOptions({ type: e.target.value as CornerSquareType })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="none" className="bg-black text-white">Nenhum</option>
              <option value="square" className="bg-black text-white">Quadrado</option>
              <option value="dot" className="bg-black text-white">Ponto</option>
              <option value="extra-rounded" className="bg-black text-white">Extra Arredondado</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Tipo de Cor</label>
            <div className="flex gap-6 py-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-300">
                <input 
                  type="radio" 
                  name="cornerSquareColorType" 
                  checked={!options.cornersSquareOptions.gradient}
                  onChange={() => updateCornersSquareOptions({ gradient: undefined })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                Cor Única
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-300">
                <input 
                  type="radio" 
                  name="cornerSquareColorType" 
                  checked={!!options.cornersSquareOptions.gradient}
                  onChange={() => updateCornersSquareOptions({ 
                    gradient: { 
                      type: 'linear', 
                      rotation: 0, 
                      colorStops: [
                        { offset: 0, color: options.cornersSquareOptions.color || '#333333' },
                        { offset: 1, color: '#6a1a4c' }
                      ] 
                    } 
                  })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                Cor Gradiente
              </label>
            </div>
          </div>

          {!options.cornersSquareOptions.gradient ? (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Cor Quadrado de Cantos</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={options.cornersSquareOptions.color}
                  onChange={(e) => updateCornersSquareOptions({ color: e.target.value })}
                  className="w-12 h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                />
                <input 
                  type="text" 
                  value={options.cornersSquareOptions.color}
                  onChange={(e) => updateCornersSquareOptions({ color: e.target.value })}
                  className="flex-grow p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 border-l-2 border-white/20 pl-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Tipo de Gradiente</label>
                <select 
                  value={options.cornersSquareOptions.gradient.type}
                  onChange={(e) => updateCornersSquareOptions({ 
                    gradient: { ...options.cornersSquareOptions.gradient!, type: e.target.value as 'linear' | 'radial' } 
                  })}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                >
                  <option value="linear" className="bg-black text-white">Linear</option>
                  <option value="radial" className="bg-black text-white">Radial</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Cor 1</label>
                  <input 
                    type="color" 
                    value={options.cornersSquareOptions.gradient.colorStops[0].color}
                    onChange={(e) => {
                      const newStops = [...options.cornersSquareOptions.gradient!.colorStops];
                      newStops[0].color = e.target.value;
                      updateCornersSquareOptions({ gradient: { ...options.cornersSquareOptions.gradient!, colorStops: newStops } });
                    }}
                    className="w-full h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Cor 2</label>
                  <input 
                    type="color" 
                    value={options.cornersSquareOptions.gradient.colorStops[1].color}
                    onChange={(e) => {
                      const newStops = [...options.cornersSquareOptions.gradient!.colorStops];
                      newStops[1].color = e.target.value;
                      updateCornersSquareOptions({ gradient: { ...options.cornersSquareOptions.gradient!, colorStops: newStops } });
                    }}
                    className="w-full h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                  />
                </div>
              </div>

              {options.cornersSquareOptions.gradient.type === 'linear' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Rotação ({options.cornersSquareOptions.gradient.rotation}°)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={options.cornersSquareOptions.gradient.rotation}
                    onChange={(e) => updateCornersSquareOptions({ 
                      gradient: { ...options.cornersSquareOptions.gradient!, rotation: parseInt(e.target.value) } 
                    })}
                    className="w-full accent-white"
                  />
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => updateCornersSquareOptions({ color: '#333333', type: 'square', gradient: undefined })}
            className="w-full py-3 bg-white/10 text-white text-[10px] font-bold uppercase rounded-xl border border-white/20 hover:bg-white/20 transition-all mt-2"
          >
            Resetar Opções de Cantos
          </button>
        </div>
      </AccordionItem>

      {/* Opções de Pontos nos Cantos */}
      <AccordionItem 
        title="Pontos nos Cantos" 
        icon={<Circle size={18} />} 
        isOpen={openSection === 'cornersDot'} 
        onToggle={() => toggleSection('cornersDot')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Cor dos Pontos dos Cantos</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={options.cornersDotOptions.color}
                onChange={(e) => updateCornersDotOptions({ color: e.target.value })}
                className="w-12 h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
              />
              <input 
                type="text" 
                value={options.cornersDotOptions.color}
                onChange={(e) => updateCornersDotOptions({ color: e.target.value })}
                className="flex-grow p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Tipo de Ponto do Canto</label>
            <select 
              value={options.cornersDotOptions.type}
              onChange={(e) => updateCornersDotOptions({ type: e.target.value as CornerDotType })}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="square" className="bg-black text-white">Quadrado</option>
              <option value="dot" className="bg-black text-white">Ponto</option>
            </select>
          </div>
        </div>
      </AccordionItem>

      {/* Opções de Fundo */}
      <AccordionItem 
        title="Opções de Fundo" 
        icon={<Palette size={18} />} 
        isOpen={openSection === 'background'} 
        onToggle={() => toggleSection('background')}
        theme={theme}
      >
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400">Cor de Fundo</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={options.backgroundOptions.color}
              onChange={(e) => updateBackgroundOptions({ color: e.target.value })}
              className="w-12 h-12 p-1 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
            />
            <input 
              type="text" 
              value={options.backgroundOptions.color}
              onChange={(e) => updateBackgroundOptions({ color: e.target.value })}
              className="flex-grow p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
        </div>
      </AccordionItem>

      {/* Opções de Imagem */}
      <AccordionItem 
        title="Opções de Imagem" 
        icon={<ImageIcon size={18} />} 
        isOpen={openSection === 'image'} 
        onToggle={() => toggleSection('image')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Logotipo</label>
            <div className="flex flex-col gap-3">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
              />
              {options.image && (
                <button 
                  onClick={() => updateOptions({ image: undefined })}
                  className="w-fit px-4 py-2 bg-red-500/20 text-red-200 text-[10px] font-bold uppercase rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  Remover Imagem
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Margem</label>
              <input 
                type="number" 
                value={options.imageOptions.margin}
                onChange={(e) => updateImageOptions({ margin: parseInt(e.target.value) })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Tamanho (0-1)</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="1"
                value={options.imageOptions.imageSize}
                onChange={(e) => updateImageOptions({ imageSize: parseFloat(e.target.value) })}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* Meus Presets */}
      <AccordionItem 
        title="Meus Presets" 
        icon={<Save size={18} />} 
        isOpen={openSection === 'presets'} 
        onToggle={() => toggleSection('presets')}
        theme={theme}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-gray-400">Salvar Estilo Atual</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Nome do preset..."
                className="flex-grow p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button 
                onClick={handleSavePreset}
                className="p-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase text-gray-400">Estilos Salvos</label>
            {presets.length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">Nenhum estilo salvo ainda.</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {presets.map((preset) => (
                  <div key={preset.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group">
                    <span className="text-xs text-white font-medium">{preset.name}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateOptions(preset.options)}
                        className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        title="Aplicar"
                      >
                        <Zap size={14} />
                      </button>
                      <button 
                        onClick={() => deletePreset(preset.id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AccordionItem>

      {/* Geração em Massa */}
      {enableBatchGeneration && (
        <AccordionItem 
          title="Geração em Massa" 
          icon={<FileText size={18} />} 
          isOpen={openSection === 'batch'} 
          onToggle={() => toggleSection('batch')}
          theme={theme}
        >
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-start gap-3">
                <Zap className="text-yellow-400 mt-1" size={16} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Modo Turbo</h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                    Insira uma URL por linha. Todos os QR Codes usarão o estilo atual e serão baixados em um arquivo .ZIP.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400">Lista de URLs</label>
              <textarea 
                value={batchData}
                onChange={(e) => setBatchData(e.target.value)}
                placeholder="https://site1.com&#10;https://site2.com&#10;https://site3.com"
                rows={5}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none font-mono"
              />
            </div>

            <button 
              onClick={handleBatchGenerate}
              disabled={isGeneratingBatch || !batchData.trim()}
              className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                isGeneratingBatch || !batchData.trim()
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-100 shadow-lg'
              }`}
            >
              {isGeneratingBatch ? (
                <>
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Gerando ZIP...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Gerar e Baixar ZIP
                </>
              )}
            </button>
          </div>
        </AccordionItem>
      )}
    </div>
  );
}
