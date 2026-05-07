import React, { useEffect, useRef } from 'react';
import QRCodeStyling, { Options, FileExtension } from 'qr-code-styling';
import { QRStylingOptions } from '../../types/qr';
import { useTheme } from '../../context/ThemeContext';

import { ShieldCheck, Lock } from 'lucide-react';

interface QRPreviewProps {
  options: QRStylingOptions;
  privacyMode: boolean;
  onAfterDownload: () => void;
}

export default function QRPreview({ options, privacyMode, onAfterDownload }: QRPreviewProps) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling(options as Options));

  useEffect(() => {
    if (ref.current) {
      qrCode.current.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCode.current.update(options as Options);
  }, [options]);

  const onDownload = (extension: FileExtension) => {
    qrCode.current.download({ extension });
    onAfterDownload();
  };

  const onExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(options));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    onAfterDownload();
  };

  return (
    <div className="sticky top-8 space-y-8">
      <div 
        className="p-10 aspect-square flex flex-col items-center justify-center overflow-hidden relative transition-all duration-300"
        style={{
          borderRadius: '43px',
          background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          boxShadow: theme === 'dark'
            ? '22px 22px 67px #0a0a0a, -22px -22px 67px #2a2a2a'
            : '22px 22px 67px #d9d9d9, -22px -22px 67px #ffffff',
        }}
      >
        {privacyMode && (
          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full animate-pulse">
            <ShieldCheck size={12} className="text-green-500" />
            <span className={`text-[8px] font-black uppercase tracking-widest ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>Privacidade Ativa</span>
          </div>
        )}
        
        <div ref={ref} className="bg-white p-4 rounded-3xl shadow-inner" />
        
        <div className={`mt-6 flex items-center gap-2 transition-colors ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <Lock size={12} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Processamento Local Seguro</span>
        </div>
      </div>
      
      <div 
        className="p-8 space-y-6 transition-all duration-300"
        style={{
          borderRadius: '35px',
          background: '#000000',
          boxShadow: theme === 'dark'
            ? '15px 15px 40px #0a0a0a, -15px -15px 40px #2a2a2a'
            : '15px 15px 40px #d9d9d9, -15px -15px 40px #ffffff',
        }}
      >
        <div className="flex justify-around gap-4">
          {['png', 'jpeg', 'svg'].map((ext) => (
            <button 
              key={ext}
              onClick={() => onDownload(ext as FileExtension)}
              className="flex-1 px-4 py-3 bg-white/10 text-white text-[10px] font-black rounded-xl uppercase border border-white/20 hover:bg-white/20 transition-all tracking-widest"
            >
              {ext === 'jpeg' ? 'JPG' : ext.toUpperCase()}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onExportJSON}
          className="w-full px-4 py-4 bg-white text-black text-[10px] font-black rounded-xl uppercase hover:bg-gray-100 transition-all tracking-[0.2em] shadow-lg"
        >
          Exportar Configuração JSON
        </button>
      </div>
    </div>
  );
}
