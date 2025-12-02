import React from 'react';
import { X } from 'lucide-react';

const categories = ['All', 'Architecture', 'Vehicles', 'Creatures', 'Sci-Fi', 'Fantasy', 'Abstract'];
const complexities = ['Simple (< 1K)', 'Medium (1-3K)', 'Complex (> 3K)'];
const colors = ['Monochrome', 'Colorful', 'Specific Palette'];

export function CommunityFilters() {
  return (
    <div className="mb-8 p-6 bg-[#1F1F1F] border border-[#333333] rounded-lg">
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white">Filters</h3>
        <button className="text-[#FFD700] text-sm hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Category */}
        <div>
          <label className="block text-white/80 mb-3">Category</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-white/60 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#FFD700]"
                  defaultChecked={category === 'All'}
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-white/80 mb-3">Complexity</label>
          <div className="space-y-2">
            {complexities.map((complexity) => (
              <label key={complexity} className="flex items-center gap-2 text-white/60 hover:text-white cursor-pointer">
                <input
                  type="radio"
                  name="complexity"
                  className="w-4 h-4 accent-[#FFD700]"
                />
                <span className="text-sm">{complexity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-white/80 mb-3">Color Style</label>
          <div className="space-y-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center gap-2 text-white/60 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#FFD700]"
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
