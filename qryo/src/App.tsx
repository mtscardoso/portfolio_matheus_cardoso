/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import QRPreview from './components/qr/QRPreview';
import QRControls from './components/qr/QRControls';
import { useQRStyling } from './hooks/useQRStyling';

export default function App() {
  const [privacyMode, setPrivacyMode] = useState(false);
  const {
    options,
    updateOptions,
    updateDotsOptions,
    updateBackgroundOptions,
    updateCornersSquareOptions,
    updateCornersDotOptions,
    updateImageOptions,
  } = useQRStyling();

  const handleAfterDownload = () => {
    if (privacyMode) {
      updateOptions({ data: '' });
    }
  };

  return (
    <MainLayout dotColor={options.dotsOptions.color}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Preview do QR Code */}
        <div className="lg:col-span-5">
          <QRPreview 
            options={options} 
            privacyMode={privacyMode}
            onAfterDownload={handleAfterDownload}
          />
        </div>

        {/* Lado Direito: Controles de Estilização */}
        <div className="lg:col-span-7">
          <QRControls 
            options={options}
            updateOptions={updateOptions}
            updateDotsOptions={updateDotsOptions}
            updateBackgroundOptions={updateBackgroundOptions}
            updateCornersSquareOptions={updateCornersSquareOptions}
            updateCornersDotOptions={updateCornersDotOptions}
            updateImageOptions={updateImageOptions}
            privacyMode={privacyMode}
            setPrivacyMode={setPrivacyMode}
          />
        </div>
      </div>
    </MainLayout>
  );
}
