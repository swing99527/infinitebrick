import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitchProps {
  variant?: 'default' | 'compact';
}

export function LanguageSwitch({ variant = 'default' }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'zh' as const, name: 'Chinese', nativeName: '简体中文' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-[#1F1F1F] rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{currentLang?.code.toUpperCase()}</span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-[#1F1F1F] border border-[#333333] rounded-lg shadow-2xl overflow-hidden z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                  >
                    <span>{lang.nativeName}</span>
                    {language === lang.code && (
                      <Check className="w-4 h-4 text-[#FFD700]" />
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] hover:border-[#FFD700]/30 rounded-lg transition-all text-white"
      >
        <Globe className="w-5 h-5" />
        <span>{currentLang?.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-56 bg-[#1F1F1F] border border-[#333333] rounded-lg shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-white/40">Select Language</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      language === lang.code
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                        : 'text-white/80 hover:text-white hover:bg-[#2A2A2A]'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span>{lang.nativeName}</span>
                      <span className="text-xs text-white/40">{lang.name}</span>
                    </div>
                    {language === lang.code && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
