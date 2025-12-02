import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { en } from '../locales/en';
import { zh } from '../locales/zh';

type Language = 'en' | 'zh';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage or browser preference
  const getInitialLanguage = (): Language => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'zh')) {
      return stored;
    }
    
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const translations: Record<Language, Translations> = {
    en,
    zh
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Set initial HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook for cleaner syntax
export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
