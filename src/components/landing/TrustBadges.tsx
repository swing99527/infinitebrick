import React from 'react';
import { motion } from 'motion/react';
import { Package, Truck, Shield, Sparkles } from 'lucide-react';
import { useTranslation, useLanguage } from '../../contexts/LanguageContext';

const partners = [
  { name: 'GoBricks', descriptionEn: 'Premium Brick Supplier', descriptionZh: '优质积木供应商', icon: Package },
  { name: 'SF Express', descriptionEn: 'Global Logistics Partner', descriptionZh: '全球物流合作伙伴', icon: Truck },
  { name: 'TÜV Certified', descriptionEn: 'Safety & Quality', descriptionZh: '安全与质量认证', icon: Shield },
  { name: 'OpenAI', descriptionEn: 'AI Technology Partner', descriptionZh: 'AI 技术合作伙伴', icon: Sparkles }
];

export function TrustBadges() {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
    <section className="py-24 px-8 lg:px-12 border-t border-[#333333]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/40 mb-2">{t.trust.title}</p>
          <h3 className="text-white" style={{ fontSize: '1.5rem' }}>
            {language === 'zh' ? '合作伙伴' : 'Our Partners'}
          </h3>
        </motion.div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center p-8 bg-[#1F1F1F] border border-[#333333] rounded-lg transition-colors hover:border-[#FFD700]/30"
                >
                  <div className="w-16 h-16 mb-4 bg-[#FFD700]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <h4 className="text-white mb-1">{partner.name}</h4>
                  <p className="text-white/40 text-sm">
                    {language === 'zh' ? partner.descriptionZh : partner.descriptionEn}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', labelEn: 'Active Creators', labelZh: '活跃创作者' },
            { value: '200K+', labelEn: 'Models Generated', labelZh: '生成模型' },
            { value: '30K+', labelEn: 'Sets Delivered', labelZh: '实物交付' },
            { value: '98%', labelEn: 'Satisfaction', labelZh: '满意度' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-[#FFD700] mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {stat.value}
              </p>
              <p className="text-white/60">
                {language === 'zh' ? stat.labelZh : stat.labelEn}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}