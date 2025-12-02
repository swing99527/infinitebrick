import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { BrandButton } from '../components/BrandButton';
import { BrandCard } from '../components/BrandCard';
import { BrickLogo } from '../components/BrickLogo';
import { DocumentHead } from '../components/DocumentHead';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  const from = (location.state as any)?.from || '/studio';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(t.login.errorInvalid);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] dark flex items-center justify-center p-8">
      
      <DocumentHead 
        title={t.meta.loginTitle}
        description={t.login.subtitle}
      />

      {/* Back to Home */}
      <Link
        to="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t.nav.backToHome}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrickLogo size={64} />
          </div>
          <h1 className="text-white mb-2">{t.login.title}</h1>
          <p className="text-white/60">{t.login.subtitle}</p>
        </div>

        {/* Login Form */}
        <BrandCard padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-[#FF4D4F]/10 border border-[#FF4D4F]/30 rounded-lg text-[#FF4D4F] text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white/80 mb-2">{t.login.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                required
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">{t.login.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.login.passwordPlaceholder}
                required
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#FFD700]" />
                {t.login.rememberMe}
              </label>
              <a href="#" className="text-[#FFD700] hover:underline">
                {t.login.forgotPassword}
              </a>
            </div>

            <BrandButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t.login.loggingIn : t.login.loginButton}
            </BrandButton>

            <div className="text-center text-sm text-white/60">
              {t.login.noAccount}{' '}
              <Link to="/signup" className="text-[#FFD700] hover:underline">
                {t.login.signupLink}
              </Link>
            </div>

          </form>
        </BrandCard>

        {/* Demo Hint */}
        <div className="mt-6 p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
          <p className="text-[#FFD700] text-sm text-center">
            <strong>Demo:</strong> {t.login.demoHint}
          </p>
        </div>

      </motion.div>
    </div>
  );
}