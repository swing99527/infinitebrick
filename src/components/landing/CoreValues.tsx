import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from '../../contexts/LanguageContext';

export function CoreValues() {
  const t = useTranslation();

  const values = [
    {
      icon: Sparkles,
      title: t.coreValues.ai.title,
      subtitle: t.coreValues.ai.subtitle,
      description: t.coreValues.ai.desc,
      features: t.coreValues.ai.features,
      image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ1NDQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#FFD700'
    },
    {
      icon: ShieldCheck,
      title: t.coreValues.physics.title,
      subtitle: t.coreValues.physics.subtitle,
      description: t.coreValues.physics.desc,
      features: t.coreValues.physics.features,
      image: 'https://images.unsplash.com/photo-1758685848521-ff7e4d136384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHBoeXNpY3MlMjBzdHJ1Y3R1cmV8ZW58MXx8fHwxNzY0NjAyMzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#45A29E'
    },
    {
      icon: Truck,
      title: t.coreValues.purchase.title,
      subtitle: t.coreValues.purchase.subtitle,
      description: t.coreValues.purchase.desc,
      features: t.coreValues.purchase.features,
      image: 'https://images.unsplash.com/photo-1738527307451-ab0552e0b569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFudWZhY3R1cmluZyUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2NDYwMjMyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#4ECDC4'
    }
  ];

  return (
    <section className="py-32 px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 space-y-6"
        >
          <h2 className="text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {t.coreValues.title}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
            {t.coreValues.subtitle}
          </p>
        </motion.div>

        {/* Z-Pattern Layout - Image/Text alternating */}
        <div className="space-y-32">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                
                {/* Image Side */}
                <div className={`relative ${isEven ? '' : 'lg:col-start-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#333333]"
                  >
                    <ImageWithFallback
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Floating icon badge */}
                    <div
                      className="absolute top-6 left-6 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{
                        backgroundColor: `${value.color}20`,
                        border: `1px solid ${value.color}40`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: value.color }} />
                    </div>
                  </motion.div>
                </div>

                {/* Text Side */}
                <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: `${value.color}10`,
                      borderColor: `${value.color}30`
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: value.color }} />
                    <span style={{ color: value.color }}>0{index + 1}</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                      {value.title}
                    </h3>
                    <p className="text-white/50" style={{ fontSize: '1.5rem' }}>
                      {value.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-white/70" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
                      {value.description}
                    </p>
                  </div>

                  {/* Feature highlights */}
                  <div className="pt-4 space-y-3">
                    {value.features.map((feature, featureIndex) => (
                      <FeaturePoint key={featureIndex}>{feature}</FeaturePoint>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Feature point component
function FeaturePoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
      <p className="text-white/60">{children}</p>
    </div>
  );
}