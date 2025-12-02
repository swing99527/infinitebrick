import React from 'react';
import { Home, Save, Share2, Settings, HelpCircle } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { BrickLogo } from '../BrickLogo';
import { useTranslation } from '../../contexts/LanguageContext';

export function StudioToolbar() {
  const t = useTranslation();
  
  return (
    <div className="h-16 border-b border-[#333333] bg-[#080808] flex items-center justify-between px-6">
      
      {/* Left - Logo & Navigation */}
      <div className="flex items-center gap-6">
        <a href="/" className="flex items-center gap-3 group">
          <BrickLogo size="sm" />
          <div>
            <h1 className="text-white font-display tracking-tight">InfiniteBrick AI</h1>
            <p className="text-white/40 text-xs">{t.meta.tagline.split(' - ')[0]}</p>
          </div>
        </a>
        
        <div className="h-6 w-px bg-[#333333]" />
        
        <nav className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-white/60 hover:text-white hover:bg-[#1F1F1F] rounded transition-colors">
            <Home className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Center - Project Name */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          defaultValue="Untitled Project"
          className="px-4 py-1.5 bg-transparent border border-transparent hover:border-[#333333] focus:border-[#FFD700] rounded text-white text-center outline-none transition-colors max-w-md"
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 text-white/60 hover:text-white hover:bg-[#1F1F1F] rounded transition-colors"
          aria-label="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <button
          className="p-2 text-white/60 hover:text-white hover:bg-[#1F1F1F] rounded transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-[#333333]" />
        
        <BrandButton variant="ghost" size="sm">
          <Save className="w-4 h-4" />
          Save
        </BrandButton>
        
        <BrandButton variant="secondary" size="sm">
          <Share2 className="w-4 h-4" />
          Share
        </BrandButton>
      </div>

    </div>
  );
}