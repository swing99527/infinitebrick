import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { BrickAnimation } from './BrickAnimation';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';

export function Hero() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const t = useTranslation();

  const handleStartCreating = () => {
    if (isAuthenticated) {
      navigate('/studio');
    } else {
      navigate('/signup');
    }
  };

  const examples = [
    t.hero.exampleCastle,
    t.hero.exampleCar,
    t.hero.exampleDragon
  ];

  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text & Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-[#FFD700]">{t.hero.badge}</span>
            </motion.div>

            {/* Main Heading - 超大字号 */}
            <div className="space-y-6">
              <h1 className="text-white leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                {t.hero.title1}
                <br />
                <span className="text-[#FFD700]">{t.hero.title2}</span>
                <br />
                {t.hero.title3}
              </h1>
              
              <p className="text-white/60 max-w-xl" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: '1.7' }}>
                {t.hero.subtitle}
              </p>
            </div>

            {/* Prompt Input Demo */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.hero.inputPlaceholder}
                  className="w-full px-6 py-5 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all"
                  style={{ fontSize: '1.125rem' }}
                />
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <BrandButton variant="primary" size="sm">
                    {t.hero.generate}
                  </BrandButton>
                </motion.div>
              </div>
              
              {/* Example prompts */}
              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(`${example}...`)}
                    className="px-3 py-1.5 text-sm text-white/50 hover:text-[#FFD700] bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333333] rounded-full transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <BrandButton variant="primary" size="lg" onClick={handleStartCreating}>
                {t.hero.ctaStart}
                <ArrowRight className="w-5 h-5" />
              </BrandButton>
              <BrandButton variant="secondary" size="lg">
                {t.hero.ctaDemo}
              </BrandButton>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-[#333333]">
              <div>
                <p className="text-[#FFD700] mb-1" style={{ fontSize: '2rem' }}>10K+</p>
                <p className="text-white/50">{t.hero.statsModels}</p>
              </div>
              <div>
                <p className="text-[#FFD700] mb-1" style={{ fontSize: '2rem' }}>5K+</p>
                <p className="text-white/50">{t.hero.statsSold}</p>
              </div>
              <div>
                <p className="text-[#FFD700] mb-1" style={{ fontSize: '2rem' }}>98%</p>
                <p className="text-white/50">{t.hero.statsSuccess}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: 3D Brick Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating brick grid animation */}
            <BrickAnimation />
          </motion.div>

        </div>
      </div>
    </section>
  );
}