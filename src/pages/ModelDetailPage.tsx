import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Download, Edit, Eye } from 'lucide-react';
import { BrandButton } from '../components/BrandButton';
import { BrandCard } from '../components/BrandCard';
import { AppNav } from '../components/navigation/AppNav';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ModelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mock data - in real app, fetch by ID
  const model = {
    id: id,
    title: 'Medieval Castle',
    titleZh: '中世纪城堡',
    description: 'A detailed medieval castle with towers, walls, and a drawbridge. Features intricate stonework patterns and defensive architecture.',
    image: 'https://images.unsplash.com/photo-1681415851723-dca11d0ec9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdvJTIwY2FzdGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDYwMjM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'David Liu',
      avatar: '🧙',
      createdAt: '2024-11-15'
    },
    stats: {
      likes: 2341,
      views: 12453,
      downloads: 432,
      bricks: 2847
    },
    tags: ['Fantasy', 'Castle', 'Complex', 'Architecture'],
    price: 234.50,
    parts: [
      { id: '3001', name: '2x4 Brick', color: 'Gray', quantity: 456 },
      { id: '3003', name: '2x2 Brick', color: 'Dark Gray', quantity: 234 },
      { id: '3004', name: '1x2 Brick', color: 'Brown', quantity: 189 },
      { id: '3005', name: '1x1 Brick', color: 'Black', quantity: 342 }
    ]
  };

  return (
    <div className="min-h-screen bg-[#000000] dark">
      {isAuthenticated && <AppNav />}
      
      <div className={isAuthenticated ? 'pt-16' : ''}>
        
        {/* Back Button */}
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="sticky top-24">
                <div className="aspect-square bg-[#1F1F1F] rounded-lg overflow-hidden border border-[#333333]">
                  <ImageWithFallback
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Actions */}
                <div className="flex gap-3 mt-4">
                  <BrandButton variant="ghost" size="sm" className="flex-1">
                    <Heart className="w-4 h-4" />
                    Like ({model.stats.likes})
                  </BrandButton>
                  <BrandButton variant="ghost" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4" />
                    Share
                  </BrandButton>
                </div>
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              
              {/* Header */}
              <div>
                <h1 className="text-white mb-2">{model.title}</h1>
                <p className="text-white/60 text-xl mb-4">{model.titleZh}</p>
                <p className="text-white/80">{model.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{model.stats.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>{model.stats.likes.toLocaleString()} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>{model.stats.downloads} downloads</span>
                </div>
              </div>

              {/* Creator */}
              <BrandCard padding="md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                      <span className="text-2xl">{model.creator.avatar}</span>
                    </div>
                    <div>
                      <p className="text-white">{model.creator.name}</p>
                      <p className="text-white/40 text-sm">Created {model.creator.createdAt}</p>
                    </div>
                  </div>
                  <BrandButton variant="ghost" size="sm">
                    Follow
                  </BrandButton>
                </div>
              </BrandCard>

              {/* Tags */}
              <div>
                <p className="text-white/60 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/community?tag=${tag}`}
                      className="px-3 py-1.5 bg-[#1F1F1F] border border-[#333333] rounded-lg text-white/60 hover:border-[#FFD700]/50 hover:text-white transition-colors text-sm"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <BrandCard padding="md">
                <h3 className="text-white mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Total Bricks</span>
                    <span className="text-white">{model.stats.bricks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Unique Parts</span>
                    <span className="text-white">{model.parts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Complexity</span>
                    <span className="text-white">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Build Time</span>
                    <span className="text-white">~8 hours</span>
                  </div>
                </div>
              </BrandCard>

              {/* Pricing */}
              <BrandCard padding="md">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Physical Set Price</p>
                    <p className="text-white">${model.price.toFixed(2)}</p>
                  </div>
                  <p className="text-white/40 text-sm">+ shipping</p>
                </div>
                <div className="flex gap-3">
                  <BrandButton variant="primary" size="lg" className="flex-1">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Physical Set
                  </BrandButton>
                  {isAuthenticated && (
                    <BrandButton
                      variant="secondary"
                      size="lg"
                      onClick={() => navigate(`/studio?template=${model.id}`)}
                    >
                      <Edit className="w-5 h-5" />
                      Remix
                    </BrandButton>
                  )}
                </div>
              </BrandCard>

              {/* Download */}
              {isAuthenticated && (
                <div className="flex gap-3">
                  <BrandButton variant="ghost" size="md" className="flex-1">
                    <Download className="w-4 h-4" />
                    Download Instructions
                  </BrandButton>
                  <BrandButton variant="ghost" size="md" className="flex-1">
                    <Download className="w-4 h-4" />
                    Download BOM
                  </BrandButton>
                </div>
              )}

            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
