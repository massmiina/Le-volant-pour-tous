'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  direction?: 'left' | 'right';
  speed?: number;
  y?: string;
  className?: string;
  delay?: number;
}

export const AnimatedCar: React.FC<Props> = ({ 
  direction = 'right', 
  speed = 15, 
  y = '50%', 
  className = '',
  delay = 0 
}) => {
  const initialX = direction === 'right' ? '-20%' : '120%';
  const animateX = direction === 'right' ? '120%' : '-20%';

  return (
    <motion.div
      initial={{ x: initialX, y, rotate: 0 }}
      animate={{ 
        x: animateX,
        y: [y, `calc(${y} - 10px)`, y] // Slight floating effect
      }}
      transition={{ 
        x: { duration: speed, repeat: Infinity, ease: "linear", delay },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute pointer-events-none opacity-20 z-0 ${className}`}
    >
      <svg className={`w-32 h-32 ${direction === 'left' ? 'scale-x-110' : '-scale-x-110'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    </motion.div>
  );
};
