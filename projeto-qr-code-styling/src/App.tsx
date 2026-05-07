import { useState, useRef } from 'react';
import React from 'react';
import QRCodeStyling, { ErrorCorrectionLevel } from 'qr-code-styling';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import MainOptions from './components/options/MainOptions';
import DotOptions from './components/options/DotOptions';
import CornerOptions from './components/options/CornerOptions';
import BackgroundOptions from './components/options/BackgroundOptions';
import ImageOptions from './components/options/ImageOptions';
import GeneralOptions from './components/options/GeneralOptions';
import JsonExport from './components/options/JsonExport';
import QRCodePreview from './components/preview/QRCodePreview';

export default function App() {
  // Branding State
  const [primaryColor, setPrimaryColor] = useState('#6a1a4c');
  
  // QR Code States
  const [qrData, setQrData] = useState('https://github.com/kozakdenys/qr-code-styling');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [margin, setMargin] = useState(10);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const [dotsColor, setDotsColor] = useState('#6a1a4c');
  const [dotsType, setDotsType] = useState<'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'>('square');
  const [dotsColorType, setDotsColorType] = useState<'single' | 'gradient'>('single');
  const [dotsGradientColor1, setDotsGradientColor1] = useState('#6a1a4c');
  const [dotsGradientColor2, setDotsGradientColor2] = useState('#333333');

  const [cornersColor, setCornersColor] = useState('#6a1a4c');
  const [cornersType, setCornersType] = useState<'square' | 'extra-rounded' | 'dot' | ''>('square');
  const [cornersColorType, setCornersColorType] = useState<'single' | 'gradient'>('single');
  const [cornersGradientColor1, setCornersGradientColor1] = useState('#6a1a4c');
  const [cornersGradientColor2, setCornersGradientColor2] = useState('#333333');

  const [cornerDotsColor, setCornerDotsColor] = useState('#6a1a4c');
  const [cornerDotsType, setCornerDotsType] = useState<'square' | 'extra-rounded' | 'dot' | ''>('square');
  const [cornerDotsColorType, setCornerDotsColorType] = useState<'single' | 'gradient'>('single');
  const [cornerDotsGradientColor1, setCornerDotsGradientColor1] = useState('#6a1a4c');
  const [cornerDotsGradientColor2, setCornerDotsGradientColor2] = useState('#333333');

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [hideBackgroundDots, setHideBackgroundDots] = useState(true);
  const [imageMargin, setImageMargin] = useState(5);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>('Q');

  const [activeTab, setActiveTab] = useState(0);
  const qrRef = useRef<QRCodeStyling | null>(null);

  // File Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleFileCancel = () => {
    setLogoFile(null);
  };

  const handleDownload = (extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
    if (qrRef.current) {
      qrRef.current.download({ name: 'qr-code', extension });
    }
  };

  // Helper for JSON export config
  const currentConfig = {
    width, height, margin, data: qrData,
    dotsOptions: { 
      color: dotsColor, 
      type: dotsType,
      gradient: dotsColorType === 'gradient' ? {
        type: 'linear',
        rotation: 0,
        colorStops: [
          { offset: 0, color: dotsGradientColor1 },
          { offset: 1, color: dotsGradientColor2 }
        ]
      } : undefined
    },
    backgroundOptions: { color: backgroundColor },
    imageOptions: { hideBackgroundDots, margin: imageMargin },
    cornersSquareOptions: { 
      color: cornersColor, 
      type: cornersType === '' ? undefined : cornersType,
      gradient: cornersColorType === 'gradient' ? {
        type: 'linear',
        rotation: 0,
        colorStops: [
          { offset: 0, color: cornersGradientColor1 },
          { offset: 1, color: cornersGradientColor2 }
        ]
      } : undefined
    },
    cornersDotOptions: { 
      color: cornerDotsColor, 
      type: cornerDotsType === '' ? undefined : cornerDotsType,
      gradient: cornerDotsColorType === 'gradient' ? {
        type: 'linear',
        rotation: 0,
        colorStops: [
          { offset: 0, color: cornerDotsGradientColor1 },
          { offset: 1, color: cornerDotsGradientColor2 }
        ]
      } : undefined
    },
    qrOptions: { errorCorrectionLevel }
  };

  const options = [
    { title: 'Opções Principais', component: <MainOptions 
      data={qrData} setData={setQrData}
      width={width} setWidth={setWidth}
      height={height} setHeight={setHeight}
      margin={margin} setMargin={setMargin}
      onFileChange={handleFileChange}
      onFileCancel={handleFileCancel}
      fileName={logoFile ? logoFile.name : null}
    /> },
    { title: 'Pontos do QR Code', component: <DotOptions 
      color={dotsColor} setColor={(val) => { setDotsColor(val); setPrimaryColor(val); }} 
      type={dotsType} setType={setDotsType}
      colorType={dotsColorType} setColorType={setDotsColorType}
      gradientColor1={dotsGradientColor1} setGradientColor1={setDotsGradientColor1}
      gradientColor2={dotsGradientColor2} setGradientColor2={setDotsGradientColor2}
    /> },
    { title: 'Cantos Quadrados', component: <CornerOptions 
      color={cornersColor} setColor={setCornersColor}
      type={cornersType} setType={setCornersType}
      colorType={cornersColorType} setColorType={setCornersColorType}
      gradientColor1={cornersGradientColor1} setGradientColor1={setCornersGradientColor1}
      gradientColor2={cornersGradientColor2} setGradientColor2={setCornersGradientColor2}
      onReset={() => {
        setCornersColor('#6a1a4c');
        setCornersType('square');
        setCornersColorType('single');
        setCornersGradientColor1('#6a1a4c');
        setCornersGradientColor2('#333333');
      }}
      labelPrefix="Cantos Quadrados"
    /> },
    { title: 'Pontos nos Cantos', component: <CornerOptions 
      color={cornerDotsColor} setColor={setCornerDotsColor}
      type={cornerDotsType} setType={setCornerDotsType}
      colorType={cornerDotsColorType} setColorType={setCornerDotsColorType}
      gradientColor1={cornerDotsGradientColor1} setGradientColor1={setCornerDotsGradientColor1}
      gradientColor2={cornerDotsGradientColor2} setGradientColor2={setCornerDotsGradientColor2}
      onReset={() => {
        setCornerDotsColor('#6a1a4c');
        setCornerDotsType('square');
        setCornerDotsColorType('single');
        setCornerDotsGradientColor1('#6a1a4c');
        setCornerDotsGradientColor2('#333333');
      }}
      labelPrefix="Pontos dos Cantos"
    /> },
    { title: 'Opções de Fundo', component: <BackgroundOptions 
      color={backgroundColor} setColor={setBackgroundColor}
    /> },
    { title: 'Opções de Imagem', component: <ImageOptions 
      hideBackgroundDots={hideBackgroundDots} 
      setHideBackgroundDots={setHideBackgroundDots}
      imageMargin={imageMargin}
      setImageMargin={setImageMargin}
    /> },
    { title: 'Configurações de QR', component: <GeneralOptions 
      errorCorrectionLevel={errorCorrectionLevel}
      setErrorCorrectionLevel={setErrorCorrectionLevel}
    /> },
    { title: 'Exportar JSON', component: <JsonExport config={currentConfig} /> }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" id="app-root">
      <Header />
      <Hero color={primaryColor} />
      
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8" id="main-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Styling Options */}
          <div className="lg:col-span-12 xl:col-span-8 order-2 lg:order-1" id="styling-panel-container">
            <div className="bg-brand-panel rounded-xl p-6 shadow-sm min-h-[500px]">
              <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-brand-dark rounded-full"></span>
                Configurações de Estilo
              </h3>
              
              <div className="flex flex-col gap-3">
                {options.map((option, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-xl transition-all duration-300 overflow-hidden ${activeTab === idx ? 'bg-white/40 shadow-inner' : 'bg-brand-light/50'}`}
                    id={`option-section-${idx}`}
                  >
                    <button 
                      onClick={() => setActiveTab(activeTab === idx ? -1 : idx)}
                      className="w-full p-4 flex justify-between items-center hover:bg-black/5 transition-colors"
                    >
                      <span className="font-bold text-sm uppercase tracking-wide opacity-80">{option.title}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${activeTab === idx ? 'rotate-45' : ''}`}>
                        +
                      </div>
                    </button>
                    
                    {activeTab === idx && (
                      <div className="p-6 border-t border-black/5">
                        {option.component}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className="lg:col-span-12 xl:col-span-4 order-1 lg:order-2" id="preview-panel-container">
            <div className="sticky top-6 flex flex-col gap-6">
              <QRCodePreview 
                data={qrData}
                width={width}
                height={height}
                margin={margin}
                dotsColor={dotsColor}
                dotsType={dotsType}
                dotsGradient={dotsColorType === 'gradient' ? {
                  type: 'linear',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: dotsGradientColor1 },
                    { offset: 1, color: dotsGradientColor2 }
                  ]
                } : undefined}
                cornersColor={cornersColor}
                cornersType={cornersType === '' ? undefined : cornersType}
                cornersGradient={cornersColorType === 'gradient' ? {
                  type: 'linear',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: cornersGradientColor1 },
                    { offset: 1, color: cornersGradientColor2 }
                  ]
                } : undefined}
                cornerDotsColor={cornerDotsColor}
                cornerDotsType={cornerDotsType === '' ? undefined : cornerDotsType}
                cornerDotsGradient={cornerDotsColorType === 'gradient' ? {
                  type: 'linear',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: cornerDotsGradientColor1 },
                    { offset: 1, color: cornerDotsGradientColor2 }
                  ]
                } : undefined}
                backgroundColor={backgroundColor}
                logoFile={logoFile}
                hideBackgroundDots={hideBackgroundDots}
                imageMargin={imageMargin}
                onDownload={handleDownload}
                qrRef={qrRef}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
