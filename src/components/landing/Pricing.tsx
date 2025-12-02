import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const t = useTranslation();

  const plans = [
    {
      id: 'free',
      name: t.pricing.plans.free.name,
      icon: Zap,
      price: billingCycle === 'monthly' ? t.pricing.plans.free.monthlyPrice : t.pricing.plans.free.yearlyPrice,
      description: t.pricing.plans.free.description,
      features: t.pricing.plans.free.features,
      cta: t.pricing.plans.free.cta,
      highlighted: false,
      color: '#45A29E'
    },
    {
      id: 'pro',
      name: t.pricing.plans.pro.name,
      icon: Crown,
      price: billingCycle === 'monthly' ? t.pricing.plans.pro.monthlyPrice : t.pricing.plans.pro.yearlyPrice,
      description: t.pricing.plans.pro.description,
      features: t.pricing.plans.pro.features,
      cta: t.pricing.plans.pro.cta,
      highlighted: true,
      color: '#FFD700',
      badge: t.pricing.popular
    },
    {
      id: 'enterprise',
      name: t.pricing.plans.enterprise.name,
      icon: Rocket,
      price: t.pricing.plans.enterprise.price,
      description: t.pricing.plans.enterprise.description,
      features: t.pricing.plans.enterprise.features,
      cta: t.pricing.plans.enterprise.cta,
      highlighted: false,
      color: '#4ECDC4'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    if (isAuthenticated) {
      navigate('/studio');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section id="pricing" className="relative bg-[#000000] py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4ECDC4] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full">
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
            <span className="text-[#FFD700] text-sm">{t.pricing.badge}</span>
          </div>

          <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t.pricing.title}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-lg transition-all ${
              billingCycle === 'monthly'
                ? 'bg-[#FFD700] text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {t.pricing.monthly}
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-3 rounded-lg transition-all relative ${
              billingCycle === 'yearly'
                ? 'bg-[#FFD700] text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {t.pricing.yearly}
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#4ECDC4] text-black text-xs rounded-full">
              {t.pricing.save20}
            </span>
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1.5 bg-[#FFD700] text-black text-sm rounded-full font-medium">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className={`relative h-full rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-[#0A0A0A] border-2 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.15)]'
                    : 'bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333]'
                }`}>
                  
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${plan.color}15`,
                      border: `1px solid ${plan.color}30`
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: plan.color }} />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-white mb-2" style={{ fontSize: '1.75rem' }}>
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 mb-6" style={{ lineHeight: '1.7' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.id === 'enterprise' ? (
                      <div className="text-white" style={{ fontSize: '2.5rem' }}>
                        {plan.price}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-white" style={{ fontSize: '2.5rem' }}>
                            {plan.price}
                          </span>
                          <span className="text-white/50">
                            {billingCycle === 'monthly' ? t.pricing.perMonth : t.pricing.perYear}
                          </span>
                        </div>
                        {billingCycle === 'yearly' && plan.id !== 'free' && (
                          <div className="text-white/50 text-sm mt-2">
                            {t.pricing.billedYearly}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-4 rounded-lg transition-all font-medium mb-8 ${
                      plan.highlighted
                        ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90'
                        : 'bg-[#1F1F1F] text-white hover:bg-[#2F2F2F]'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  {/* Features list */}
                  <div className="space-y-4">
                    <div className="text-white/40 text-sm uppercase tracking-wider mb-4">
                      {t.pricing.features}
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${plan.color}20`,
                            border: `1px solid ${plan.color}40`
                          }}
                        >
                          <Check className="w-3 h-3" style={{ color: plan.color }} />
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-white/60 mb-4">
            {t.pricing.questions}
          </p>
          <a 
            href="#footer"
            className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors"
          >
            {t.pricing.contactUs}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
