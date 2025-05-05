import React, { createContext, useContext, useState } from 'react';
import { createSipUA } from '../services/sip';

type SipContextType = {
  ua: any;
  initUA: (server: string, username: string, password: string) => void;
  sipStatus: 'idle' | 'registering' | 'registered' | 'failed';
  sipError: string | null;
};

const SipContext = createContext<SipContextType>({
  ua: null,
  initUA: () => {},
  sipStatus: 'idle',
  sipError: null,
});

export const SipProvider = ({ children }: { children: React.ReactNode }) => {
  const [ua, setUa] = useState<any>(null);
  const [sipStatus, setSipStatus] = useState<'idle' | 'registering' | 'registered' | 'failed'>('idle');
  const [sipError, setSipError] = useState<string | null>(null);

  const initUA = (server: string, username: string, password: string) => {
    try {
      if (ua) ua.stop();
      setSipStatus('registering');
      setSipError(null);
      const userAgent = createSipUA({
        server,
        username,
        password,
        onRegistered: () => setSipStatus('registered'),
        onRegistrationFailed: (err: string) => {
          setSipStatus('failed');
          setSipError(err);
        },
      });
      setUa(userAgent);
    } catch (err: any) {
      setSipStatus('failed');
      setSipError(String(err));
      setUa(null);
    }
  };

  return (
    <SipContext.Provider value={{ ua, initUA, sipStatus, sipError }}>
      {children}
    </SipContext.Provider>
  );
};

export const useSip = () => useContext(SipContext);