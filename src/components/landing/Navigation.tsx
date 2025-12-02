import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const navLinks = language === 'en' 
    ? ['Pricing', 'Community', 'Documentation']
    : ['定价', '社区', '文档'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#333333] bg-black/80 backdrop-blur-md">
      <nav className="max-w-[1440px] mx-auto px-8 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 bg-[#FFD700] rounded-sm"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h1 className="text-white font-display tracking-tight">
                InfiniteBrick AI
              </h1>
              <p className="text-white/40 text-sm">智积无限</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            <BrandButton variant="ghost" size="sm">
              {language === 'en' ? 'Sign In' : '登录'}
            </BrandButton>
            
            <BrandButton variant="primary" size="sm">
              {language === 'en' ? 'Get Started' : '开始创作'}
            </BrandButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
                
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors py-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'en' ? 'Switch to 中文' : '切换到 English'}</span>
                </button>

                <div className="flex flex-col gap-3 pt-4">
                  <BrandButton variant="ghost" size="md">
                    {language === 'en' ? 'Sign In' : '登录'}
                  </BrandButton>
                  <BrandButton variant="primary" size="md">
                    {language === 'en' ? 'Get Started' : '开始创作'}
                  </BrandButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
