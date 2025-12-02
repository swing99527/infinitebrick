import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BrandButton } from '../BrandButton';
import { useTranslation } from '../../contexts/LanguageContext';

const galleryItems = [
  {
    id: 1,
    title: 'Medieval Fortress',
    titleZh: '中世纪城堡',
    image: 'https://images.unsplash.com/photo-1681415851723-dca11d0ec9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdvJTIwY2FzdGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDYwMjM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 2847,
    creator: 'Alex Chen',
    likes: 342
  },
  {
    id: 2,
    title: 'Cyberpunk Spaceship',
    titleZh: '赛博朋克飞船',
    image: 'https://images.unsplash.com/photo-1700864047038-23a5f3660ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBzcGFjZXNoaXAlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjQ2MDIzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 1523,
    creator: 'Maya Star',
    likes: 521
  },
  {
    id: 3,
    title: 'Fire Dragon',
    titleZh: '火焰巨龙',
    image: 'https://images.unsplash.com/photo-1762789916693-cc62ecc30356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBkcmFnb24lMjBjcmVhdHVyZXxlbnwxfHx8fDE3NjQ2MDIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 3210,
    creator: 'David Liu',
    likes: 687
  },
  {
    id: 4,
    title: 'Speed Racer GT',
    titleZh: '极速赛车',
    image: 'https://images.unsplash.com/photo-1758873654318-46aeee65b5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBjYXIlMjByYWNpbmclMjB2ZWhpY2xlfGVufDF8fHx8MTc2NDYwMjM2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 892,
    creator: 'Emma Park',
    likes: 234
  },
  {
    id: 5,
    title: 'Modular City Block',
    titleZh: '模块化街区',
    image: 'https://images.unsplash.com/photo-1714519046792-66bf98dd3bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJ1aWxkaW5nJTIwYmxvY2tzfGVufDF8fHx8MTc2NDU4MDc5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 4521,
    creator: 'Sophie Zhang',
    likes: 456
  },
  {
    id: 6,
    title: 'Mech Warrior',
    titleZh: '机甲战士',
    image: 'https://images.unsplash.com/photo-1758179762264-a09bf74d6b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjByb2JvdCUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY0NjAyMzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bricks: 1876,
    creator: 'Ryan Kim',
    likes: 589
  }
];

export function Gallery() {
  const [filter, setFilter] = useState<'popular' | 'recent'>('popular');
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <section className="py-32 px-8 lg:px-12 bg-[#080808]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {t.gallery.title}
            </h2>
            <p className="text-white/60 max-w-2xl" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
              {t.gallery.subtitle}
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-[#1F1F1F] p-1 rounded-lg border border-[#333333]">
            <button
              onClick={() => setFilter('popular')}
              className={`px-6 py-2.5 rounded-md transition-all ${
                filter === 'popular'
                  ? 'bg-[#FFD700] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t.community.filters.popular}
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-6 py-2.5 rounded-md transition-all ${
                filter === 'recent'
                  ? 'bg-[#FFD700] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t.community.filters.recent}
            </button>
          </div>
        </div>

        {/* Gallery Grid - Large spacing (gap-8 = 32px) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {galleryItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <BrandButton 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/community')}
          >
            {t.gallery.viewAll}
          </BrandButton>
        </motion.div>

      </div>
    </section>
  );
}

// Individual gallery card component
function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        className="relative bg-[#1F1F1F] border border-[#333333] rounded-lg overflow-hidden cursor-pointer"
        style={{
          boxShadow: isHovered ? '0 12px 40px rgba(0, 0, 0, 0.6)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Eye className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-[#FFD700]/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-black" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info - Only show on hover or always on mobile */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          className="overflow-hidden md:block hidden"
        >
          <div className="p-6 space-y-3">
            <div>
              <h3 className="text-white mb-1">{item.title}</h3>
              <p className="text-white/40">{item.titleZh}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">by {item.creator}</span>
              <div className="flex items-center gap-4">
                <span className="text-white/40">{item.bricks} bricks</span>
                <span className="flex items-center gap-1 text-[#FFD700]">
                  <Heart className="w-4 h-4 fill-current" />
                  {item.likes}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile info - always visible */}
        <div className="md:hidden p-4 space-y-2">
          <div>
            <h3 className="text-white">{item.title}</h3>
            <p className="text-white/40">{item.titleZh}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">{item.creator}</span>
            <span className="flex items-center gap-1 text-[#FFD700]">
              <Heart className="w-4 h-4 fill-current" />
              {item.likes}
            </span>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}