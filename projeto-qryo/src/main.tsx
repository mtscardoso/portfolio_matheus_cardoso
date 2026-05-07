import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RemoteConfigProvider } from './context/RemoteConfigContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RemoteConfigProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RemoteConfigProvider>
    </AuthProvider>
  </StrictMode>,
);
