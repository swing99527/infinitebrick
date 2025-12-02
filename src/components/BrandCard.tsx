import React from 'react';
import { motion } from 'motion/react';

export interface BrandCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function BrandCard({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}: BrandCardProps) {
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const baseStyles = `bg-[#1F1F1F] border border-[#333333] rounded-md ${paddingStyles[padding]}`;
  
  if (hover) {
    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        whileHover={{ 
          y: -4,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
}
