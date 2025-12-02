import React, { useState } from 'react';
import { Sparkles, Clock, Sliders, Image as ImageIcon } from 'lucide-react';
import { BrandButton } from '../BrandButton';
import { BrandCard } from '../BrandCard';

interface LeftPanelProps {
  onGenerate: (prompt: string) => void;
}

const historyItems = [
  { id: 1, prompt: 'Medieval castle with towers', time: '2 mins ago', thumbnail: '🏰' },
  { id: 2, prompt: 'Futuristic spaceship blue', time: '15 mins ago', thumbnail: '🚀' },
  { id: 3, prompt: 'Dragon with wings', time: '1 hour ago', thumbnail: '🐉' },
  { id: 4, prompt: 'Racing car red and black', time: '2 hours ago', thumbnail: '🏎️' }
];

export function LeftPanel({ onGenerate }: LeftPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'params'>('generate');

  return (
    <div className="h-full flex flex-col bg-[#080808]">
      
      {/* Tabs */}
      <div className="flex border-b border-[#333333]">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex-1 px-4 py-3 text-sm transition-colors ${
            activeTab === 'generate'
              ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Generate
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-3 text-sm transition-colors ${
            activeTab === 'history'
              ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          History
        </button>
        <button
          onClick={() => setActiveTab('params')}
          className={`flex-1 px-4 py-3 text-sm transition-colors ${
            activeTab === 'params'
              ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4 inline mr-2" />
          Settings
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white mb-4">Describe Your Model</h3>
              <p className="text-white/50 text-sm mb-4">
                Tell the AI what you want to build. Be specific about colors, style, and details.
              </p>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-white/80 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic spaceship with blue and white bricks, featuring large engines and a cockpit..."
                className="w-full h-32 px-4 py-3 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white placeholder:text-white/30 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 resize-none"
              />
              <p className="text-white/30 text-xs mt-2">
                {prompt.length} / 500 characters
              </p>
            </div>

            {/* Quick Styles */}
            <div>
              <label className="block text-white/80 mb-3">Style Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {['Realistic', 'Cartoon', 'Sci-Fi', 'Fantasy'].map((style) => (
                  <button
                    key={style}
                    className="px-3 py-2 text-sm bg-[#1F1F1F] border border-[#333333] rounded text-white/60 hover:border-[#FFD700]/50 hover:text-white transition-colors"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Reference Image */}
            <div>
              <label className="block text-white/80 mb-3">Reference Image (Optional)</label>
              <button className="w-full px-4 py-8 border-2 border-dashed border-[#333333] rounded-lg text-white/40 hover:border-[#FFD700]/30 hover:text-white/60 transition-colors">
                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm">Click to upload or drag & drop</span>
              </button>
            </div>

            {/* Generate Button */}
            <BrandButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => prompt && onGenerate(prompt)}
              disabled={!prompt}
            >
              <Sparkles className="w-5 h-5" />
              Generate Model
            </BrandButton>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <h3 className="text-white mb-4">Recent Generations</h3>
            {historyItems.map((item) => (
              <BrandCard key={item.id} padding="sm" hover className="cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#2A2A2A] rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.thumbnail}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm mb-1 truncate">{item.prompt}</p>
                    <p className="text-white/40 text-xs">{item.time}</p>
                  </div>
                </div>
              </BrandCard>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'params' && (
          <div className="space-y-6">
            <h3 className="text-white mb-4">Generation Settings</h3>
            
            {/* Quality */}
            <div>
              <label className="block text-white/80 mb-3">Quality</label>
              <select className="w-full px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded text-white focus:border-[#FFD700] focus:outline-none">
                <option>Draft (Fast)</option>
                <option>Standard</option>
                <option>High Quality</option>
              </select>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-white/80 mb-3">Brick Complexity</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  defaultValue="1000"
                  className="w-full accent-[#FFD700]"
                />
                <div className="flex justify-between text-xs text-white/40">
                  <span>Simple (100)</span>
                  <span>Complex (5000)</span>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-white/80 mb-3">Color Palette</label>
              <div className="grid grid-cols-4 gap-2">
                {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'].map((color) => (
                  <button
                    key={color}
                    className="w-full aspect-square rounded border-2 border-[#333333] hover:border-[#FFD700] transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Physics Validation */}
            <div>
              <label className="flex items-center justify-between">
                <span className="text-white/80">Physics Validation</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#FFD700]"
                />
              </label>
              <p className="text-white/40 text-xs mt-2">
                Ensure the model is structurally sound and buildable
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
