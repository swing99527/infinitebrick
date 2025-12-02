import React, { useState } from 'react';
import { Search, SlidersHorizontal, TrendingUp, Clock, Heart } from 'lucide-react';
import { CommunityCard } from './CommunityCard';
import { CommunityFilters } from './CommunityFilters';

// Extended gallery data
const communityModels = [
  {
    id: 1,
    title: 'Neo-Tokyo Skyscraper',
    titleZh: '新东京摩天大楼',
    image: 'https://images.unsplash.com/photo-1581343979186-ed71e8b09d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdvJTIwYXJjaGl0ZWN0dXJlJTIwbW9kZXJufGVufDF8fHx8MTc2NDYwMjc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Alex Chen', avatar: '👨‍💻' },
    stats: { likes: 1247, views: 8932, bricks: 4521 },
    tags: ['Architecture', 'Cyberpunk', 'Complex'],
    featured: true
  },
  {
    id: 2,
    title: 'Colorful City Block',
    titleZh: '彩色街区',
    image: 'https://images.unsplash.com/photo-1758598738113-86c0f874c85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRveSUyMGJsb2NrcyUyMGNyZWF0aXZlfGVufDF8fHx8MTc2NDYwMjc1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Maya Star', avatar: '👩‍🎨' },
    stats: { likes: 892, views: 5431, bricks: 2134 },
    tags: ['Creative', 'Colorful', 'Medium']
  },
  {
    id: 3,
    title: 'Medieval Fortress',
    titleZh: '中世纪要塞',
    image: 'https://images.unsplash.com/photo-1681415851723-dca11d0ec9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdvJTIwY2FzdGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDYwMjM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'David Liu', avatar: '🧙' },
    stats: { likes: 2341, views: 12453, bricks: 5892 },
    tags: ['Fantasy', 'Castle', 'Complex'],
    featured: true
  },
  {
    id: 4,
    title: 'Spaceship Explorer',
    titleZh: '探索者飞船',
    image: 'https://images.unsplash.com/photo-1700864047038-23a5f3660ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBzcGFjZXNoaXAlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjQ2MDIzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Emma Park', avatar: '🚀' },
    stats: { likes: 1567, views: 9234, bricks: 3421 },
    tags: ['Sci-Fi', 'Vehicle', 'Medium']
  },
  {
    id: 5,
    title: 'Fire Dragon',
    titleZh: '烈焰巨龙',
    image: 'https://images.unsplash.com/photo-1762789916693-cc62ecc30356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBkcmFnb24lMjBjcmVhdHVyZXxlbnwxfHx8fDE3NjQ2MDIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Sophie Zhang', avatar: '🐉' },
    stats: { likes: 3421, views: 15678, bricks: 6234 },
    tags: ['Fantasy', 'Creature', 'Complex'],
    featured: true
  },
  {
    id: 6,
    title: 'Racing GT Supercar',
    titleZh: 'GT超级跑车',
    image: 'https://images.unsplash.com/photo-1758873654318-46aeee65b5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBjYXIlMjByYWNpbmclMjB2ZWhpY2xlfGVufDF8fHx8MTc2NDYwMjM2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Ryan Kim', avatar: '🏎️' },
    stats: { likes: 987, views: 6543, bricks: 1892 },
    tags: ['Vehicle', 'Sports', 'Simple']
  },
  {
    id: 7,
    title: 'Mech Warrior X-7',
    titleZh: '机甲战士X-7',
    image: 'https://images.unsplash.com/photo-1758179762264-a09bf74d6b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjByb2JvdCUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY0NjAyMzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Chris Lee', avatar: '🤖' },
    stats: { likes: 2156, views: 11234, bricks: 4789 },
    tags: ['Sci-Fi', 'Robot', 'Complex']
  },
  {
    id: 8,
    title: 'Modular City Block',
    titleZh: '模块化街区',
    image: 'https://images.unsplash.com/photo-1714519046792-66bf98dd3bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJ1aWxkaW5nJTIwYmxvY2tzfGVufDF8fHx8MTc2NDU4MDc5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: { name: 'Nina Wang', avatar: '🏙️' },
    stats: { likes: 1678, views: 8765, bricks: 5123 },
    tags: ['Architecture', 'Modular', 'Complex']
  }
];

export function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] dark">
      
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-sm border-b border-[#333333]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          
          {/* Top Row */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-white mb-2">Community Creations</h1>
              <p className="text-white/60">探索全球创作者的精彩作品</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white hover:border-[#FFD700]/50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 inline mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Search & Sort Row */}
          <div className="flex gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, creators, tags..."
                className="w-full pl-12 pr-4 py-3 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white placeholder:text-white/40 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
              />
            </div>

            {/* Sort Buttons */}
            <div className="flex gap-2 bg-[#1F1F1F] border border-[#333333] rounded-lg p-1">
              <button
                onClick={() => setSortBy('trending')}
                className={`px-4 py-2 rounded transition-colors ${
                  sortBy === 'trending'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Trending
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 rounded transition-colors ${
                  sortBy === 'recent'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-1" />
                Recent
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-1" />
                Popular
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        
        {/* Filters Panel */}
        {showFilters && <CommunityFilters />}

        {/* Masonry Grid - Using react-responsive-masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {communityModels.map((model) => (
            <div key={model.id} className="break-inside-avoid">
              <CommunityCard model={model} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white hover:border-[#FFD700]/50 transition-colors">
            Load More
          </button>
        </div>

      </div>

    </div>
  );
}
