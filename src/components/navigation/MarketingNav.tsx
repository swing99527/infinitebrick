import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandButton } from '../BrandButton';
import { BrickLogo } from '../BrickLogo';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { LanguageSwitch } from '../LanguageSwitch';

export function MarketingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.product, href: '/#product', isAnchor: true },
    { label: t.nav.community, href: '/community', isAnchor: false },
    { label: t.nav.pricing, href: '/#pricing', isAnchor: true }
  ];

  // Handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    
    // If we're on the home page, just scroll
    if (location.pathname === '/') {
      const element = document.querySelector('#' + anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with anchor
      navigate('/#' + anchor);
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#000000]/95 backdrop-blur-xl border-b border-[#333333]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <BrickLogo />
            <div>
              <div className="text-white font-display tracking-tight">
                InfiniteBrick AI
              </div>
              <div className="text-[#FFD700] text-xs">智积无限</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                  onClick={(e) => handleAnchorClick(e, link.href.split('#')[1])}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons + Language Switch */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch variant="compact" />
            
            {isAuthenticated ? (
              <BrandButton
                variant="primary"
                size="md"
                onClick={() => navigate('/studio')}
              >
                {t.nav.goToStudio}
              </BrandButton>
            ) : (
              <>
                <BrandButton
                  variant="ghost"
                  size="md"
                  onClick={() => navigate('/login')}
                >
                  {t.nav.login}
                </BrandButton>
                <BrandButton
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/signup')}
                >
                  {t.nav.signup}
                </BrandButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#000000] border-t border-[#333333]"
          >
            <div className="px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/60 hover:text-white py-2"
                    onClick={(e) => handleAnchorClick(e, link.href.split('#')[1])}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-white/60 hover:text-white py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <div className="pt-4 border-t border-[#333333]">
                <LanguageSwitch />
              </div>
              
              {isAuthenticated ? (
                <BrandButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    navigate('/studio');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t.nav.goToStudio}
                </BrandButton>
              ) : (
                <div className="space-y-3">
                  <BrandButton
                    variant="ghost"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t.nav.login}
                  </BrandButton>
                  <BrandButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {t.nav.signup}
                  </BrandButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}