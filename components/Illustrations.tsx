import React from 'react';
import { motion } from 'framer-motion';

export const DrivingIllustration = ({ className = "" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 500 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Background Glow */}
    <circle cx="250" cy="200" r="150" fill="url(#glowGradient)" opacity="0.4" />
    
    {/* Car Body */}
    <motion.path
      d="M100 250 L130 180 L280 170 L350 210 L400 210 L420 250 Z"
      fill="#F97316"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M100 250 L130 180 L280 170 L350 210 L400 210 L420 250 Z"
      fill="url(#carGradient)"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Windows */}
    <motion.path
      d="M140 185 L260 178 L330 210 L150 210 Z"
      fill="#E0F2FE"
      opacity="0.8"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Character Driving */}
    <motion.g
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
    >
      {/* Head */}
      <circle cx="200" cy="180" r="20" fill="#FCD34D" />
      {/* Body */}
      <path d="M175 220 C175 190, 225 190, 225 220" fill="#3B82F6" />
      {/* Steering Wheel */}
      <path d="M240 210 L245 190 L260 210" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
      <circle cx="240" cy="200" r="12" stroke="#1F2937" strokeWidth="6" fill="none" transform="scale(1, 0.4) rotate(-30 240 200)" />
    </motion.g>

    {/* Wheels */}
    <motion.circle
      cx="160" cy="260" r="30" fill="#1F2937"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ originX: "160px", originY: "260px" }}
    />
    <motion.circle
      cx="160" cy="260" r="15" fill="#D1D5DB"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ originX: "160px", originY: "260px" }}
    />
    
    <motion.circle
      cx="350" cy="260" r="30" fill="#1F2937"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ originX: "350px", originY: "260px" }}
    />
    <motion.circle
      cx="350" cy="260" r="15" fill="#D1D5DB"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ originX: "350px", originY: "260px" }}
    />

    {/* Speed Lines */}
    <motion.path
      d="M50 250 L80 250 M30 220 L70 220"
      stroke="#CBD5E1"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
    />

    <defs>
      <radialGradient id="glowGradient" cx="0%" cy="0%" r="50%">
        <stop offset="0%" stopColor="#FFF7ED" />
        <stop offset="100%" stopColor="#FFF7ED" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="carGradient" x1="100" y1="170" x2="420" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  </motion.svg>
);
