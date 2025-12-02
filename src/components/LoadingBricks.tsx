import React from 'react';
import { motion } from 'motion/react';

export interface LoadingBricksProps {
  text?: string;
}

export function LoadingBricks({ text = 'Building...' }: LoadingBricksProps) {
  // Simulate brick falling animation
  const brickVariants = {
    initial: { y: -100, opacity: 0, rotate: -10 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.8
      }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 bg-black/95 rounded-lg">
      {/* Brick animation */}
      <div className="flex items-end gap-2 h-20">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={brickVariants}
            initial="initial"
            animate="animate"
            className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-sm"
            style={{
              boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)'
            }}
          />
        ))}
      </div>
      
      {/* Loading text */}
      {text && (
        <motion.p
          className="text-white/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
