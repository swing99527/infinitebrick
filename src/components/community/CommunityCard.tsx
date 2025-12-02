import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Eye, ShoppingCart, MoreHorizontal, Download } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CommunityCardProps {
  model: {
    id: number;
    title: string;
    titleZh: string;
    image: string;
    creator: { name: string; avatar: string };
    stats: { likes: number; views: number; bricks: number };
    tags: string[];
    featured?: boolean;
  };
}

export function CommunityCard({ model }: CommunityCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-[#1F1F1F] border border-[#333333] rounded-lg overflow-hidden hover:border-[#FFD700]/30 transition-all"
    >
      {/* Featured Badge */}
      {model.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FFD700] text-black rounded-full text-xs">
          Featured
        </div>
      )}

      {/* Image */}
      <Link to={`/community/${model.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <ImageWithFallback
            src={model.image}
            alt={model.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-1 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFD700]/90 transition-colors flex items-center justify-center gap-2"
                onClick={(e) => e.preventDefault()}
              >
                <Eye className="w-4 h-4" />
                View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-3">
        
        {/* Title */}
        <Link to={`/community/${model.id}`}>
          <div>
            <h3 className="text-white mb-1 line-clamp-1 hover:text-[#FFD700] transition-colors">{model.title}</h3>
            <p className="text-white/40 text-sm">{model.titleZh}</p>
          </div>
        </Link>

        {/* Creator */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center">
            <span>{model.creator.avatar}</span>
          </div>
          <span className="text-white/60 text-sm">{model.creator.name}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {model.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#2A2A2A] border border-[#333333] rounded text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#333333]">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {model.stats.views.toLocaleString()}
            </span>
            <span>{model.stats.bricks.toLocaleString()} bricks</span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                isLiked
                  ? 'text-[#FFD700]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{model.stats.likes + (isLiked ? 1 : 0)}</span>
            </motion.button>
            
            <button className="p-1.5 text-white/40 hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </motion.div>
  );
}