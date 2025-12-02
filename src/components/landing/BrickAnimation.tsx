import React from 'react';
import { motion } from 'motion/react';

// 2D积木组件 - 带顶部凸起（studs）
interface Brick2DProps {
  type: '1x1' | '2x1' | '2x2' | '2x4' | '1x4';
  color: string;
  delay?: number;
  x: number;
  y: number;
}

function Brick2D({ type, color, delay = 0, x, y }: Brick2DProps) {
  // 根据类型设置宽高和凸起数量
  const getBrickDimensions = () => {
    switch (type) {
      case '1x1': return { width: 50, height: 50, studs: [[25]] };
      case '2x1': return { width: 80, height: 50, studs: [[25, 55]] };
      case '2x2': return { width: 80, height: 80, studs: [[25, 55], [25, 55]] };
      case '2x4': return { width: 130, height: 80, studs: [[22, 52, 82, 112], [22, 52, 82, 112]] };
      case '1x4': return { width: 130, height: 50, studs: [[22, 52, 82, 112]] };
      default: return { width: 50, height: 50, studs: [[25]] };
    }
  };

  const { width, height, studs } = getBrickDimensions();
  const studRadius = 6;

  return (
    <motion.div
      className="absolute"
      style={{ width, height }}
      initial={{ 
        x, 
        y,
        rotate: Math.random() * 360,
      }}
      animate={{
        y: [y, y - 40, y + 30, y],
        rotate: [0, 360],
        scale: [1, 1.05, 0.95, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div
        className="w-full h-full rounded-lg relative"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: `0 8px 32px ${color}40, inset 0 2px 8px rgba(255,255,255,0.1)`,
        }}
      >
        {/* 积木凸起 (studs) - 顶部圆形凸起 */}
        {studs.map((row, rowIdx) => (
          <div key={rowIdx} className="absolute top-0 left-0 w-full flex justify-around" style={{ top: `${20 + rowIdx * 40}px` }}>
            {row.map((xPos, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="absolute rounded-full"
                style={{
                  left: xPos,
                  width: studRadius * 2,
                  height: studRadius * 2,
                  marginLeft: -studRadius,
                  marginTop: -studRadius,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), ${color})`,
                  boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)`,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        ))}

        {/* 底部阴影细节 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 rounded-b-lg"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
          }}
        />
        
        {/* 顶部高光 */}
        <div
          className="absolute top-0 left-0 right-0 h-1/3 rounded-t-lg"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

export function BrickAnimation() {
  // 定义不同颜色的积木
  const bricks = [
    // 金色系
    { type: '2x4' as const, color: '#FFD700', x: 80, y: 50 },
    { type: '2x2' as const, color: '#FFC700', x: 250, y: 180 },
    { type: '1x4' as const, color: '#FFED4E', x: 150, y: 350 },
    
    // 红色系
    { type: '2x2' as const, color: '#FF6B6B', x: 320, y: 80 },
    { type: '2x1' as const, color: '#FF4757', x: 50, y: 280 },
    
    // 蓝色系
    { type: '2x2' as const, color: '#4ECDC4', x: 380, y: 250 },
    { type: '1x4' as const, color: '#45B7D1', x: 180, y: 120 },
    { type: '1x1' as const, color: '#5DADE2', x: 420, y: 400 },
    
    // 绿色系
    { type: '2x1' as const, color: '#7FB069', x: 280, y: 420 },
    { type: '1x1' as const, color: '#98D8C8', x: 100, y: 450 },
    
    // 橙色系
    { type: '2x1' as const, color: '#FFA07A', x: 450, y: 150 },
    { type: '1x1' as const, color: '#FF8C42', x: 50, y: 150 },
    
    // 紫色系
    { type: '2x2' as const, color: '#9B59B6', x: 350, y: 350 },
    { type: '1x1' as const, color: '#BB8FCE', x: 200, y: 250 },
  ];

  return (
    <div className="relative aspect-square max-w-2xl mx-auto">
      {/* 中心发光 */}
      <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 via-[#FFD700]/5 to-transparent rounded-full blur-3xl" />
      
      {/* 积木容器 */}
      <div className="absolute inset-0 overflow-visible">
        {bricks.map((brick, i) => (
          <Brick2D
            key={i}
            type={brick.type}
            color={brick.color}
            x={brick.x}
            y={brick.y}
            delay={i * 0.3}
          />
        ))}
      </div>

      {/* 中心主积木 - 特大金色 2x4 */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: 160,
          height: 100,
          marginLeft: -80,
          marginTop: -50,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-full h-full rounded-xl relative"
          style={{
            background: 'linear-gradient(135deg, #FFED4E, #FFD700)',
            boxShadow: '0 20px 60px rgba(255, 215, 0, 0.5), inset 0 4px 12px rgba(255,255,255,0.2)',
          }}
        >
          {/* 主积木的凸起 - 2x4 = 8个凸起 */}
          {[[32, 72, 112, 148], [32, 72, 112, 148]].map((row, rowIdx) => (
            <div key={rowIdx} className="absolute top-0 left-0 w-full" style={{ top: `${25 + rowIdx * 50}px` }}>
              {row.map((xPos, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="absolute rounded-full"
                  style={{
                    left: xPos,
                    width: 16,
                    height: 16,
                    marginLeft: -8,
                    marginTop: -8,
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), #FFD700)',
                    boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.15)',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          ))}

          {/* 底部阴影 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-3 rounded-b-xl"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
            }}
          />
          
          {/* 顶部高光 */}
          <div
            className="absolute top-0 left-0 right-0 h-1/3 rounded-t-xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            }}
          />
        </div>
      </motion.div>

      {/* 浮动粒子效果 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}