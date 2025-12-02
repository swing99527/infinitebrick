import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Package, Settings, BarChart3, Home, Plus } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { BrickLogo } from '../BrickLogo';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: 'models' | 'orders' | 'settings' | 'analytics') => void;
}

const menuItems = [
  { id: 'models', label: 'My Models', labelZh: '我的模型', icon: Layers, path: '/dashboard/models' },
  { id: 'orders', label: 'Orders', labelZh: '我的订单', icon: Package, path: '/dashboard/orders' },
  { id: 'analytics', label: 'Analytics', labelZh: '数据统计', icon: BarChart3, path: '/dashboard/analytics' },
  { id: 'settings', label: 'Settings', labelZh: '设置', icon: Settings, path: '/dashboard/settings' }
];

export function DashboardSidebar({ currentView, onViewChange }: DashboardSidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  const t = useTranslation();

  return (
    <div className="w-64 border-r border-[#333333] bg-[#080808] flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b border-[#333333]">
        <Link to="/studio" className="flex items-center gap-2 mb-6">
          <BrickLogo size="sm" />
          <span className="text-white font-display">InfiniteBrick</span>
        </Link>
        
        <Link to="/studio">
          <BrandButton variant="primary" size="md" className="w-full">
            <Plus className="w-4 h-4" />
            New Project
          </BrandButton>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                    : 'text-white/60 hover:text-white hover:bg-[#1F1F1F]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div>{item.label}</div>
                  <div className="text-xs opacity-60">{item.labelZh}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#333333]">
        <div className="flex items-center gap-3 p-3 bg-[#1F1F1F] rounded-lg">
          <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
            <span>{user?.avatar || '👤'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate">{user?.name || 'User'}</p>
            <p className="text-white/40 text-xs capitalize">{user?.plan || 'Free'} Member</p>
          </div>
        </div>
      </div>

    </div>
  );
}