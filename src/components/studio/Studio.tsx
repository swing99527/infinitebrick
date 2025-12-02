import React, { useState } from 'react';
import { LeftPanel } from './LeftPanel';
import { CenterViewport } from './CenterViewport';
import { RightPanel } from './RightPanel';
import { StudioToolbar } from './StudioToolbar';

export function Studio() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#000000] dark overflow-hidden">
      {/* Top Toolbar */}
      <StudioToolbar />

      {/* Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Control Console */}
        <div className="w-80 border-r border-[#333333] flex-shrink-0 overflow-y-auto">
          <LeftPanel 
            onGenerate={(prompt) => {
              setIsGenerating(true);
              // Simulate generation
              setTimeout(() => {
                setIsGenerating(false);
                setSelectedModel('generated-model');
              }, 3000);
            }}
          />
        </div>

        {/* Center - 3D Viewport */}
        <div className="flex-1 relative">
          <CenterViewport isGenerating={isGenerating} hasModel={!!selectedModel} />
        </div>

        {/* Right Panel - Delivery Panel */}
        <div className="w-96 border-l border-[#333333] flex-shrink-0 overflow-y-auto">
          <RightPanel hasModel={!!selectedModel} />
        </div>

      </div>
    </div>
  );
}
