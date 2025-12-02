import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, Settings, LogOut, Package, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrickLogo } from '../BrickLogo';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { LanguageSwitch } from '../LanguageSwitch';

export function AppNav() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/95 backdrop-blur-xl border-b border-[#333333]">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <BrickLogo size={32} />
            <span className="text-white font-display">InfiniteBrick AI</span>
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center gap-2">
            <Link
              to="/studio"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/studio')
                  ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                  : 'text-white/60 hover:text-white hover:bg-[#1F1F1F]'
              }`}
            >
              {t.nav.studio}
            </Link>
            <Link
              to="/community"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/community')
                  ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                  : 'text-white/60 hover:text-white hover:bg-[#1F1F1F]'
              }`}
            >
              {t.nav.community}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Language Switch */}
            <LanguageSwitch variant="compact" />

            {/* Notifications */}
            <button className="p-2 text-white/60 hover:text-white hover:bg-[#1F1F1F] rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFD700] rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <span>{user?.avatar}</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm">{user?.name}</div>
                  <div className="text-xs text-white/40 capitalize">{user?.plan} {t.userMenu.member}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-[#1F1F1F] border border-[#333333] rounded-lg shadow-2xl overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-[#333333]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                          <span className="text-2xl">{user?.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white truncate">{user?.name}</div>
                          <div className="text-xs text-white/40 truncate">{user?.email}</div>
                        </div>
                      </div>
                      <div className="mt-2 px-2 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded text-xs text-[#FFD700] inline-block capitalize">
                        {user?.plan} {t.userMenu.member}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/models"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Layers className="w-5 h-5" />
                        <span>{t.userMenu.myModels}</span>
                      </Link>
                      <Link
                        to="/dashboard/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Package className="w-5 h-5" />
                        <span>{t.userMenu.orders}</span>
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>{t.userMenu.settings}</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[#333333] py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-[#FF4D4F] hover:bg-[#2A2A2A] transition-colors w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>{t.userMenu.logout}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
}