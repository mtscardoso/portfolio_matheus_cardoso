import React, { createContext, useContext, useEffect, useState } from 'react';
import { remoteConfig, fetchAndActivate, getValue } from '../firebase';

interface RemoteConfigContextType {
  enableBatchGeneration: boolean;
  heroTitleSuffix: string;
  loading: boolean;
}

const RemoteConfigContext = createContext<RemoteConfigContextType | undefined>(undefined);

export function RemoteConfigProvider({ children }: { children: React.ReactNode }) {
  const [enableBatchGeneration, setEnableBatchGeneration] = useState(true);
  const [heroTitleSuffix, setHeroTitleSuffix] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        setEnableBatchGeneration(getValue(remoteConfig, 'enable_batch_generation').asBoolean());
        setHeroTitleSuffix(getValue(remoteConfig, 'hero_title_suffix').asString());
      } catch (error) {
        console.error('Failed to fetch remote config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <RemoteConfigContext.Provider value={{ enableBatchGeneration, heroTitleSuffix, loading }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export function useRemoteConfig() {
  const context = useContext(RemoteConfigContext);
  if (context === undefined) {
    throw new Error('useRemoteConfig must be used within a RemoteConfigProvider');
  }
  return context;
}
