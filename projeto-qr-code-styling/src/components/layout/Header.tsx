import { QrCode } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-brand-dark text-brand-light py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-3">
          <QrCode className="w-12 h-12" id="header-logo-icon" />
          <div className="flex items-center gap-1 font-display uppercase tracking-tighter" id="header-title-container">
            <span className="text-5xl font-black" id="header-qr-text">QR</span>
            <div className="flex flex-col leading-[0.75]">
              <span className="text-xl font-black" id="header-code-text">Code</span>
              <h1 className="text-2xl font-black" id="header-title">
                Styling
              </h1>
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs font-mono opacity-60">
          <span className="bg-white/10 px-2 py-0.5 rounded">npm v1.8.3</span>
          <a href="https://github.com/kozakdenys/qr-code-styling" target="_blank" rel="noopener noreferrer" className="hover:underline">github</a>
        </div>
      </div>
    </header>
  );
}
