import React from 'react';
import { motion } from 'motion/react';

interface BrickLogoProps {
  size?: number;
  animated?: boolean;
}

export function BrickLogo({ size = 40, animated = true }: BrickLogoProps) {
  const MotionWrapper = animated ? motion.div : 'div';
  const animationProps = animated ? {
    whileHover: { 
      rotateY: 15,
      rotateX: -10,
      scale: 1.05
    },
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  } : {};

  return (
    <MotionWrapper
      {...animationProps}
      style={{
        width: size,
        height: size,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Define gradients */}
        <defs>
          {/* Main brick gradient - Gold */}
          <linearGradient id="brickGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFC700" />
            <stop offset="100%" stopColor="#E6B800" />
          </linearGradient>
          
          {/* Top face gradient - Lighter */}
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFED4E" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          
          {/* Side face gradient - Darker */}
          <linearGradient id="sideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A500" />
            <stop offset="100%" stopColor="#B89000" />
          </linearGradient>

          {/* Stud gradient */}
          <radialGradient id="studGradient">
            <stop offset="0%" stopColor="#FFED4E" />
            <stop offset="70%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4A500" />
          </radialGradient>

          {/* Shadow */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Main brick body - 3D isometric view */}
        <g filter="url(#shadow)">
          
          {/* Bottom/Back face (darker) */}
          <path
            d="M 20 45 L 50 30 L 80 45 L 50 60 Z"
            fill="url(#sideGradient)"
            opacity="0.6"
          />
          
          {/* Left face */}
          <path
            d="M 20 45 L 20 70 L 50 85 L 50 60 Z"
            fill="url(#sideGradient)"
            opacity="0.8"
          />
          
          {/* Right face */}
          <path
            d="M 50 60 L 50 85 L 80 70 L 80 45 Z"
            fill="url(#sideGradient)"
            opacity="0.9"
          />
          
          {/* Top face (lightest) */}
          <path
            d="M 20 45 L 50 30 L 80 45 L 50 60 Z"
            fill="url(#topGradient)"
          />

          {/* Brick studs (凸起) on top - 2x2 pattern */}
          {/* Top-left stud */}
          <g>
            <ellipse
              cx="35"
              cy="42"
              rx="6"
              ry="3.5"
              fill="url(#studGradient)"
            />
            <ellipse
              cx="35"
              cy="40"
              rx="6"
              ry="3.5"
              fill="#FFED4E"
            />
            <circle
              cx="35"
              cy="40"
              r="4"
              fill="none"
              stroke="#D4A500"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>

          {/* Top-right stud */}
          <g>
            <ellipse
              cx="50"
              cy="37"
              rx="6"
              ry="3.5"
              fill="url(#studGradient)"
            />
            <ellipse
              cx="50"
              cy="35"
              rx="6"
              ry="3.5"
              fill="#FFED4E"
            />
            <circle
              cx="50"
              cy="35"
              r="4"
              fill="none"
              stroke="#D4A500"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>

          {/* Bottom-left stud */}
          <g>
            <ellipse
              cx="35"
              cy="52"
              rx="6"
              ry="3.5"
              fill="url(#studGradient)"
            />
            <ellipse
              cx="35"
              cy="50"
              rx="6"
              ry="3.5"
              fill="#FFED4E"
            />
            <circle
              cx="35"
              cy="50"
              r="4"
              fill="none"
              stroke="#D4A500"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>

          {/* Bottom-right stud */}
          <g>
            <ellipse
              cx="50"
              cy="47"
              rx="6"
              ry="3.5"
              fill="url(#studGradient)"
            />
            <ellipse
              cx="50"
              cy="45"
              rx="6"
              ry="3.5"
              fill="#FFED4E"
            />
            <circle
              cx="50"
              cy="45"
              r="4"
              fill="none"
              stroke="#D4A500"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>
        </g>

        {/* Edge highlights for extra 3D effect */}
        <path
          d="M 20 45 L 50 30"
          stroke="#FFED4E"
          strokeWidth="1"
          opacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M 50 30 L 80 45"
          stroke="#FFED4E"
          strokeWidth="1"
          opacity="0.3"
          strokeLinecap="round"
        />
      </svg>
    </MotionWrapper>
  );
}
