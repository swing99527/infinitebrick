import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Box, Palette, Zap, Shield } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export function Product() {
  const t = useTranslation();

  const features = [
    {
      icon: Sparkles,
      title: t.product.features.aiGeneration.title,
      description: t.product.features.aiGeneration.desc,
      color: '#FFD700',
      items: t.product.features.aiGeneration.items
    },
    {
      icon: Cpu,
      title: t.product.features.physicsEngine.title,
      description: t.product.features.physicsEngine.desc,
      color: '#45A29E',
      items: t.product.features.physicsEngine.items
    },
    {
      icon: Box,
      title: t.product.features.brickLibrary.title,
      description: t.product.features.brickLibrary.desc,
      color: '#4ECDC4',
      items: t.product.features.brickLibrary.items
    },
    {
      icon: Palette,
      title: t.product.features.styleCustomization.title,
      description: t.product.features.styleCustomization.desc,
      color: '#FF6B6B',
      items: t.product.features.styleCustomization.items
    },
    {
      icon: Zap,
      title: t.product.features.realtime.title,
      description: t.product.features.realtime.desc,
      color: '#95E1D3',
      items: t.product.features.realtime.items
    },
    {
      icon: Shield,
      title: t.product.features.manufacturing.title,
      description: t.product.features.manufacturing.desc,
      color: '#F38181',
      items: t.product.features.manufacturing.items
    }
  ];

  return (
    <section id="product" className="relative bg-[#000000] py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#FFD700 1px, transparent 1px),
                           linear-gradient(90deg, #FFD700 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full">
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
            <span className="text-[#FFD700] text-sm">{t.product.badge}</span>
          </div>

          <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t.product.title}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
            {t.product.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group relative h-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 hover:border-[#333333] transition-all duration-300">
                  
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${feature.color}15, transparent 70%)`
                    }}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                      style={{
                        backgroundColor: `${feature.color}15`,
                        border: `1px solid ${feature.color}30`
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-white mb-3" style={{ fontSize: '1.5rem' }}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 mb-6" style={{ lineHeight: '1.7' }}>
                      {feature.description}
                    </p>

                    {/* Feature items */}
                    <ul className="space-y-3">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/50 text-sm">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: feature.color }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFD700]/90 transition-colors font-medium"
          >
            {t.product.cta}
            <Zap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
