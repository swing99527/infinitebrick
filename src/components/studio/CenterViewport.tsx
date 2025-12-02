import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Grid3x3, Eye } from 'lucide-react';
import { LoadingBricks } from '../LoadingBricks';

interface CenterViewportProps {
  isGenerating: boolean;
  hasModel: boolean;
}

export function CenterViewport({ isGenerating, hasModel }: CenterViewportProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'wireframe'>('3d');

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      
      {/* Viewport Toolbar - Minimal, hidden style */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        
        {/* Left - View Controls */}
        <div className="flex items-center gap-2 bg-[#1F1F1F]/80 backdrop-blur-sm border border-[#333333] rounded-lg p-1">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              viewMode === '3d' 
                ? 'bg-[#FFD700] text-black' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              viewMode === 'wireframe' 
                ? 'bg-[#FFD700] text-black' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Grid3x3 className="w-4 h-4 inline mr-1" />
            Wireframe
          </button>
        </div>

        {/* Right - Tools */}
        <div className="flex items-center gap-2 bg-[#1F1F1F]/80 backdrop-blur-sm border border-[#333333] rounded-lg p-1">
          <button
            className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
            aria-label="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-[#333333]" />
          <button
            className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewport Content */}
      <div className="flex-1 flex items-center justify-center relative">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(#333333 1px, transparent 1px),
              linear-gradient(90deg, #333333 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content States */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <LoadingBricks text="Generating your model..." />
          </motion.div>
        )}

        {!isGenerating && !hasModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6 max-w-md"
          >
            <div className="w-24 h-24 mx-auto bg-[#1F1F1F] rounded-full flex items-center justify-center border border-[#333333]">
              <Eye className="w-12 h-12 text-white/20" />
            </div>
            <div>
              <h3 className="text-white mb-2">Your 3D canvas awaits</h3>
              <p className="text-white/40">
                Enter a prompt in the left panel to generate your first brick model
              </p>
            </div>
          </motion.div>
        )}

        {!isGenerating && hasModel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* 3D Model Placeholder - Animated brick structure */}
            <div className="relative w-96 h-96">
              
              {/* Center glow */}
              <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/10 to-transparent rounded-full blur-3xl" />
              
              {/* Brick layers - simulating a 3D model */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(5)].map((_, layer) => (
                  <motion.div
                    key={layer}
                    className="absolute"
                    animate={{
                      y: [0, -5, 0],
                      rotateY: 360
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: layer * 0.2
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      const radius = 60 + (layer * 20);
                      const x = Math.cos(angle) * radius;
                      const z = Math.sin(angle) * radius;
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-12 h-12 bg-gradient-to-br rounded shadow-lg"
                          style={{
                            transform: `translate3d(${x}px, ${layer * -15}px, ${z}px)`,
                            backgroundImage: `linear-gradient(135deg, ${
                              ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][layer % 4]
                            }, ${
                              ['#FFA500', '#FF4757', '#45A29E', '#2E86AB'][layer % 4]
                            })`,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                          }}
                        />
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Model Info Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1F1F1F]/90 backdrop-blur-sm border border-[#333333] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Medieval Castle</p>
                  <p className="text-white/40 text-sm">2,847 bricks • 24 colors</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#45A29E]" title="Structurally valid" />
                  <span className="text-[#45A29E] text-sm">✓ Valid</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}

      </div>

      {/* Bottom Info Bar */}
      <div className="h-10 border-t border-[#333333] bg-[#080808] flex items-center justify-between px-4 text-xs text-white/40">
        <span>Camera: Perspective</span>
        <span>Zoom: 100%</span>
        <span>Bricks: {hasModel ? '2,847' : '0'}</span>
      </div>

    </div>
  );
}
