import { useState, useCallback } from 'react';
import { QRStylingOptions } from '../types/qr';

const initialOptions: QRStylingOptions = {
  data: 'https://qr-code-styling.com',
  width: 300,
  height: 300,
  margin: 10,
  dotsOptions: {
    color: '#333333',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 10,
    imageSize: 0.4,
  },
  cornersSquareOptions: {
    color: '#333333',
    type: 'square',
  },
  cornersDotOptions: {
    color: '#333333',
    type: 'square',
  },
};

export function useQRStyling() {
  const [options, setOptions] = useState<QRStylingOptions>(initialOptions);

  const updateOptions = useCallback((newOptions: Partial<QRStylingOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  const updateDotsOptions = useCallback((newDotsOptions: Partial<QRStylingOptions['dotsOptions']>) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, ...newDotsOptions },
    }));
  }, []);

  const updateBackgroundOptions = useCallback((newBackgroundOptions: Partial<QRStylingOptions['backgroundOptions']>) => {
    setOptions((prev) => ({
      ...prev,
      backgroundOptions: { ...prev.backgroundOptions, ...newBackgroundOptions },
    }));
  }, []);

  const updateCornersSquareOptions = useCallback((newCornersSquareOptions: Partial<QRStylingOptions['cornersSquareOptions']>) => {
    setOptions((prev) => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, ...newCornersSquareOptions },
    }));
  }, []);

  const updateCornersDotOptions = useCallback((newCornersDotOptions: Partial<QRStylingOptions['cornersDotOptions']>) => {
    setOptions((prev) => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, ...newCornersDotOptions },
    }));
  }, []);

  const updateImageOptions = useCallback((newImageOptions: Partial<QRStylingOptions['imageOptions']>) => {
    setOptions((prev) => ({
      ...prev,
      imageOptions: { ...prev.imageOptions, ...newImageOptions },
    }));
  }, []);

  return {
    options,
    updateOptions,
    updateDotsOptions,
    updateBackgroundOptions,
    updateCornersSquareOptions,
    updateCornersDotOptions,
    updateImageOptions,
  };
}
