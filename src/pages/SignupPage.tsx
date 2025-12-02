import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BrandButton } from '../components/BrandButton';
import { BrandCard } from '../components/BrandCard';
import { BrickLogo } from '../components/BrickLogo';
import { DocumentHead } from '../components/DocumentHead';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';
import { ArrowLeft, Check } from 'lucide-react';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const t = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate('/studio');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] dark flex items-center justify-center p-8">
      
      <DocumentHead 
        title={t.meta.signupTitle}
        description={t.signup.subtitle}
      />

      {/* Back to Home */}
      <Link
        to="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t.nav.backToHome}
      </Link>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <h1 className="text-white mb-4">{t.signup.title}</h1>
          <p className="text-white/60 mb-8">
            {t.signup.subtitle}
          </p>

          <div className="space-y-4">
            {t.signup.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#FFD700]/20 border border-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#FFD700]" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-center md:text-left mb-6">
            <div className="flex justify-center md:justify-start mb-4">
              <BrickLogo size={64} />
            </div>
            <h2 className="text-white mb-2">{t.signup.createAccount}</h2>
            <p className="text-white/60">{t.signup.startJourney}</p>
          </div>

          <BrandCard padding="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-white/80 mb-2">{t.signup.fullName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.signup.namePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">{t.signup.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.signup.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">{t.signup.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.signup.passwordPlaceholder}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                />
                <p className="text-xs text-white/40 mt-1">{t.signup.passwordHint}</p>
              </div>

              <label className="flex items-start gap-3 text-sm text-white/60 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 accent-[#FFD700]" />
                <span>
                  {t.signup.agreeToTerms}{' '}
                  <a href="#" className="text-[#FFD700] hover:underline">{t.signup.termsOfService}</a>
                  {' '}{t.signup.and}{' '}
                  <a href="#" className="text-[#FFD700] hover:underline">{t.signup.privacyPolicy}</a>
                </span>
              </label>

              <BrandButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t.signup.creating : t.signup.createButton}
              </BrandButton>

              <div className="text-center text-sm text-white/60">
                {t.signup.haveAccount}{' '}
                <Link to="/login" className="text-[#FFD700] hover:underline">
                  {t.signup.loginLink}
                </Link>
              </div>

            </form>
          </BrandCard>

          {/* Demo Hint */}
          <div className="mt-4 p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
            <p className="text-[#FFD700] text-xs text-center">
              <strong>Demo:</strong> {t.signup.demoHint}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}