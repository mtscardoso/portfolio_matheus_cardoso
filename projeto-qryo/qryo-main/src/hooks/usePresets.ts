import { useState, useEffect } from 'react';
import { QRStylingOptions } from '../types/qr';

export interface Preset {
  id: string;
  name: string;
  options: QRStylingOptions;
  createdAt: number;
}

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('qryo_presets');
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse presets', e);
      }
    }
  }, []);

  const savePreset = (name: string, options: QRStylingOptions) => {
    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name,
      options,
      createdAt: Date.now(),
    };
    const updated = [newPreset, ...presets];
    setPresets(updated);
    localStorage.setItem('qryo_presets', JSON.stringify(updated));
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    setPresets(updated);
    localStorage.setItem('qryo_presets', JSON.stringify(updated));
  };

  return { presets, savePreset, deletePreset };
}
