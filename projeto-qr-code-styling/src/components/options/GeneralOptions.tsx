import { ErrorCorrectionLevel } from 'qr-code-styling';

interface GeneralOptionsProps {
  errorCorrectionLevel: ErrorCorrectionLevel;
  setErrorCorrectionLevel: (val: ErrorCorrectionLevel) => void;
}

export default function GeneralOptions({ errorCorrectionLevel, setErrorCorrectionLevel }: GeneralOptionsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300" id="general-options-container">
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 tracking-wider">Nível de Correção de Erro</label>
          <select 
            value={errorCorrectionLevel}
            onChange={(e) => setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)}
            className="w-full bg-white border border-brand-dark/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-dark/20 appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
          >
            <option value="L">L - Baixo (7%)</option>
            <option value="M">M - Médio (15%)</option>
            <option value="Q">Q - Quartis (25%)</option>
            <option value="H">H - Alto (30%)</option>
          </select>
        </div>
        <p className="text-[10px] opacity-50 italic">Dica: Use 'H' se o QR Code contiver uma logo grande, para garantir que continue escaneável.</p>
      </div>
    </div>
  );
}
