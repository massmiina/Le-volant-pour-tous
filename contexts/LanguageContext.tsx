'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

type Language = 'fr' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, any>) => any;
}

// Safety fallback to prevent crashes if used outside of Provider
const fallbackContext: LanguageContextType = {
  language: 'fr',
  setLanguage: () => {},
  t: (key: string, options?: Record<string, any>) => {
    const keys = key.split('.');
    let current: any = translations['fr'];
    for (const k of keys) {
      if (!current || current[k] === undefined) return key;
      current = current[k];
    }
    
    if (typeof current === 'string' && options) {
      let result = current;
      Object.entries(options).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, v.toString());
      });
      return result;
    }
    return current;
  }
};

const LanguageContext = createContext<LanguageContextType>(fallbackContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && ['fr', 'ru'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', lang);
    }
  };

  const t = (key: string, options?: Record<string, any>): any => {
    const keys = key.split('.');
    
    const getFromData = (data: any) => {
      let current = data;
      for (const k of keys) {
        if (!current || current[k] === undefined) return null;
        current = current[k];
      }
      return current;
    };

    let result = getFromData(translations[language]) || getFromData(translations['fr']);

    if (result === null) return key;

    if (typeof result === 'string' && options) {
      let interpolated = result;
      Object.entries(options).forEach(([k, v]) => {
        interpolated = interpolated.replace(`{${k}}`, v.toString());
      });
      return interpolated;
    }
    
    return result;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  return useContext(LanguageContext);
};
