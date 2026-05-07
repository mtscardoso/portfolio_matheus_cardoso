import { useEffect, useRef } from 'react';
import React from 'react';
import QRCodeStyling, { 
  DrawType, 
  TypeNumber, 
  Mode, 
  ErrorCorrectionLevel, 
  DotType, 
  CornerSquareType, 
  CornerDotType 
} from 'qr-code-styling';

interface QRCodePreviewProps {
  data: string;
  width: number;
  height: number;
  margin: number;
  dotsColor: string;
  dotsType: DotType;
  dotsGradient?: {
    type: 'linear' | 'radial';
    colorStops: { offset: number; color: string }[];
    rotation?: number;
  };
  cornersColor: string;
  cornersType: CornerSquareType;
  cornersGradient?: {
    type: 'linear' | 'radial';
    colorStops: { offset: number; color: string }[];
    rotation?: number;
  };
  cornerDotsColor: string;
  cornerDotsType: CornerDotType;
  cornerDotsGradient?: {
    type: 'linear' | 'radial';
    colorStops: { offset: number; color: string }[];
    rotation?: number;
  };
  backgroundColor: string;
  logoFile: File | null;
  hideBackgroundDots: boolean;
  imageMargin: number;
  onDownload: (extension: 'png' | 'jpeg' | 'webp' | 'svg') => void;
  qrRef: React.MutableRefObject<QRCodeStyling | null>;
}

export default function QRCodePreview({
  data, width, height, margin,
  dotsColor, dotsType, dotsGradient,
  cornersColor, cornersType, cornersGradient,
  cornerDotsColor, cornerDotsType, cornerDotsGradient,
  backgroundColor,
  logoFile,
  hideBackgroundDots,
  imageMargin,
  onDownload,
  qrRef
}: QRCodePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: width,
        height: height,
        type: 'svg' as DrawType,
        data: data,
        image: '',
        margin: margin,
        qrOptions: {
          typeNumber: 0 as TypeNumber,
          mode: 'Byte' as Mode,
          errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        imageOptions: {
          hideBackgroundDots: hideBackgroundDots,
          imageSize: 0.4,
          margin: imageMargin,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
          gradient: dotsGradient
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
          color: cornersColor,
          type: cornersType,
          gradient: cornersGradient
        },
        cornersDotOptions: {
          color: cornerDotsColor,
          type: cornerDotsType,
          gradient: cornerDotsGradient
        }
      });
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qrRef.current.append(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!qrRef.current) return;

    const updateOptions = async () => {
      let imagePath = '';
      if (logoFile) {
        imagePath = URL.createObjectURL(logoFile);
      }

      qrRef.current.update({
        data,
        width,
        height,
        margin,
        image: imagePath,
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
          gradient: dotsGradient
        },
        backgroundOptions: {
          color: backgroundColor
        },
        cornersSquareOptions: {
          color: cornersColor,
          type: cornersType,
          gradient: cornersGradient
        },
        cornersDotOptions: {
          color: cornerDotsColor,
          type: cornerDotsType,
          gradient: cornerDotsGradient
        },
        imageOptions: {
          hideBackgroundDots,
          margin: imageMargin
        }
      });
    };

    updateOptions();
  }, [data, width, height, margin, dotsColor, dotsType, dotsGradient, cornersColor, cornersType, cornersGradient, cornerDotsColor, cornerDotsType, cornerDotsGradient, backgroundColor, logoFile, hideBackgroundDots, imageMargin]);

  return (
    <div className="flex flex-col gap-6 w-full animate-in zoom-in duration-500" id="qr-preview-root">
      <div 
        ref={containerRef} 
        className="bg-white rounded-xl p-4 shadow-xl flex items-center justify-center aspect-square overflow-hidden border border-brand-dark/5"
        id="qr-code-container"
      />
      
      <div className="grid grid-cols-3 gap-2" id="download-actions">
        {(['png', 'jpeg', 'svg'] as const).map((ext) => (
          <button 
            key={ext}
            onClick={() => onDownload(ext)}
            className="py-2.5 px-4 bg-brand-dark text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-dark/90 transition-all active:scale-95 shadow-sm hover:shadow-md"
            id={`btn-download-${ext}`}
          >
            {ext}
          </button>
        ))}
      </div>
    </div>
  );
}
