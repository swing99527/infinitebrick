import React, { useState } from 'react';
import { Search, Grid3x3, List, MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';
import { BrandCard } from '../BrandCard';
import { motion } from 'motion/react';

const myModels = [
  { id: 1, name: 'Medieval Castle', status: 'Published', bricks: 2847, likes: 342, date: '2024-11-28', thumbnail: '🏰' },
  { id: 2, name: 'Cyberpunk Ship', status: 'Draft', bricks: 1523, likes: 0, date: '2024-11-30', thumbnail: '🚀' },
  { id: 3, name: 'Fire Dragon', status: 'Published', bricks: 3210, likes: 687, date: '2024-11-25', thumbnail: '🐉' },
  { id: 4, name: 'Racing Car', status: 'Processing', bricks: 892, likes: 0, date: '2024-12-01', thumbnail: '🏎️' },
  { id: 5, name: 'City Block', status: 'Published', bricks: 4521, likes: 456, date: '2024-11-20', thumbnail: '🏙️' },
  { id: 6, name: 'Mech Robot', status: 'Draft', bricks: 1876, likes: 0, date: '2024-11-29', thumbnail: '🤖' }
];

export function MyModels() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">My Models</h1>
        <p className="text-white/60">Manage your brick creations</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search models..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none"
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-[#1F1F1F] border border-[#333333] rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#FFD700] text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-[#FFD700] text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Models Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BrandCard padding="none" hover>
                {/* Thumbnail */}
                <div className="aspect-video bg-[#2A2A2A] flex items-center justify-center border-b border-[#333333]">
                  <span className="text-6xl">{model.thumbnail}</span>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{model.name}</h3>
                      <p className="text-white/40 text-sm">{model.bricks} bricks</p>
                    </div>
                    <button className="p-1 text-white/40 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#333333]">
                    <span className={`px-2 py-1 rounded text-xs ${
                      model.status === 'Published'
                        ? 'bg-[#45A29E]/20 text-[#45A29E]'
                        : model.status === 'Draft'
                        ? 'bg-white/10 text-white/60'
                        : 'bg-[#FFD700]/20 text-[#FFD700]'
                    }`}>
                      {model.status}
                    </span>
                    <span className="text-white/40 text-xs">{model.date}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-[#2A2A2A] hover:bg-[#333333] text-white rounded transition-colors">
                      <Edit className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button className="p-2 bg-[#2A2A2A] hover:bg-[#333333] text-white rounded transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </BrandCard>
            </motion.div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-3">
          {myModels.map((model) => (
            <BrandCard key={model.id} padding="md" hover>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#2A2A2A] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{model.thumbnail}</span>
                </div>
                
                <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                  <div className="col-span-2">
                    <h3 className="text-white mb-1">{model.name}</h3>
                    <p className="text-white/40 text-sm">{model.bricks} bricks</p>
                  </div>
                  
                  <div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      model.status === 'Published'
                        ? 'bg-[#45A29E]/20 text-[#45A29E]'
                        : model.status === 'Draft'
                        ? 'bg-white/10 text-white/60'
                        : 'bg-[#FFD700]/20 text-[#FFD700]'
                    }`}>
                      {model.status}
                    </span>
                  </div>
                  
                  <div className="text-white/60">{model.date}</div>
                  
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/60 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/60 hover:text-[#FF4D4F] hover:bg-[#2A2A2A] rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </BrandCard>
          ))}
        </div>
      )}

    </div>
  );
}
