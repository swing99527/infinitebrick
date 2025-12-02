import React from 'react';
import { motion } from 'motion/react';

export interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function BrandButton({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  children,
  disabled,
  ...props 
}: BrandButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 active:scale-[0.98] shadow-lg shadow-[#FFD700]/20",
    secondary: "bg-[#1F1F1F] text-white border border-[#333333] hover:bg-[#2A2A2A] hover:border-[#444444] active:scale-[0.98]",
    ghost: "text-white hover:bg-[#1F1F1F] active:bg-[#2A2A2A]"
  };
  
  const sizes = {
    sm: "px-4 py-2 min-h-[36px]",
    md: "px-6 py-3 min-h-[44px]",
    lg: "px-8 py-4 min-h-[52px]"
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
